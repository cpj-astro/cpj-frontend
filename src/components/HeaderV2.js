import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HeaderV2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [visitors, setVisitors] = useState([]);
    const accessToken = localStorage.getItem('client_token');

    // Retrieve the activeTab from localStorage or default to '/'
    const initialActiveTab = localStorage.getItem('activeTab') || '/';
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    const logout = () => {
        localStorage.removeItem('client_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('activeTab');
        navigate('/');
    }

    const fetchVisitorList = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_DEV === 'true'
                ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getVisitor`
                : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getVisitor`
            );
            let updatedValue = null;
            const res = response.data.data;
            if(response.data.success) {
                if(res.status) {
                    updatedValue = Math.floor(Math.random() * (res.max - res.min) + res.min)  
                } else {
                    updatedValue = Math.floor(Math.random() * (res.fake_users - 10) + 10)  
                }
                setVisitors(updatedValue);
            }
        } catch (error) {
            if(error.response.data.status_code === 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                navigate('/');
            } else {
                console.log(error);
            }
        }
    };

    const formatNumber = (number) => {
        const formattedNumber = new Intl.NumberFormat('en-IN').format(number);
        return formattedNumber;
    };

    useEffect(() => {
        fetchVisitorList();
    }, []);

    useEffect(() => {
        // Update localStorage whenever activeTab changes
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        // Update activeTab when location pathname changes
        setActiveTab(location.pathname);
    }, [location.pathname]);
    return (
        <header data-aos="" class="headerbar">
            <div className="container">
                <div className="cp__page-header d-flex flex-wrap align-items-center justify-content-between">
                    <div className="bm__header-left d-flex flex-wrap align-items-center">
                        <a href="/" className="cp__logo"><img src="/assets/images/logo.png" alt="logo" /></a>
                    </div>
                    <div className="cp__header-middle">
                        <ul className="cp__menu-wrap d-flex flex-wrap align-items-center">
                            <li><a href="/" className={activeTab === '/' ? 'cp__active' : ''}>Home</a></li>
                            <li><a href="/live" className={activeTab === '/live' ? 'cp__active' : ''}>Live</a></li>
                            <li><a href="/upcoming" className={activeTab === '/upcoming' ? 'cp__active' : ''}>Upcoming</a></li>
                            <li><a href="/finished" className={activeTab === '/finished' ? 'cp__active' : ''}>Finished</a></li>
                            <li><a href="/news" className={activeTab === '/news' ? 'cp__active' : ''}>News</a></li>
                        </ul>
                    </div>
                    <div className="cp__header-right d-flex flex-wrap align-items-center">
                        {accessToken ? 
                        <div className="cp__user-profile dropdown">
                            <button className="dropdown-toggle" type="button" id="dropdownMicroProcessorTrigger" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/assets/images/user-profile.svg" alt="logo" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMicroProcessorTrigger">
                                <li>
                                    <a className="dropdown-item" href={'/profile'}><img src="/assets/images/myprofile.svg" alt="logo" width={24} height={24} />My Profile</a>
                                </li>
                                <li>
                                    <span className="dropdown-item" onClick={logout}><img src="/assets/images/signin-black.svg" alt="logo" width={24} height={24} />Sign Out</span>
                                </li>
                            </ul>
                        </div>
                        :
                        <a href="/sign-up" className="cp__link-btn">
                            Sign In 
                            <img src="/assets/images/signin-blue.svg" alt="logo" className="cp__green" />
                            <img src="/assets/images/signin-black.svg" alt="logo" className="cp__white" />
                        </a>}
                        <span className="cp__fill-btn"><span />{formatNumber(visitors)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
