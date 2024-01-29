import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const PhonePeStatus = () => {
    const navigate = useNavigate();
    const {tid, mid} = useParams();
    const [status, setStatus] = useState('');

    useEffect(() => {
        checkPaymentStatus(tid, mid)
    })
    
    const checkPaymentStatus = async (tid, mid) => {
        var accessToken = localStorage.getItem('client_token');
        const apiConfig = {
            headers: {
              Authorization: "Bearer " + accessToken,
              'Content-Type': 'application/json',
            }
        };

        const payload = {
            merchantId: mid,
            transactionId: tid
        }
        
        try {
            axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/phonepe-status` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/phonepe-status`, payload, apiConfig)
            .then((response) => {
                console.log(response);
                if(response.data.status){
                    console.log("Status Response", response);
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
            console.error('Error checking payment status:', error);
            setStatus('Error');
        }
    };

    return (
    <div>
        {status && <p>Status: {status}</p>}
    </div>
    );
};

export default PhonePeStatus;
