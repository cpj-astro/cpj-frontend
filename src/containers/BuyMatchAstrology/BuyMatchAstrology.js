import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderTwo from '../../components/HeaderTwo';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RazorpayIntegration from '../../components/RazorPayIntegration';

function BuyMatchAstrology() {
	const navigate = useNavigate();
    const [panditData, setPanditData] = useState([]);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [isPaymentFail, setIsPaymentFail] = useState(false);

    const handlePaymentSuccess = () => {
        setIsPaymentSuccess(true);
        setIsPaymentFail(false);
    };

    const handlePaymentFail = () => {
        setIsPaymentFail(true);
        setIsPaymentSuccess(false);
    };

    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const fetchPanditsList = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/pandits` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/pandits`, apiConfig)
        .then((response) => {
            console.log(response);
            if(response.data.success){
                setPanditData(response.data.data);
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
                toast.error(error.code);
			}
        });
    }

    useEffect(() => {
        fetchPanditsList();
    },[])
    return (
        <>
            <HeaderTwo/>
            <div id="main" className="main-container">
                <div className="container">
                    <h1>BUY MATCH ASTROLOGY FROM OUR EXPERIENCED PANDITS</h1>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-12">
                            <section className="live-matches pt-0">
                                {isPaymentSuccess && <div className='alert alert-success'></div> } 
                                {isPaymentFail && <div className='alert alert-danger'></div> }
                                <div className="row">
                                {(panditData && panditData.length > 0) ? panditData.map((pandit, index) => (
                                    <div className="col-md-4 col-sm-6">
                                        <div className="card card-shadow single-member">
                                            <div className="content-card">
                                            <figure>
                                                <img src={`/assets/images/pandits/${pandit.avatar_image}`} alt />
                                                <RazorpayIntegration onPaymentSuccess={handlePaymentSuccess} onPaymentFail={handlePaymentFail} />
                                            </figure>
                                            <div className="content-block text-center">
                                                <h3>
                                                <a href="#">{pandit.name}</a>
                                                </h3>
                                                <hr/>
                                                <div className='text-left'>
                                                    <div className='row'>
                                                        <div className='col-md-12'>
                                                            <h5>EXPERIENCE : {pandit.experience}</h5> 
                                                            <h5>RATING : {pandit.rating}</h5>
                                                            <h5>ASTROLOGY PRICE: {pandit.match_astrology_price}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    )) : <h1>No Pandits To Show</h1> 
                                }
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
    
export default BuyMatchAstrology;