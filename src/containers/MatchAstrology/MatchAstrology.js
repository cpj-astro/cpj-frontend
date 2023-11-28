import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RazorpayIntegration from '../../components/RazorPayIntegration';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

function MatchAstrology() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [panditData, setPanditData] = useState([]);
    const [selectedPandit, setSelectedPandit] = useState(null);
    const [user, setUserData] = useState([]);
    const [match, setMatch] = useState(null);
    const [panditNo, setPanditNo] = useState(0);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [isPaymentFail, setIsPaymentFail] = useState(false);
    const [loader, setLoader] = useState(false);

    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const handlePaymentSuccess = () => {
        fetchMatchData();
        setIsPaymentSuccess(true);
        setIsPaymentFail(false);
    };

    const handlePaymentFail = () => {
        setIsPaymentFail(true);
        setIsPaymentSuccess(false);
    };
    
    const fetchMatchData = () => {
        setLoader(true);
        const params = {
            match_id : id,
        }
		axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfo`, params, apiConfig)
        .then((response) => {
            console.log(response);
            setLoader(false);
            if(response.data.success){
                setMatch(response.data.data);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
                toast.error(error.code);
			}
        });
	}

    const fetchUserData = () => {
        setLoader(true);
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setUserData(response.data.data);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
                toast.error(error.code);
			}
        });
    }

    const fetchPanditsList = () => {
        setLoader(true);
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/pandits` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/pandits`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setPanditData(response.data.data);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
                toast.error(error.code);
			}
        });
    }

	useEffect(() => {
        fetchMatchData();
        fetchUserData();
        fetchPanditsList();
    },[])
    return (
        <>
            <Header/>
            {loader ? <Loader/> :
            <>
                {match && match.razorpay_payment_id && match.razorpay_order_id && match.razorpay_signature && match.payment_status ? (
                    <div id="main" className="main-container">
                        <div className="container">
                            <section className="player-contact pt-0 pb-0">
                                <div className="card card-shadow">
                                    <h1>Match Astrology</h1>
                                </div>
                                <div className="card card-shadow">
                                    <div className="player-profile">
                                        <div className="player-info">
                                            <div className="info-header">
                                                <div>
                                                    <h2>
                                                        IND Vs PAK
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="info-body">
                                                <ul className="list-striped mr-05">
                                                    <li>
                                                        <span>Match Status</span>
                                                        <p>Feb 04, 1986</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Stats</span>
                                                        <p>Mymensingh</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Credites</span>
                                                        <p>175 cm</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Torat</span>
                                                        <p>Batting Allrounder</p>
                                                    </li>
                                                </ul>
                                                <ul className="list-striped">
                                                    <li>
                                                        <span>Moon Sign</span>
                                                        <p>Saggitarious</p>
                                                    </li>
                                                    <li>
                                                        <span>Sun Sign</span>
                                                        <p>Gemini</p>
                                                    </li>
                                                    <li>
                                                        <span>Dosha</span>
                                                        <p>Lorem</p>
                                                    </li>
                                                    <li>
                                                        <span>Gotra</span>
                                                        <p>
                                                            Vasisth
                                                            <small> (Sun Time)</small>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="row">
                                <div className="col-lg-9">
                                    <section className="team-rankings pt-0">
                                        <div className="tab-content">
                                            <div id="test_rank" className="tab-pane fade in show active">
                                                <div className="card card-shadow table-responsive py-30 px-0">
                                                    <table className="widget-table table table-striped no-border">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">pos</th>
                                                                <th scope="col">Player</th>
                                                                <th scope="col">matches</th>
                                                                <th scope="col">points</th>
                                                                <th scope="col">rating</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr onClick={() => {navigate('/player-profile/1')}}>
                                                                <td>01.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">MS Dhoni</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>02.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Virat Kohli</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>03.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Shikhar Dhawan</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>04.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Rohit Sharma</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>05.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Hardik Pandya</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                            <tr>
                                                                <td>06.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Suresh Raina</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>07.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Yuvraj Singh</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>08.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Parthiv Patel</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>09.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Munaf Patel</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>10.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">Yusuf Pathan</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div id="odi_rank" className="tab-pane fade">
                                                <div className="card card-shadow table-responsive py-30 px-0">
                                                    <table className="widget-table table table-striped no-border">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">pos</th>
                                                                <th scope="col">team</th>
                                                                <th scope="col">matches</th>
                                                                <th scope="col">points</th>
                                                                <th scope="col">rating</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>01.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">england</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>02.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">india</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>03.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">australia</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>04.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">pakistan</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>05.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">new zealand</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                            <tr>
                                                                <td>06.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">england</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>07.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">india</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>08.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">australia</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>09.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">pakistan</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>10.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">new zealand</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div id="t20_rank" className="tab-pane fade">
                                                <div className="card card-shadow table-responsive py-30 px-0">
                                                    <table className="widget-table table table-striped no-border">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">pos</th>
                                                                <th scope="col">team</th>
                                                                <th scope="col">matches</th>
                                                                <th scope="col">points</th>
                                                                <th scope="col">rating</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>01.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">england</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>02.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">india</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>03.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">australia</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>04.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">pakistan</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>05.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">new zealand</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                            <tr>
                                                                <td>06.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/england.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">england</span>
                                                                    </div>
                                                                </td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                                <td>272</td>
                                                            </tr>
                                                            <tr>
                                                                <td>07.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/india.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">india</span>
                                                                    </div>
                                                                </td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                                <td>270</td>
                                                            </tr>
                                                            <tr>
                                                                <td>08.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/australia.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">australia</span>
                                                                    </div>
                                                                </td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                                <td>267</td>
                                                            </tr>
                                                            <tr>
                                                                <td>09.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/pakistan.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">pakistan</span>
                                                                    </div>
                                                                </td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                                <td>260</td>
                                                            </tr>
                                                            <tr>
                                                                <td>10.</td>
                                                                <td className="pl-0">
                                                                    <div className="country-info align-items-center">
                                                                        <div className="flag-avatar mr-05">
                                                                            <figure className="avatar-28">
                                                                                <img src="assets/images/flags/new-zealand.png" alt="" />
                                                                            </figure>
                                                                        </div>
                                                                        <span className="country-name text-13">new zealand</span>
                                                                    </div>
                                                                </td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                                <td>255</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="col-lg-3">
                                    <aside className="sidebar right-sidebar">
                                        <div className="widget widget-latest-news">
                                            <h3 className="widget-title">Popular News</h3>

                                            <div className="card card-shadow">
                                                <div className="content-card card-grid">
                                                    <figure>
                                                        <img src="assets/images/posts/thumbs/4.jpg" alt="" />
                                                    </figure>
                                                    <div className="content-block">
                                                        <h3>
                                                            <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                        </h3>
                                                        <a href="#" className="post-meta">02 hours ago</a>
                                                    </div>
                                                </div>
                                                <div className="content-card card-grid">
                                                    <figure>
                                                        <img src="assets/images/posts/thumbs/5.jpg" alt="" />
                                                    </figure>
                                                    <div className="content-block">
                                                        <h3>
                                                            <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                        </h3>
                                                        <a href="#" className="post-meta">02 hours ago</a>
                                                    </div>
                                                </div>
                                                <div className="content-card card-grid">
                                                    <figure>
                                                        <img src="assets/images/posts/thumbs/6.jpg" alt="" />
                                                    </figure>
                                                    <div className="content-block">
                                                        <h3>
                                                            <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                        </h3>
                                                        <a href="#" className="post-meta">02 hours ago</a>
                                                    </div>
                                                </div>
                                                <div className="content-card card-grid">
                                                    <figure>
                                                        <img src="assets/images/posts/thumbs/7.jpg" alt="" />
                                                    </figure>
                                                    <div className="content-block">
                                                        <h3>
                                                            <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                        </h3>
                                                        <a href="#" className="post-meta">02 hours ago</a>
                                                    </div>
                                                </div>
                                                <div className="content-card card-grid">
                                                    <figure>
                                                        <img src="assets/images/posts/thumbs/8.jpg" alt="" />
                                                    </figure>
                                                    <div className="content-block">
                                                        <h3>
                                                            <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                        </h3>
                                                        <a href="#" className="post-meta">02 hours ago</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget widget-social">
                                            <h3 className="widget-title">Reach us on</h3>

                                            <div className="card p-0">
                                                <div className="social-card facebook">
                                                    <a href="#">
                                                        <div className="icon">
                                                            <i className="fab fa-facebook-f"></i>
                                                        </div>
                                                        <div className="social-card-content">
                                                            <strong>Facebook</strong>
                                                            <span>Link our facebook page</span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="social-card twitter">
                                                    <a href="#">
                                                        <div className="icon">
                                                            <i className="fab fa-twitter"></i>
                                                        </div>
                                                        <div className="social-card-content">
                                                            <strong>Twitter</strong>
                                                            <span>Follow us on twitter</span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="social-card linkedin">
                                                    <a href="#">
                                                        <div className="icon">
                                                            <i className="fab fa-linkedin-in"></i>
                                                        </div>
                                                        <div className="social-card-content">
                                                            <strong>Linkedin</strong>
                                                            <span>Join us on linkedin</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="main" className="main-container">
                        <div className="container">
                            <section className="player-contact pt-0 pb-0">
                                <div className="card card-shadow">
                                    <h1>(<i>{match && match.team_a ? match.team_a : 'N/A'} VS  {match && match.team_b ? match.team_b : 'N/A'}</i>)'s Match Astrology</h1>
                                </div>
                                {isPaymentSuccess && <div className='alert alert-success'></div> } 
                                {isPaymentFail && <div className='alert alert-danger'></div> }
                                <div className='row'>
                                {(panditData && panditData.length > 0) ? panditData.map((pandit, index) => (
                                    <div className='col-md-4'>
                                        <div className={`card card-shadow cursor-pointer ${panditNo === (index+1) ? 'card-active' : ''}`}  onClick={() => {setPanditNo(index+1); setSelectedPandit(pandit);}}>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <img src={`/assets/images/pandits/${pandit.avatar_image}`} alt className='pandit-img'/>
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='mt-2'>
                                                        <h4>Name: {pandit.name}</h4>
                                                        <h4>Experience : {pandit.experience}</h4>
                                                        <h4>Rating : {pandit.rating}</h4>
                                                        <h4>Astrology: ₹ {pandit.match_astrology_price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )) 
                                    : 
                                    <div className='col-md-12'>
                                        <div className='card card-shadow'>
                                            <h2>No Pandits To Show</h2>
                                        </div>
                                    </div> 
                                }
                                </div>
                                <div className="mt-5 card card-shadow buy-astrology-wrapper">
                                    <div className="glass-effect"></div>
                                    <div className="buy-astrology-content">
                                        <h1 className='buy-astro-font-color'>Get This Astrology</h1>
                                        <h5 className='buy-astro-font-color'>Select Your Pandit & Click the Buy Astrology button</h5>
                                        <div className='buy-btn-set'>
                                            {panditNo > 0 ?
                                                <RazorpayIntegration matchId={id} panditId={selectedPandit.id} amount={selectedPandit.match_astrology_price} moonSign={user.moon_sign} onPaymentSuccess={handlePaymentSuccess} onPaymentFail={handlePaymentFail} />
                                                :
                                                <button onClick={() => {toast.error('Please Select Pandit')}} className="mt-4 btn-astro-v1">
                                                    Buy Astrology
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="player-profile">
                                        <div className="player-info">
                                            <div className="info-body">
                                                <ul className="list-striped mr-05">
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                </ul>
                                                <ul className="list-striped">
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-shadow buy-astrology-wrapper">
                                    <div className="glass-effect"></div>
                                    <div className="player-profile">
                                        <div className="player-info">
                                            <div className="info-body">
                                                <ul className="list-striped mr-05">
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                </ul>
                                                <ul className="list-striped">
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                    <li>
                                                        <span>Match Data</span>
                                                        <p>N/A</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="card card-shadow buy-astrology-wrapper">
                                            <div className="glass-effect"></div>
                                            <div className="player-profile">
                                                <div className="player-info">
                                                    <div className="info-body">
                                                        <ul className="list-striped mr-05">
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-striped">
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="card card-shadow buy-astrology-wrapper">
                                            <div className="glass-effect"></div>
                                            <div className="player-profile">
                                                <div className="player-info">
                                                    <div className="info-body">
                                                        <ul className="list-striped mr-05">
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-striped">
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                            <li>
                                                                <span>Match Data</span>
                                                                <p>N/A</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </>
            }
            <Footer/>
        </>
    );
}
    
export default MatchAstrology;