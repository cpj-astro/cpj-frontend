import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { toast } from 'react-toastify';

function FPSendLink() {
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm();

	const onSubmit = async (data) => {
        if(data.email === '') {
            toast.error('Please enter a valid email');
        }
		try {
			axios.post(
				process.env.REACT_APP_DEV === 'true' ? 
				`${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/forget-password` : 
				`${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/forget-password`, 
				data
			)
            .then((response) => {
                if(response.data.status == true) {
                    toast.success(response.data.message);
                    reset();
                } 
            }).catch((error) => {
				if(error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
                    
                    navigate('/sign-in');
                } else {
                    console.log(error);
                }
                navigate('/sign-in');
            });
		} catch (error) {
			// Handle sign-in error
			navigate('/sign-in');
		}
	};
    return (
		<div id="main" className="main-container p-0">
			<section className="auth-sec login">
				<div className="auth-form">
					<div className="auth-form-header">
						<h3>Forget Password</h3>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input-field">
							<label for="email">Email Address</label>
							<input 
								id="email" 
								type="email" 
								name="email" 
								placeholder="Enter email" 
								{...register("email")}
							/>
						</div>
						<div className="form-row">
							<div className="col-sm-8">
							Back to sign in? <a href="/sign-in" className="forgot-link">Sign In</a>
							</div>
						</div>

						<button type="submit" className="cricnotch-btn btn-filled radius-5">Send Reset Link</button>
					</form>
				</div>
			</section>
		</div>
    );
}

export default FPSendLink;
