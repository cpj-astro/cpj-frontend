import React from 'react';
import sha256 from 'js-sha256';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PhonePeIntegration = ({ astroAmount }) => {
  const navigate = useNavigate();
  const makePayment = async () => {
    const transactionid = 'Tr-' + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: 'M22XL6S80H1I8', // Replace with your merchant ID
      merchantTransactionId: transactionid,
      merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      amount: 1*100, // Set your amount here
      redirectUrl: `http://localhost:3000/payment-status/${transactionid}/M22XL6S80H1I8`,
      redirectMode: 'POST',
      callbackUrl: `http://localhost:3000/payment-status/${transactionid}/M22XL6S80H1I8`,
      mobileNumber: '9999999999', // Set mobile number here
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = btoa(unescape(encodeURIComponent(dataPayload)));
    const fullURL = dataBase64 + '/pg/v1/pay' + '07afb8d3-ec97-49c3-9ff0-f7b73942c08f'; // Replace with your salt key
    const dataSha256 = sha256(fullURL);
    const checksum = dataSha256 + '###' + '1'; // Replace with your salt index

    try {
      var accessToken = localStorage.getItem('client_token');
      const apiConfig = {
          headers: {
              Authorization: "Bearer " + accessToken,
              'Content-Type': 'application/json',
          }
      };
      
      axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/phonepe-pay` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/phonepe-pay`, payload, apiConfig)
      .then((response) => {
        if(response.data.status){
          const redirect = response.data.url;
          window.location.href = redirect;
        } else {
          toast.error('Request failed!, Please try again.');
        }
      })
      .catch((error) => {
        if(error.response.data.status_code == 401){
          localStorage.removeItem('client_token');
          navigate('/sign-in');
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <button className="mt-4 btn-astro-v1" onClick={makePayment}> Buy Astrology </button>
  );
};

export default PhonePeIntegration;
