import React from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Kundli from '../../components/Kundli';
import { Modal, Button } from 'react-bootstrap';
import MatchKundli from '../../components/MatchKundli';
import Loader from '../../components/Loader';

function Profile() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [activeTab, setActiveTab] = useState('profile-details');
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [user, setUserData] = useState([]);
    const [payments, setPaymentsDetails] = useState([]);
    const [reportData, setReportData] = useState({
        MatchName:'',
        MatchStart:'',
        Weather:'',
        ProfileName: '',
        SignName: '',
        MatchAstrology: '',
        VenueWiseZodiac: '',
        LuckyNumbers: '',
        LuckyColors: '',
        SpecialRecommendation: '',
        AstroFavPlayers: '',
        MatchBetSessionFancy: '',
        VenueFavZodiac: '',
        FavTeams: '',
        FancyBet6Ovrs: '',
        FancyBet20Ovrs: '',
        Suggestion: '',
        AstrologicalBettingTime: '',
        OverallBettingForMatch: '',
        Direction: '',
        Mantras: '',
    });

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
            if(response.data.success){
                setUserData(response.data.data);
                setPaymentsDetails(response.data.payment_details);
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                toast.error('Session Expired!, Please Re-login.')
                navigate('/sign-in');
            } else {
                console.log(error);
            }
        });
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const reportSet = (reportData) => {
        handleShowModal();
        setLoader(true);
        try {
            const data = reportData.astrology_data.split('|').map((item) => item.trim());
            setReportData({
                MatchName: reportData.team_a + ' Vs ' + reportData.team_b,
                MatchStart: reportData.match_date,
                Weather: reportData.weather,
                ProfileName: user.first_name + ' ' + user.last_name,
                SignName: user.sign_name,
                MatchAstrology: data[0],
                VenueWiseZodiac: data[1],
                LuckyColors: data[2],
                LuckyNumbers: data[3],
                SpecialRecommendation: data[4],
                AstroFavPlayers: data[5],
                MatchBetSessionFancy: data[6],
                VenueFavZodiac: data[7],
                FavTeams: data[8],
                FancyBet6Ovrs: data[9],
                FancyBet20Ovrs: data[10],
                Suggestion: data[11],
                AstrologicalBettingTime: data[12],
                OverallBettingForMatch: data[13],
                Direction: data[14],
                Mantras: data[15],
            });
        } catch (error) {
            setLoader(false);
            handleCloseModal()
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [reportData])
    
    useEffect(() => {
        fetchUserData();
    },[])
    return (
        <>
            <Header/>
            <div id="main" className="main-container">
                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" style={{paddingLeft: '0px'}}>
                    <Modal.Body>
                        {loader ?
                            <Loader/> :
                            <section className='player-contact pt-0'>
                                <div className='player-profile'>
                                    <div className="player-info">
                                        <div className="country-info align-items-center">
                                            <span className="country-name text-13">Astrology Details</span>
                                        </div>
                                        <hr className="mt-0"/>
                                        <div className="info-body">
                                            <ul className="list-striped mr-05">
                                                <li>
                                                    <span>Match Name</span>
                                                    <p className='text-muted'>{reportData.MatchName ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Match Start</span>
                                                    <p className='text-muted'>{reportData.MatchStart ?? 'N/A'} IST</p>
                                                </li>
                                                <li>
                                                    <span>Weather</span>
                                                    <p className='text-muted'>{reportData.Weather ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Profile Name</span>
                                                    <p className='text-muted'>{reportData.ProfileName ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Direction</span>
                                                    <p className='text-muted'>{reportData.Direction ?? 'N/A'}</p>
                                                </li>
                                            </ul>
                                            <ul className="list-striped">
                                                <li>
                                                    <span>Rashi/Zodiac</span>
                                                    <p className='text-muted'>{reportData.SignName ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Favourite Zodiacs</span>
                                                    <p className='text-muted'>{reportData.VenueWiseZodiac ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Lucky Numbers</span>
                                                    <p className='text-muted'>{reportData.LuckyNumbers ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Lucky Colours</span>
                                                    <p className='text-muted'>{reportData.LuckyColors ?? 'N/A'}</p>
                                                </li>
                                                <li>
                                                    <span>Favourite Team</span>
                                                    <p className='text-muted'>{reportData.FavTeams ?? 'N/A'}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container'>
                                            <div className="country-info align-items-center">
                                                <span className="country-name text-13">Match Astrology</span>
                                            </div>
                                            <span className='text-muted'>
                                                {reportData.MatchAstrology ?? 'N/A'}
                                            </span>
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container'>
                                            <div className="country-info align-items-center">
                                                <span className="country-name text-13">Astrological Favourite players</span>
                                            </div>
                                            <span className='text-muted'>
                                                {reportData.AstroFavPlayers ?? 'N/A'}
                                            </span>
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container text-center'>
                                            <span className="country-name text-13 mb-2">Match Natal Chart</span>
                                            <MatchKundli housesData={user && user.kundli_data ? user.kundli_data : []} />
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container'>
                                            <div className="country-info align-items-center">
                                                <span className="country-name text-13">Suggestions</span>
                                            </div>
                                            <span className='text-muted'>
                                                {reportData.Suggestion ?? 'N/A'}
                                            </span>
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container'>
                                            <div className="country-info align-items-center">
                                                <span className="country-name text-13">Mantras</span>
                                            </div>
                                            <span className='text-muted'>
                                                {reportData.Mantras ?? 'N/A'}
                                            </span>
                                        </div>
                                        <hr className='mb-0'/>
                                        <div className='container'>
                                            <div className="country-info align-items-center">
                                                <span className="country-name text-13">Disclaimer</span>
                                            </div>
                                            <span className='text-muted'>
                                                The testimonials provided on our website are personal views and experiences of our clients. We do not make any type of false claims of guaranteed results as we are not GODS or HIS decendants. We promise the best of the services with truth, faith and devotion. There is no guarantee of specific results and that the results can vary as every individual has its own horoscope and different pattern of their planets. Hence, results or final effects of remedies could vary from person to person.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="container breadcrumb-area">
                    <div className="breadcrumb">
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
                                                    <div className='col-md-12'>
                                                        <aside className="sidebar right-sidebar">
                                                            <div className="widget widget-upcoming-match">
                                                                 <ul className="nav nav-tabs custom-nav">
                                                                    <li className={activeTab === 'profile-details' ? 'cursor-pointer active' : 'cursor-pointer'}>
                                                                        <a onClick={() => handleTabChange('profile-details')}>Personal Details</a>
                                                                    </li>
                                                                    <li className={activeTab === 'view-kundli' ? 'cursor-pointer active' : 'cursor-pointer'}>
                                                                        <a onClick={() => handleTabChange('view-kundli')}>Kundli</a>
                                                                    </li>
                                                                    <li className={activeTab === 'astrology-reports' ? 'cursor-pointer active' : 'cursor-pointer'}>
                                                                        <a onClick={() => handleTabChange('astrology-reports')}>Payments & Reports</a>
                                                                    </li>
                                                                    <li className={activeTab === 'account-settings' ? 'cursor-pointer active' : 'cursor-pointer'}>
                                                                        <a onClick={() => handleTabChange('account-settings')}>Account Settings</a>
                                                                    </li>
                                                                </ul>
                                                                <hr/>

                                                                <div className="tab-content">
                                                                    <div id="profile-details" className={`tab-pane fade in ${activeTab === 'profile-details' ? 'show active' : ''}`} onClick={() => { fetchUserData(); }}>
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
                                                                    </div>
                                                                    <div id="view-kundli" className={`tab-pane fade ${activeTab === 'view-kundli' ? 'show active' : ''}`}>
                                                                        <div className='row'>
                                                                            <div className='col-md-4 display-set text-center'>
                                                                                <Kundli housesData={user && user.kundli_data ? user.kundli_data : []}/>
                                                                            </div>
                                                                            <div className='col-md-8'>
                                                                                <h2>Kundli Details</h2>
                                                                                <ul>
                                                                                {user && user.house_details ? user.house_details.map((detail, index) => (
                                                                                    <li key={index}>{detail}</li>
                                                                                )) : <li></li>}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="astrology-reports" className={`tab-pane fade ${activeTab === 'astrology-reports' ? 'show active' : ''}`}>
                                                                        <div className="table-responsive">
                                                                            <table className="widget-table table table-striped no-border">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col" className="text-12">Payment ID</th>
                                                                                        <th scope="col" className="text-12">Price</th>
                                                                                        <th scope="col" className="text-12">Status</th>
                                                                                        <th scope="col" className="text-12">Match</th>
                                                                                        <th scope="col" className="text-12">Opponents</th>
                                                                                        <th scope="col" className="text-12">Date</th>
                                                                                        <th scope="col" className="text-12">Time</th>
                                                                                        <th scope="col" className="text-12">Venue</th>
                                                                                        <th scope="col" className="text-12">Pandit Name</th>
                                                                                        <th scope="col" className="text-12">Astrology Report</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                {(payments && payments.length > 0) ? payments.map((payment, index) => (
                                                                                    <tr key={index}>
                                                                                        <td className='text-capitalize'>{payment && payment.razorpay_payment_id}</td>
                                                                                        <td className='text-capitalize'>₹ {payment && payment.amount}</td>
                                                                                        <td className='text-capitalize'><span className='badge badge-success'>Paid</span></td>
                                                                                        <td className='text-capitalize'>{payment && payment.match && payment.match.matchs}</td>
                                                                                        <td>
                                                                                            <div className="country-info text-capitalize">
                                                                                                <span className="country-name text-13">{payment && payment.match && payment.match.team_a_short}</span>
                                                                                                <span className="country-name text-12 mx-2">VS</span>
                                                                                                <span className="country-name text-13">{payment && payment.match && payment.match.team_b_short}</span>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>{payment && payment.match && payment.match.match_date}</td>
                                                                                        <td>{payment && payment.match && payment.match.match_time}</td>
                                                                                        <td>{payment && payment.match && payment.match.venue}</td>
                                                                                        <td>Report By: <b>{payment && payment.pandit && payment.pandit.name}</b></td>
                                                                                        <td className='text-center'>
                                                                                            {payment && payment.match_id ?
                                                                                            <span className="cricnotch-btn btn-filled py-05 cursor-pointer" onClick={() => navigate(`/match-astrology/${payment.match_id}`)}>
                                                                                                <i className='fa fa-eye'></i> View Report
                                                                                            </span>
                                                                                            : 
                                                                                            <span>
                                                                                                No Report
                                                                                            </span>}
                                                                                        </td>
                                                                                    </tr>
                                                                                )) : 
                                                                                <tr>
                                                                                    <td colSpan={10}>No Reports Yet</td>    
                                                                                </tr>}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div id="account-settings" className={`tab-pane fade ${activeTab === 'account-settings' ? 'show active' : ''}`}>
                                                                        Put Settings Here
                                                                        {/* ... (existing code for Account Settings) */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </aside>
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