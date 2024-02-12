import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { toast } from 'react-toastify';

function SignIn() {
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm();

	const onSubmit = async (data) => {
		try {
			axios.post(
				process.env.REACT_APP_DEV === 'true' ? 
				`${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/sign-in` : 
				`${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/sign-in`, 
				data
			)
            .then((response) => {
                if(response.data.status == true) {
					localStorage.setItem('client_token', response.data.token);
					localStorage.setItem('user_data', response.data.user.id);
					navigate('/');
                } else {
					toast.error(response.data.message);
				}
            }).catch((error) => {
				if(error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
					localStorage.removeItem('user_data');
                    
                    navigate('/sign-in');
                } else {
                    console.log(error);
                }
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
					<div className="auth-form-header display-set">
						<a href="/" className="logo">
							<img src="/assets/images/logo.png" alt="logo" />
						</a>
					</div>

					<div className='row'>
						<div className='col-md-12'>
							<div className='text-center mt-3'>
								<h1>Sign In</h1>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='pt-20'>
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
						<div className="input-field">
							<label for="password">Password</label>
							<input 
								id="password" 
								type="password" 
								name="password" 
								placeholder="Enter password"  
								{...register("password")}
							/>
						</div>

						<button type="submit" className="cricnotch-btn btn-filled radius-5">Sign in to Your Account</button>
						<div className="form-row mt-2">
							<div className="col-sm-8">
							Doesn't have an account yet? <a href="/sign-up" className="forgot-link">Sign Up</a>
							</div>
							<div className="col-sm-4 text-sm-right">
								<a href="/forget-password" className="forgot-link">Forgot Password?</a>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
    );
}

export default SignIn;
