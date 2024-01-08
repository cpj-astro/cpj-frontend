import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { toast } from 'react-toastify';

function ResetPassword() {
    const {token} = useParams();
    
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm();

	const onSubmit = async (data) => {
        if(data.new_password !== data.confirm_password) {
			toast.error('Password & confirm password not match');
			return false; 
		} 
        const params = {
            token: token,
            new_password: data.new_password,
            confirm_password: data.confirm_password
        }
		try {
			axios.post(
				process.env.REACT_APP_DEV === 'true' ? 
				`${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/reset-password` : 
				`${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/reset-password`, 
				params
			)
            .then((response) => {
                if(response.data.status == true) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                reset();
            }).catch((error) => {
				if(error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
                    toast.error('Session Expired!, Please Re-login.')
                    navigate('/sign-in');
                } else {
                    console.log(error);
                }
                navigate('/sign-in');
            });
		} catch (error) {
			navigate('/sign-in');
		}
	};
    return (
		<div id="main" className="main-container p-0">
			<section className="auth-sec login">
				<div className="auth-form">
					<div className="auth-form-header">
						<h3>Reset Password</h3>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input-field">
							<label for="new_password">New Password</label>
							<input 
								id="new_password" 
								type="password" 
								name="new_password" 
								placeholder="Enter New Password" 
								{...register("new_password")}
							/>
						</div>
                        <div className="input-field">
                            <label for="confirm_password">Confirm Password</label>
							<input 
								id="confirm_password" 
								type="password" 
								name="confirm_password" 
								placeholder="Enter Confirm Password" 
								{...register("confirm_password")}
							/>
						</div>
						<div className="form-row">
							<div className="col-sm-8">
							Back to sign in? <a href="/sign-in" className="forgot-link">Sign In</a>
							</div>
						</div>

						<button type="submit" className="cricnotch-btn btn-filled radius-5">Submit</button>
					</form>
				</div>
			</section>
		</div>
    );
}

export default ResetPassword;
