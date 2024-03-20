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
import moment from 'moment';
import MatchKundli from '../../components/MatchKundli';
import Loader from '../../components/Loader';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';

function Profile() {
    const navigate = useNavigate();
    const [showAnswer, setShowAnswer] = useState(null);
    const [showQuestion, setShowQuestion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [activeTab, setActiveTab] = useState('profile-details');
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [user, setUserData] = useState([]);
    const [payments, setPaymentsDetails] = useState([]);
    const [questions, setQuestions] = useState([]);
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
                setQuestions(response.data.questions);
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
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const statusSet = (status) => {
        if(status === 'success') {
            return 'badge badge-success'
        } else if(status === 'pending') {
            return 'badge badge-warning'
        } else {
            return 'badge badge-danger'
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
            <HeaderV2/>
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
            <main className="cp__list-sec">
                <div className="container p-0">
                    <div className="cp__mobile-tab">
                        <div className="nav nav-tabs mb-3 d-lg-none d-lg-block" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                            <button className="nav-link" id="nav-live-tab" data-bs-toggle="tab" data-bs-target="#nav-live" type="button" role="tab" aria-controls="nav-live" aria-selected="false">Live</button>
                            <button className="nav-link" id="nav-upcoming-tab" data-bs-toggle="tab" data-bs-target="#nav-upcoming" type="button" role="tab" aria-controls="nav-upcoming" aria-selected="false">Upcoming</button>
                            <button className="nav-link" id="nav-finished-tab" data-bs-toggle="tab" data-bs-target="#nav-finished" type="button" role="tab" aria-controls="nav-finished" aria-selected="false">Finished</button>
                            <button className="nav-link" id="nav-news-tab" data-bs-toggle="tab" data-bs-target="#nav-news" type="button" role="tab" aria-controls="nav-news" aria-selected="false">News</button>
                        </div>
                    </div>
                    <div className="cp__listing-wrap">
                        <div className="container">
                            <h2>Profile</h2>
                            <hr/>
                        </div>
                        <section>
                            <div className='container'>
                                <div className='ul-group-set'>
                                    <ul style={{overflowX: 'auto!important'}}>
                                        <li className={activeTab === 'profile-details' ? 'li-active' : 'li-inactive'} onClick={() => handleTabChange('profile-details')}>
                                            Personal Info
                                        </li>   
                                        <li className={activeTab === 'astrology-reports' ? 'li-active' : 'li-inactive'} onClick={() => handleTabChange('astrology-reports')}>
                                            Payments
                                        </li>
                                        <li className={activeTab === 'asked-questions' ? 'li-active' : 'li-inactive'} onClick={() => handleTabChange('asked-questions')}>
                                            Questions
                                        </li>
                                    </ul>
                                </div>

                                <div className="tab-content mt-3">
                                    <div id="profile-details" className={`tab-pane fade in ${activeTab === 'profile-details' ? 'show active' : ''}`} onClick={() => { fetchUserData(); }}>
                                        <div className="cp__form-wrap">	
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="cp__form-group">
                                                        <label htmlFor="first_name">First Name</label>
                                                        <input 
                                                            id="first_name" 
                                                            type="text" 
                                                            name="first_name" 
                                                            placeholder="Enter first name" 
                                                            value={user.first_name}
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
                                                            value={user.last_name}
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
                                                            value={user.birth_date}
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
                                                            value={user.birth_time}
                                                            className="form-control" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="cp__form-group">
                                                        <label htmlFor="location">Birth Place</label>
                                                        <input 
                                                            id="birth_place"  
                                                            type="text" 
                                                            name="birth_place"  
                                                            placeholder="Enter birth time" 
                                                            value={user.birth_place}
                                                            className="form-control" 
                                                        />
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
                                                            value={user.email}
                                                            className="form-control" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mt-0 mb-4'/>
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
                                    </div>
                                    <div id="astrology-reports" className={`tab-pane fade ${activeTab === 'astrology-reports' ? 'show active' : ''}`}>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col">CPJ ID</th>
                                                        <th scope="col">Transaction ID</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Match</th>
                                                        <th scope="col">Opponents</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col">Venue</th>
                                                        <th scope="col">Pandit Name</th>
                                                        <th scope="col">Astrology Report</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(payments && payments.length > 0) ? payments.map((payment, index) => (
                                                        <tr key={index}>
                                                            <td className='text-capitalize'>{payment && payment.merchant_transaction_id}</td>
                                                            <td className='text-capitalize'>{(payment && payment.transaction_id) ?? 'N/A'}</td>
                                                            <td className='text-capitalize'>₹ {payment && payment.amount}</td>
                                                            <td className='text-capitalize'><span className={statusSet(payment.status)}>{payment && payment.status}</span></td>
                                                            <td className='text-capitalize'>{payment && payment.match && payment.match.matchs}</td>
                                                            <td>
                                                                <span>{payment && payment.match && payment.match.team_a_short} VS {payment && payment.match && payment.match.team_b_short}</span>
                                                            </td>
                                                            <td>{payment && payment.match && payment.match.match_date}</td>
                                                            <td>{payment && payment.match && payment.match.match_time}</td>
                                                            <td>{payment && payment.match && payment.match.venue}</td>
                                                            <td>{payment && payment.pandit && payment.pandit.name}</td>
                                                            <td className='text-center'>
                                                                {payment && payment.match_id && payment.transaction_id ?
                                                                <span style={{width: '130px'}} className="cp__fill-btn-profile" onClick={() => navigate(`/match-reports/${payment.match_id}`)}>
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
                                    <div id="asked-questions" className={`tab-pane fade ${activeTab === 'asked-questions' ? 'show active' : ''}`}>
                                        <div>
                                            <u>Show Question : {showQuestion}</u> <br/>
                                            {showQuestion && <span className='badge badge-primary cursor-pointer' onClick={()=>setShowQuestion(null)}><i className="fa fa-trash"></i>clear</span>}
                                        </div>
                                        <div>
                                            <u>Show Answer : {showAnswer}</u> <br/>
                                            {showAnswer && <span className='badge badge-primary cursor-pointer' onClick={()=>setShowAnswer(null)}><i className="fa fa-trash"></i>clear</span>}
                                        </div>
                                        <div className="table-responsive mt-3">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col">Phone Number</th>
                                                        <th scope="col">Question</th>
                                                        <th scope="col">Answer</th>
                                                        <th scope="col">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(questions && questions.length > 0) ? questions.map((question, index) => (
                                                    <tr key={index}>
                                                        <td className='text-capitalize'>{question && question.wtsp_number}</td>
                                                        <td className='text-capitalize'>
                                                            {question && question.question && question.question.length > 100 ? 
                                                            <span onClick={()=>setShowQuestion(question.question)}>
                                                                <span className='badge badge-primary cursor-pointer'><i className="fa fa-eye"></i></span>
                                                            </span> : question.question}</td>
                                                        <td className='text-capitalize'>
                                                            {question && !question.answer && (
                                                            <span>
                                                                N/A
                                                            </span>)}
                                                            {question && question.answer && question.answer.length > 2 ? 
                                                            <span onClick={()=>setShowAnswer(question.answer)}>
                                                                <span className='badge badge-primary cursor-pointer'><i className="fa fa-eye"></i></span>
                                                            </span> : question.answer}
                                                        </td>
                                                        <td className='text-capitalize'>{moment(question.created_at).format('MMM Do YY, h:mm:ss') ?? 'N/A'}</td>
                                                    </tr>
                                                )) : 
                                                <tr>
                                                    <td colSpan={10}>No Questions Yet</td>    
                                                </tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>                                     
            <FooterV2/>
        </>
    );
}
    
export default Profile;