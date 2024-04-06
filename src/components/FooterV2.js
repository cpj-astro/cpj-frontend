import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FooterV2() {
    const navigate = useNavigate();
    const [gPrice, setGPrice] = useState([]);
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [loader, setLoader] = useState(false);
	let year = new Date(); 
	year = year.getFullYear();
	const [askToggle, setAskToggle] = useState(false);
	var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const onSubmit = async (data) => {
        if(data.question && data.wtsp_number && data.wtsp_number.length === 10 && accessToken) {
            try {
                setLoader(true);
                axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/submit-question` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/submit-question`, data, apiConfig)
                .then((response) => {
                    if(response.data.status == true) {
                        setLoader(false);
                        toast.success(response.data.message);
                    } else {
                        setLoader(false);
                        toast.error(response.data.message);
                    }
                    reset();
                }).catch((error) => {
                    setLoader(false);
                    reset();
                });
            } catch (error) {
                reset();
            }
        } else {
            if (data.wtsp_number.length !== 10) {
				toast.error('Please enter a valid 10-digit phone number.');
			} else if (!accessToken) {
				navigate('sign-up');
			} else {
				toast.error('Please enter WhatsApp Number and Question.');
			}
        }
	};

	const toggleAskForm = () => {
		setAskToggle(!askToggle);
	}

    useEffect(() => {
        const apiUrl =
        process.env.REACT_APP_DEV === 'true'
            ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getGPrice`
            : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getGPrice`;
        axios.get(apiUrl)
        .then((response) => {
            if (response.data.success) {
                setGPrice(response.data.data);
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
    }, [])
    
    return (
        <footer>
            <div className="container">
                <div className="cp__fotter-report d-flex flex-wrap align-items-center  justify-content-between" >
                <div className="cp__report-desc col-lg-7 col-sm-12">
                    <h4>Unlock Success: Try our report to increase your winning chances</h4>
                </div>
                <div className="text-center col-lg-5 col-sm-12">
                    <a href="/astro" className="cp__fill-btn">Only {gPrice.price ?? 0}/-</a>
                </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between cp__footer-main">
                <div className="col-lg-5 col-sm-12 cp__logo-block">
                    <div className="cp__logo">
                        <a href="/"><img src="/assets/images/logo.png" alt="logo" /></a>
                    </div>
                    <p>Welcome to cricket panditji, your ultimate destination for astrology enthusiasts seeking cosmic guidance and insights into the mystical world of celestial influences.</p>
                    <div className="cp__social-link">
                    <a href="#"><img src="/assets/images/insta.svg" alt="logo" /></a>
                    <a href="#"><img src="/assets/images/facebook.svg" alt="logo" /></a>
                    <a href="#"><img src="/assets/images/tweeter.svg" alt="logo" /></a>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <h3>Use Full Links</h3>
                    <ul>
                    <li><a href="/disclaimer">Disclaimer</a></li>
                    <li><a href="/terms">Terms &amp; Conditions</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-sm-12">
                    <h3>Contact</h3>
                    <div className="cp__contact">
                    {/* <p><img src="/assets/images/home.svg" alt="logo" />No 58A, Baltimore Street, USA</p> */}
                    <a href="mailto:cricketpanditji.astro@gmail.com"><img src="/assets/images/mail.svg" alt="logo" />cricketpanditji.astro@gmail.com</a>
                    <a href="/contact-us"><img src="/assets/images/phone.svg" alt="logo" />Contact Us</a>
                    </div>
                </div>
                </div>
                <div className="cp__copywrite-txt">
                    <p>CricketPanditJi ©2024 | All Rights Reserved</p>
                </div>
            </div>
            {askToggle &&
            <div className="cp__form-wrap">
                <div className="help-card">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="comment-form p-0">
                            <span className="mb-20">
                                <strong>Ask Cricket related Questions!</strong>
                            </span>
                            <hr/>
                            <form onSubmit={handleSubmit(onSubmit)}> 
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="cp__form-group">
                                            <label htmlFor="wtsp_number">WhatsApp Number</label>
                                            <input 
                                                id="wtsp_number"  
                                                type="number" 
                                                name="wtsp_number" 
                                                placeholder="WhatsApp Number" 
                                                required 
                                                {...register("wtsp_number")}
                                                className="form-control" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="cp__form-group">
                                            <label htmlFor="question">Question</label>
                                            <textarea 
                                                id="question" 
                                                name="question" 
                                                rows={1}
                                                placeholder="Write your question" 
                                                defaultValue={""} 
                                                {...register("question")}
                                                className="form-control" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">{loader ? 'Submitting...' : 'Submit'}</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			}
            <div className="help" onClick={() => toggleAskForm()}>
			{askToggle ? 'X' : '?'}
			</div>
        </footer>
    )
}
