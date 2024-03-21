import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';

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
                    localStorage.removeItem('user_data');
                    
                    navigate('/');
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
            <HeaderV2/>
            <main className="cp__list-sec">
				<div className="cp__listing-wrap">
					<section>
						<div className='container pt-3'>
							<div className="cp__form-wrap">	
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='text-center'>
                                            <h2>Contact Us</h2>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                                <p className="mb-20">
                                    Our Office timings are <p><strong>Mondays to Fridays: 9:00am to 12:00pm </strong></p> 
                                    Email Us <p><strong>cricketpanditji.astro@gmail.com </strong></p>
                                </p>
                                <hr/>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
										<div className="col-md-12">
											<div className="cp__form-group">
												<label htmlFor="name">name</label>
												<input 
													id="name" 
													type="name" 
													name="name" 
													placeholder="Enter Name" 
													{...register("name")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
                                    <div className="row">
										<div className="col-md-12">
											<div className="cp__form-group">
												<label htmlFor="email">Email Address</label>
												<input 
													id="email" 
													type="email" 
													name="email" 
													placeholder="Enter Email" 
													{...register("email")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
                                    <div className="row">
										<div className="col-md-12">
											<div className="cp__form-group">
												<label htmlFor="comments">Your Comment</label>
                                                <textarea id="comments" name="comments" className='form-control' placeholder="Write your comment" defaultValue={""} {...register("comments")}/>
											</div>
										</div>
									</div>
                                    <div className="row">
										<div className="col-md-12">
                                            <button type="submit" className="btn btn-primary btn-block">{loader ? 'Processing Your Request...' : 'Send Message'}</button>
										</div>
									</div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <FooterV2/>
        </>
    )
}
