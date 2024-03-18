import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Footer() {
	const navigate = useNavigate();
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
	
    return (
        <footer className="footer">
			<div className="footer-copyright text-white">
				<div className="row">
					<div className="col-md-6">
						<a href="/">CricketPanditJi</a> &copy; {year} &nbsp;|&nbsp; All Rights Reserved
					</div>
					<div className="col-md-6">
						<span className='ml-5 text-white'><a href="/contact-us">Contact us</a></span>
						{/* <span className='ml-5 text-white'><a href="/feedback">Feedback</a></span> */}
						<span className='ml-5 text-white'><a href="/disclaimer">Disclaimer</a></span>
						<span className='ml-5 text-white'><a href="/terms">Terms & Conditions</a></span>
						<span className='ml-5 text-white'><a href="/privacy">Privacy Policy</a></span>
					</div>
				</div>
			</div>
			{askToggle &&
				<div className="card card-shadow px-20 py-20 help-card">
					<div className="row">
						<div className="col-md-12">
							<div className="comment-form p-0">
							<span className="mb-20">
								<strong>Ask Cricket related Questions!</strong>
							</span>
							<hr/>
							<form onSubmit={handleSubmit(onSubmit)}> 
								<div className="form-row">
									<div className="col-md-12">
										<div className="input-field">
										<label htmlFor="wtsp_number">WhatsApp Number</label>
											<input id="wtsp_number" type="number" name="wtsp_number" placeholder="WhatsApp Number" required {...register("wtsp_number")} />
										</div>
									</div>
								</div>
								<div className="input-field textarea mb-0">
								<label htmlFor="question">Question</label>
								<textarea id="question" name="question" placeholder="Write your question" defaultValue={""} {...register("question")}/>
								</div>
								<button type="submit" className="cricnotch-btn btn-filled radius-5">{loader ? 'Submitting...' : 'Submit'}</button>
							</form>
							</div>
						</div>
					</div>
				</div>
			}
			<div className="help" onClick={() => toggleAskForm()}>
			{askToggle ? 'X' : '?'}
			</div>
		</footer>
    );
}

export default Footer;
