// RazorpayIntegration.js
import React, { useState } from 'react';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RazorpayIntegration({ onPaymentSuccess }) {
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [astrologyReport, setAstrologyReport] = useState('');

  var accessToken = localStorage.getItem('client_token');

  const apiConfig = {
      headers: {
          Authorization: "Bearer " + accessToken,
          'Content-Type': 'application/json',
      }
  };
  const createRazorpayOrder = async () => {
    try {
    
      const response = await axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/razorpay/create-order` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/razorpay/create-order`, [], apiConfig);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        order_id: response.data.order_id,
        name: 'CricketPanditJi',
        description: 'Match Astrology Report',
        prefill: {
          name: 'Ashish Maharana',
          email: 'ashish.maharana@example.com',
          contact: '79904 62294',
        },
        theme: {
          color: '#61dafb',
        },
        handler: function (res) {
          const data = {
            razorpayOrderId: res.razorpay_order_id,
            razorpayPaymentId: res.razorpay_payment_id,
            razorpaySignature: res.razorpay_signature,
          };

          if (data.razorpayOrderId && data.razorpayPaymentId && data.razorpaySignature) {
            capturePayment(data);
          } else {
            toast.error('Payment failed please try again later.');
          }
        },
      };
      
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
    }
  };

  const capturePayment = (data) => {
    console.log("data", data);
    try {
      axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/razorpay/capture-payment` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/razorpay/capture-payment`, data, apiConfig)
      .then((response) => {
          console.log(response);
          if(response.data.success){
            // setUserData(response.data.data);
          }
      }).catch((error) => {
        if(error.response.data.status_code == 401){
          localStorage.removeItem('client_token');
          toast.error("Unexpected Error, Please try again later.");
          navigate('/sign-in');
        } else {
          toast.error(error.code);
        }
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  
  return (
    <button className="cricnotch-btn btn-filled" onClick={createRazorpayOrder}> Buy </button>
  );
}

export default RazorpayIntegration;
