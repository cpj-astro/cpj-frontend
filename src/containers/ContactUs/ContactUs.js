import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoader(true);
			axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/sendMessage` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/sendMessage`, data, apiConfig)
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
				if(error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
                    toast.error('Session Expired!, Please Re-login.')
                    navigate('/sign-in');
                } else {
                    console.log(error);
                }
            });
		} catch (error) {
            reset();
			console.log(error);
		}
	};
    return (
        <>
            <Header/>
            <div id="main" className="main-container contactus">
                <div className="container breadcrumb-area">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Contact Us</span>
                    </div>
                    <h2>Contact Us</h2>
                </div>
                <section className="contact-sec pt-15">
                    <div className="container">
                    <div className="card card-shadow px-30 py-30">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="comment-form p-0">
                            <p className="mb-20">
                                Office Address <p><strong>1ST, B-102, VASANT VIHAR TOWNSHIP, Magdalla Road, Bhatar, Surat, Gujarat, 395007</strong></p>
                                Our Office timings are <p><strong>Mondays to Fridays: 9:00am to 12:00pm </strong></p>
                                Email Us <p><strong>cricketpanditji.astro@gmail.com </strong></p>
                            </p>
                            <hr/>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                <div className="col-md-6">
                                    <div className="input-field">
                                    <label htmlFor="name">Your name</label>
                                    <input id="name" type="text" name="name" placeholder="Enter name" required {...register("name")} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-field">
                                    <label htmlFor="email">Email address</label>
                                    <input id="email" type="email" name="email" placeholder="Enter email" required {...register("email")}/>
                                    </div>
                                </div>
                                </div>
                                <div className="input-field textarea">
                                <label htmlFor="comments">Your Comment</label>
                                <textarea id="comments" name="comments" placeholder="Write your comment" defaultValue={""} {...register("comments")}/>
                                </div>
                                <button type="submit" className="cricnotch-btn btn-filled radius-5">{loader ? 'Processing Your Request...' : 'Send Message'}</button>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}
