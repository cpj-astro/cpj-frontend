import React from 'react';
import sha256 from 'js-sha256';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PhonePeIntegration = ({ astroAmount }) => {
  const navigate = useNavigate();
  const makePayment = async () => {
    const transactionid = 'T-CPJ-' + uuidv4().replace(/-/g, '').toUpperCase().slice(0, 21);
    // const transactionid = 'CPJ' + uuidv4().toString(36).slice(-6);
    const isDev = process.env.REACT_APP_DEV === 'true';
    const liveUrl = process.env.REACT_APP_LIVE_URL;
    const localUrl = process.env.REACT_APP_LOCAL_URL;
    const merchantKey = process.env.REACT_APP_PHONEPE_MERCHANT_ID;
    
    const payload = {
      merchantId: merchantKey, // Replace with your merchant ID
      merchantTransactionId: transactionid,
      merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      amount: 1 * 100, // Set your amount here
      redirectUrl: isDev
        ? `${liveUrl}/payment-status/${transactionid}/${merchantKey}`
        : `${localUrl}/payment-status/${transactionid}/${merchantKey}`,
      redirectMode: 'POST',
      callbackUrl: isDev
        ? `${liveUrl}/payment-status/${transactionid}/${merchantKey}`
        : `${localUrl}/payment-status/${transactionid}/${merchantKey}`,
      mobileNumber: '6353152455', // Set mobile number here
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

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
