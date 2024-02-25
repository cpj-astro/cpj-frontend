import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PhonePeIntegration = ({ btnText, astroAmount, matchId, panditId}) => {
  const navigate = useNavigate();
  const makePayment = async () => {
    const transactionid = 'T-CPJ-' + uuidv4().replace(/-/g, '').toUpperCase().slice(0, 21);
    const isDev = process.env.REACT_APP_DEV === 'true';
    const url = isDev ? process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL : process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL;
    const merchantKey = isDev ? process.env.REACT_APP_DEV_PHONEPE_MERCHANT_ID : process.env.REACT_APP_SANDBOX_PHONEPE_MERCHANT_ID;
    
    const payload = {
      matchId: matchId,
      panditId: panditId,
      merchantId: merchantKey, // Replace with your merchant ID
      merchantTransactionId: transactionid,
      merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      amount: 1 * 100, // Set your amount here
      redirectUrl: `${url}/payment-status/${matchId}/${transactionid}`,
      callbackUrl: `${url}/payment-status/${matchId}/${transactionid}`,
      redirectMode: 'POST',
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
          window.location.href = response.data.url;
        } else {
          toast.error('Request failed!, Please try again.');
        }
      })
      .catch((error) => {
        if(error.response.data.status_code == 401){
          localStorage.removeItem('client_token');
          localStorage.removeItem('user_data');
          
          navigate('/');
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return ( 
    <>
      <button className="mt-2 btn-astro-v1" onClick={makePayment}> 
        {btnText}
      </button>
    </>
  );
};

export default PhonePeIntegration;
