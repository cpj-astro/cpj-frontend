import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

function SignIn() {
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm();

	const onSubmit = async (data) => {
		console.log("dev" ,process.env.REACT_APP_DEV);
		console.log("dev api", process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL);
		console.log("live api", process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL);
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
					navigate('/');
                } 
            }).catch((error) => {
				console.log(error);
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
						<h3>Sign in to your account</h3>
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
						<div className="form-row">
							<div className="col-sm-8">
							Doesn't have an account yet? <a href="/sign-up" className="forgot-link">Sign Up</a>
							</div>
							<div className="col-sm-4 text-sm-right">
								<a href="#" className="forgot-link">Forgot Password?</a>
							</div>
						</div>

						<button type="submit" className="cricnotch-btn btn-filled radius-5">Sign in to Your Account</button>
					</form>
				</div>
			</section>
		</div>
    );
}

export default SignIn;
