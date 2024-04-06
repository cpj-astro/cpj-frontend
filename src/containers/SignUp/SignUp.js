import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import LocationSearch from '../../components/LocationSearch';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function SignUp() {
	const navigate = useNavigate();
	const { register, handleSubmit, setValue, reset, formState, formState: { isSubmitSuccessful } } = useForm();

	const validateData = (data) => {
		if(data && data.first_name === '') {
			toast.error('please enter first name');
			return false;
		} if(data && data.last_name === '') {
			toast.error('please enter last name');
			return false;
		} if(data && data.birth_date === '') {
			toast.error('please enter birth date');
			return false;
		} if(data && data.birth_time === '') {
			toast.error('please enter birth time');
			return false;
		} if(data && data.email === '') {
			toast.error('please enter email');
			return false;
		} if(!data.birth_place || data.birth_place === '') {
			toast.error('please enter birth place');
			return false;
		} if(data && data.password === '') {
			toast.error('please enter password'); 
			return false;
		} if(data && data.confirm_password === '') {
			toast.error('please enter confirm password'); 
			return false;
		} if(data.password !== data.confirm_password) {
			toast.error('Password & confirm password not match');
			return false; 
		}
		return true;
	}

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

	const onSubmit = async (data) => {
		if(!data.accept_terms) {
			return toast.error("Please enter other details and accept terms");	
		}
		if(validateData(data)) {
			try {
				axios.post(
					process.env.REACT_APP_DEV === 'true' ? 
					`${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/sign-up` : 
					`${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/sign-up`, 
					data
				)
				.then((response) => {
					console.log(response);
					if(response.data.status == true) {
						toast.success('Your account has been created successfully, Please sign in');
						navigate('/');
					} else {
						toast.error(response.data.message);
						navigate('/sign-up');
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
				navigate('/sign-up');
			}
		} else {
			console.log('Invalid Data');
		}
	};

	const handleLocationSelect = (data) => {
        setValue('latitude', data.lat);
        setValue('longitude', data.lng);
        setValue('birth_place', data.location);        
    } 

	const onFailure = () => {
		toast.error("Invalid Request, Please try again!");
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
						<div className='container pt-3'>
							<div className="cp__form-wrap">	
								{/* <div className='row'>
									<div className='col-md-12'>
										<div className='text-center'>
											<h2>SIGN UP</h2>
										</div>
										<hr/>
									</div>
								</div> */}
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
								<div className='text-center w-100 cp__breakpoint'>OR</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<input type="hidden" name="latitude"/>
									<input type="hidden" name="longitude"/>
									<input type="hidden" name="birth_place"/>
									<div className="row">
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="first_name">First Name</label>
												<input 
													id="first_name" 
													type="text" 
													name="first_name" 
													placeholder="Enter first name" 
													{...register("first_name")}
													className='form-control'
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="last_name">Last Name</label>
												<input 
													id="last_name" 
													type="text" 
													name="last_name" 
													placeholder="Enter last name" 
													{...register("last_name")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="birth_date">Birth Date</label>
												<input 
													id="birth_date" 
													type="date" 
													name="birth_date" 
													placeholder="Enter birth date" 
													{...register("birth_date")}
													className="form-control" 
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="birth_time">Birth Time (24-hour format)</label>
												<input 
													id="birth_time"  
													type="time" 
													name="birth_time"  
													placeholder="Enter birth time" 
													{...register("birth_time")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="location">Birth Place</label>
												<LocationSearch onLocationSelect={handleLocationSelect}/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="useremail">Email Address</label>
												<input 
													id="email" 
													type="email" 
													name="email" 
													placeholder="Enter email" 
													{...register("email")}
													className="form-control" 
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="password">Password</label>
												<input 
													id="password" 
													type="password" 
													name="password" 
													placeholder="Enter password" 
													{...register("password")}
													className="form-control" 
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="cp__form-group">
												<label htmlFor="confirm_password">Confirm Password</label>
												<input 
													id="confirm_password" 
													type="password" 
													name="confirm_password" 
													placeholder="Confirm Password" 
													{...register("confirm_password")}	
													className="form-control" 
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 text-center">
											<span className='doesn-text'>
												<input type='checkbox' name="terms" {...register("accept_terms")}/> I accept all 
												<a href='/terms'> terms & conditions</a> and I am above 18 years 
												<a href='/terms'></a>
											</span>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-md-12">
											<button type="submit" className="btn btn-primary btn-block">Create Your Account</button>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-md-12 text-center">
											<span className='doesn-text'>
												Already have an account? <a href='/sign-in'>Sign in</a>
											</span>
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
    );
}
    
export default SignUp;