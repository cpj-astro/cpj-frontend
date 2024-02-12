import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const PhonePeStatus = () => {
    const navigate = useNavigate();
    const { tid, mid } = useParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const checkPaymentStatus = async () => {
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
            };

            try {
                const response = await axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/phonepe-status` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/phonepe-status`, payload, apiConfig);
                console.log(response);

                if (response.data.status) {
                    setStatus(JSON.stringify(response.data));
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('client_token');
localStorage.removeItem('user_data');
                    navigate('/sign-in');
                } else {
                    console.error('Error checking payment status:', error);
                    setStatus('Error');
                }
            }
        };

        // Call the function
        checkPaymentStatus();
    }, [tid, mid, navigate]); // Pass dependencies to the dependency array

    return (
        <div>
            {status && <p>Status: {status}</p>}
        </div>
    );
};

export default PhonePeStatus;
