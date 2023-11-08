import React from 'react';
import axios from 'axios';
import HeaderTwo from '../../components/HeaderTwo';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Kundli from '../../components/Kundli';

function Profile() {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [user, setUserData] = useState([]);
    const [activeTab, setActiveTab] = useState('profile-details');
    var accessToken = localStorage.getItem('client_token');

    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const fetchUserData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            console.log(response);
            if(response.data.success){
                setUserData(response.data.data);
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
                toast.error(error.code);
			}
        });
    }

    const logout = () => {
		localStorage.removeItem('client_token');
		navigate('/sign-in');
	}

    useEffect(() => {
        fetchUserData();
    },[])
    return (
        <>
            <HeaderTwo/>
            <div id="main" className="main-container">
                <div class="container breadcrumb-area">
                    <div class="breadcrumb">
                        <a href="/">Home</a>
                        <span>Profile</span>
                    </div>
                    <h2>Profile</h2>
                </div>
                <section className="product-checkout-sec pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="widget">
                                    <div className="mt-4 card card-shadow px-30 py-30">
                                        <div className="checkout-form p-0">
                                            <form>
                                                <div className="row">
                                                    <div className='col-md-3'>
                                                        <div class="profile-side-nav">
                                                            <ul>
                                                                <li onClick={()=> { fetchUserData(); setActiveTab('profile-details') }}>
                                                                    <span><i class="fa fa-user"></i> Profile Details</span>
                                                                </li>
                                                                <li onClick={()=> { setActiveTab('view-kundli') }}>
                                                                    <span><i class="fa fa-asterisk"></i> View Kundli</span>
                                                                </li>
                                                                <li  onClick={()=> { setActiveTab('payment-history') }}>
                                                                    <span><i class="fa fa-credit-card"></i> Payment's History</span>
                                                                </li>
                                                                <li onClick={()=> { setActiveTab('match-astrology-reports') }}>
                                                                    <span><i class="fa fa-file"></i> Match Astrology Reports</span>
                                                                </li>
                                                                <li onClick={()=> {setActiveTab('account-settings')}}>
                                                                    <span><i class="fas fa-cogs"></i> Account Settings</span>
                                                                </li>
                                                                <li onClick={()=> {logout()}}>
                                                                    <span><i class="fas fa-sign-out-alt"></i> Sign Out</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        {activeTab === 'profile-details' && <div className="profile-details-container">
                                                            <div className="form-row">
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="first_name">First Name</label>
                                                                        <input id="first_name" type="text" name="first_name" placeholder="Enter Firth Name" required value={user.first_name} {...register('first_name')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="last_name">Last Name</label>
                                                                        <input id="last_name" type="text" name="last_name" placeholder="Enter Last Name" required value={user.last_name} {...register('last_name')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="useremail">Email address</label>
                                                                        <input id="useremail" type="email" name="email" placeholder="Enter email" required value={user.email} {...register('email')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="birth_date">Date Of Birth</label>
                                                                        <input id="birth_date" type="date" name="birth_date" placeholder="Birth Date" required value={user.birth_date} {...register('birth_date')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="birth_time">Birth Time - (24 Hour Format)</label>
                                                                        <input id="birth_time" type="time" name="birth_time" required value={user.birth_time} {...register('birth_time')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-field">
                                                                        <label for="birth_place">Birth Place</label>
                                                                        <input id="birth_place" type="text" name="birth_place" placeholder="Birth Place" required value={user.birth_place} {...register('birth_place')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <hr/>
                                                                    <button type="submit" className="cricnotch-btn btn-filled radius-5">Save Changes</button>
                                                                </div>
                                                            </div>
                                                        </div>}
                                                        {activeTab === 'view-kundli' && <div className="view-kundli-container">
                                                            <Kundli housesData={user && user.kundli_data ? user.kundli_data : []}/>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
}
    
export default Profile;