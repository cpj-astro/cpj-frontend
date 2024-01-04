import React, { useEffect, useState } from 'react';
import sha256 from 'js-sha256';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PhonePeStatus = () => {
    const navigate = useNavigate();
    const {tid, mid} = useParams();
    const [status, setStatus] = useState('');

    useEffect(() => {
        checkPaymentStatus(tid, mid)
    })
    
    const checkPaymentStatus = async (tid, mid) => {
        const st = `/pg/v1/status/${mid}/${tid}` + '07afb8d3-ec97-49c3-9ff0-f7b73942c08f'; // Replace with your actual salt key
        const dataSha256 = sha256(st);
        const checksum = dataSha256 + '###' + '1'; // Replace with your actual salt index

        try {
            const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${mid}/${tid}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${mid}`,
            },
            };

            const response = await axios.request(options);
            setStatus(response.data.code);
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
