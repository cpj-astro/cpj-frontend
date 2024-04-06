import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function SignIn() {
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm();
	
	const onSuccess = (res) => {
		let payload = res.profileObj;
		let data = {
			first_name: payload.givenName,
			last_name: payload.familyName,
			email: payload.email,
			is_google_success: true,
		}
		
		try {
			axios.post(
				process.env.REACT_APP_DEV === 'true' ? 
				`${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/sign-in` : 
				`${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/sign-in`, 
			data
			)
			.then((response) => {
				console.log(response);
                if(response.data.status == true) {
					localStorage.setItem('client_token', response.data.token);
					localStorage.setItem('user_data', response.data.user.id);
					if(response.data.user && response.data.user.report_counter == 0) {
						localStorage.setItem('activeTab', '/astro');
						localStorage.setItem('reportCounter', 0);
						navigate('/astro');
					} else {
						localStorage.setItem('reportCounter', response.data.user.report_counter);
						localStorage.setItem('activeTab', '/');
						navigate('/');
					}
                } else {
						toast.error(response.data.message);
					}
			    })
			.catch((error) => {
				if(error.response.data.status_code == 401) {
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
	
	const onFailure = () => {
		toast.error("Invalid Request, Please try again!");
	};
	
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
					localStorage.setItem('activeTab', '/');
					navigate('/');
                } else {
						toast.error(response.data.message);
					}
			    })
			.catch((error) => {
				if(error.response.data.status_code == 401) {
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
						
	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: ""
			})
		};
		
		gapi.load('client:auth2', start);
	});
    return (
		<>
			<HeaderV2/>
			<main className="cp__list-sec">
				<div className="cp__listing-wrap">
					<section>
						<div className='container pt-3' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<div className="cp__form-wrap text-center" style={{width: 'fit-content'}}>	
								{/* <div className='row'>
									<div className='col-md-12'>
										<div className='text-center'>
											<h2>SIGN IN</h2>
										</div>
										<hr/>
									</div>
								</div> */}
								<img src='/assets/images/logo.png' className='cpj-logo-set'/>
								{/* <hr/> */}
								<GoogleLogin
									render={renderProps => (
										<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="cp__fill-btn w-100"><i className="fa fa-google" aria-hidden="true"></i> &nbsp;Continue with Google</button>
									)}
									clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
									// buttonText="Login with Google"
									onSuccess={onSuccess}
									onFailure={onFailure}
									cookiePolicy={'single_host_origin'}
									// isSignedIn={true}
								/>
								{/* <div className='text-center w-100 cp__breakpoint'>OR</div>
								<form onSubmit={handleSubmit(onSubmit)}>
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
								</form>

								<div className="row mt-2">
									<div className="col-md-8">
										<span className='doesn-text'>Doesn't have an account yet?</span> <a href="/sign-up" className="forgot-link">Sign Up</a>
									</div>
									<div className="col-md-4 text-end">
										<a href="/forget-password" className="forgot-link">Forgot Password</a>?
									</div>
								</div> */}
							</div>
						</div>
					</section>
				</div>
			</main>
		<FooterV2/>
		</>
    );
}

export default SignIn;
