import React from 'react'

export default function PhonePeIntegration() {
  return (
    <div>PhonePeIntegration</div>
  )
}



import axios from 'axios';
const options = {
  method:  'post',
  url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
  headers: {
    accept: 'text/plain',
    
 Content-Type : 'application/json' 
    },
     data: {
        "merchantId": "M22XL6S80H1I8",
        "merchantTransactionId": "CPJ7850590068188104",
        "merchantUserId": "MUID123",
        "amount": 10,
        "redirectUrl": "https://",
        "redirectMode": "REDIRECT",
        "callbackUrl": "https://webhook.site/callback-url",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
      }      
    };
        
  axios
    .request(options)
      .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });