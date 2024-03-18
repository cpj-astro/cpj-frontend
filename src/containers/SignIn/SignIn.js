import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';

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
                    
                    navigate('/');
                } else {
                    console.log(error);
                }
            });
		} catch (error) {
			// Handle sign-in error
			navigate('/');
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
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='row'>
										<div className='col-md-12'>
											<div className='text-center'>
												<h2>SIGN IN</h2>
											</div>
											<hr/>
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
												<label htmlFor="password">Password</label>
												<input 
													id="password" 
													type="password" 
													name="password" 
													placeholder="Enter Password"  
													{...register("password")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<button type="submit" className="btn btn-primary btn-block">Sign in to Your Account</button>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-md-8">
											<span className='doesn-text'>Doesn't have an account yet?</span> <a href="/sign-up" className="forgot-link">Sign Up</a>
										</div>
										<div className="col-md-4 text-end">
											<a href="/forget-password" className="forgot-link">Forgot Password</a>?
										</div>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</main>
			{/* <div id="main" className="main-container p-0">
				<section className="auth-sec login">
					<div className="auth-form">
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
			</div> */}
			<FooterV2/>
		</>
    );
}

export default SignIn;
