import React from 'react';
import sha256 from 'js-sha256';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PhonePeIntegration = ({ astroAmount }) => {
  const makePayment = async () => {
    const transactionid = 'Tr-' + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: 'M22XL6S80H1I8', // Replace with your merchant ID
      merchantTransactionId: transactionid,
      merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      amount: astroAmount*100, // Set your amount here
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

    const UAT_PAY_API_URL = 'https://api.phonepe.com/apis/hermes';

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        {
          request: dataBase64,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
          },
        }
      );

      const redirect = response.data.data.instrumentResponse.redirectInfo.url;
      window.location.href = redirect;
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <button className="mt-4 btn-astro-v1" onClick={makePayment}> Buy Astrology </button>
  );
};

export default PhonePeIntegration;
