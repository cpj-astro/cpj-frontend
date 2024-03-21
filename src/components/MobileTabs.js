import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileTabs() {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize state to keep track of active tab, using localStorage as fallback
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem('activeTab') || location.pathname
    );

    // Update localStorage whenever activeTab changes
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    // Function to handle tab click
    const handleTabClick = (path) => {
        navigate(path);
        localStorage.setItem('activeTab', path);
    };

    return (
        <div className="cp__mobile-tab">
            <div className="nav nav-tabs mb-3 d-lg-none d-lg-block" id="nav-tab" role="tablist">
                <button
                    onClick={() => handleTabClick('/')}
                    className={`nav-link ${activeTab === '/' ? 'active' : ''}`}
                    type="button"
                >
                    Home
                </button>
                
                <button
                    onClick={() => handleTabClick('/astro')}
                    className={`nav-link ${activeTab === '/astro' ? 'active' : ''}`}
                    type="button"
                >
                    Astrology
                </button>

                <button
                    onClick={() => handleTabClick('/live')}
                    className={`nav-link ${activeTab === '/live' ? 'active' : ''}`}
                    type="button"
                >
                    Live
                </button>

                <button
                    onClick={() => handleTabClick('/upcoming')}
                    className={`nav-link ${activeTab === '/upcoming' ? 'active' : ''}`}
                    type="button"
                >
                    Upcoming
                </button>

                <button
                    onClick={() => handleTabClick('/finished')}
                    className={`nav-link ${activeTab === '/finished' ? 'active' : ''}`}
                    type="button"
                >
                    Finished
                </button>

                <button
                    onClick={() => handleTabClick('/news')}
                    className={`nav-link ${activeTab === '/news' ? 'active' : ''}`}
                    type="button"
                >
                    News
                </button>
            </div>
        </div>
    );
}
