import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedUserDropdownOpen, setIsLoggedUserDropdownOpen] = useState(false);
	
    const toggleLoggedUserDropdown = () => {
		setIsLoggedUserDropdownOpen(!isLoggedUserDropdownOpen);
	};
	
	const dropDownStyle = {
		display: isLoggedUserDropdownOpen ? 'block' : 'none',
	};

	const logout = () => {
		localStorage.removeItem('client_token');
		navigate('/sign-in');
	}
    return (
        <section className="topbar">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <a href="/" className="logo">
                            <img src="/assets/images/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div className="col-sm-6">
                        <div className="topbar-right">
                            <div className="logged-user">
                                <a href={'#'} onClick={toggleLoggedUserDropdown}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="Account" transform="translate(-1367.51 -13.509)">
                                            <rect width="24" height="24" rx="12" transform="translate(1367.51 13.509)" opacity="0.15" />
                                            <g transform="translate(1371.569 20.299)">
                                                <path
                                                    id="_02"
                                                    data-name="02"
                                                    d="M1233.169,61.123a12.434,12.434,0,0,1-16.309-.017,7.393,7.393,0,0,1,4.639-4.935,5.675,5.675,0,0,0,7.044.006A7.391,7.391,0,0,1,1233.169,61.123Z"
                                                    transform="translate(-1216.86 -47.297)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="_01"
                                                    data-name="01"
                                                    d="M1307.65-133.375a4.418,4.418,0,0,1-2.7,4.07h0a4.386,4.386,0,0,1-.779.246h0a4.427,4.427,0,0,1-.935.1,4.409,4.409,0,0,1-.949-.1,4.4,4.4,0,0,1-.77-.244,4.418,4.418,0,0,1-2.7-4.068,4.415,4.415,0,0,1,4.415-4.415A4.415,4.415,0,0,1,1307.65-133.375Z"
                                                    transform="translate(-1295.07 137.79)"
                                                    fill="#fff"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                {isLoggedUserDropdownOpen && (
                                    <div className="logged-user-dropdown" style={dropDownStyle}>
                                        <ul>
                                            <li>
                                                <a href={'/profile'}><i className="far fa-edit"></i> Edit Profile</a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fas fa-cogs"></i> Account Settings</a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="far fa-question-circle"></i> Help Center</a>
                                            </li>
                                            <li>
                                                <span onClick={()=>logout()}><i className="fas fa-sign-out-alt"></i> Sign Out</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
