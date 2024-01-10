// RazorpayIntegration.js
import React, { useState } from 'react';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function RazorpayIntegration({ matchId, panditId, amount, moonSign, onPaymentSuccess, onPaymentFail}) {
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
      const params = {
        amount: amount
      }
      const response = await axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/razorpay/create-order` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/razorpay/create-order`, params, apiConfig);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        order_id: response.data.order_id,
        name: 'CricketPanditJi',
        description: 'Match Astrology Report',
        // prefill: {
        //   name: 'Ashish Maharana',
        //   email: 'ashish.maharana@example.com',
        //   contact: '79904 62294',
        // },
        theme: {
          color: '#3b368a',
        },
        handler: function (res) {
          // Check if the payment was successful
          if (res.razorpay_payment_id) {
            const data = {
              razorpayOrderId: res.razorpay_order_id,
              razorpayPaymentId: res.razorpay_payment_id,
              razorpaySignature: res.razorpay_signature,
              match_id: matchId,
              pandit_id: panditId,
              amount: amount,
              moon_sign: moonSign,
            };

            capturePayment(data);
          } else {
            // Handle the payment failure scenario
            toast.error('Payment failed:' + res.error_description);
          }
        },
      };
      
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Error creating Razorpay order');
    }
  };

  const capturePayment = (data) => {
    try {
      axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/razorpay/capture-payment` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/razorpay/capture-payment`, data, apiConfig)
      .then((response) => {
          if(response.data.success){
            onPaymentSuccess();
          } else {
            onPaymentFail();
          }
      }).catch((error) => {
        if(error.response.data.status_code == 401){
          localStorage.removeItem('client_token');
          
          navigate('/sign-in');
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  
  return (
    <button className="mt-4 btn-astro-v1" onClick={createRazorpayOrder}> Buy Astrology </button>
  );
}

export default RazorpayIntegration;
