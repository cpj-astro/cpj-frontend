import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import LocationSearch from '../../components/LocationSearch';

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
						navigate('/sign-in');
					} else {
						toast.error(response.data.message);
						navigate('/sign-up');
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
    return (
		<div id="main" className="main-container p-0">
			<section className="auth-sec signup">
				<div className="auth-form">
					<div className="auth-form-header display-set">
						<a href="/" className="logo">
							<img src="/assets/images/logo.png" alt="logo" />
						</a>
					</div>

					<div className='row'>
						<div className='col-md-12'>
							<div className='text-center mt-3'>
								<h1>Sign Up</h1>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='pt-20'>
						<input type="hidden" name="latitude"/>
						<input type="hidden" name="longitude"/>
						<input type="hidden" name="birth_place"/>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="input-field">
                                    <label htmlFor="first_name">First Name</label>
                                    <input 
										id="first_name" 
										type="text" 
										name="first_name" 
										placeholder="Enter first name" 
										{...register("first_name")}
									/>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="input-field">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input 
										id="last_name" 
										type="text" 
										name="last_name" 
										placeholder="Enter last name" 
										{...register("last_name")}
									/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="input-field">
                                    <label htmlFor="birth_date">Birth Date</label>
                                    <input 
										id="birth_date" 
										type="date" 
										name="birth_date" 
										placeholder="Enter birth date" 
										{...register("birth_date")}
									/>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="input-field">
                                    <label htmlFor="birth_time">Birth Time (24-hour format)</label>
                                    <input 
										id="birth_time"  
										type="time" 
										name="birth_time"  
										placeholder="Enter birth time" 
										{...register("birth_time")}
									/>
                                </div>
                            </div>
                        </div>
						
						<div className='row'>
                            <div className='col-md-6'>
								<div className="input-field">
									<label htmlFor="location">Enter Location</label>
									<LocationSearch onLocationSelect={handleLocationSelect}/>
								</div>
                            </div>
                            <div className='col-md-6'>
								<div className="input-field">
									<label htmlFor="useremail">Email Address</label>
									<input 
										id="email" 
										type="email" 
										name="email" 
										placeholder="Enter email" 
										{...register("email")}
									/>
								</div>
                            </div>
                        </div>
						
						<div className='row'>
                            <div className='col-md-6'>
								<div className="input-field">
									<label htmlFor="password">Password</label>
									<input 
										id="password" 
										type="password" 
										name="password" 
										placeholder="Enter password" 
										{...register("password")}
									/>
								</div>
                            </div>
                            <div className='col-md-6'>
								<div className="input-field">
									<label htmlFor="confirm_password">Confirm Password</label>
									<input 
										id="confirm_password" 
										type="password" 
										name="confirm_password" 
										placeholder="Confirm Password" 
										{...register("confirm_password")}	
									/>
								</div>
                            </div>
                        </div>
					
						<div className="form-row text-center">
							<div className="col-sm-12">
								<input type='checkbox' name="terms" {...register("accept_terms")}/> I accept all <a href='/terms'>terms & conditions</a> and I am above 18 years <a href='/terms'></a>
							</div>
						</div>


						<button type="submit" className="cricnotch-btn btn-filled radius-5">Create Your Account</button>
						<div className="form-row text-center mt-2">
							<div className="col-sm-12">
								Already have an account? <a href="/sign-in" className="forgot-link">Sign in</a>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
    );
}
    
export default SignUp;