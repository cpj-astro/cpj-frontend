import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RazorpayIntegration from '../../components/RazorPayIntegration';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import MatchKundli from '../../components/MatchKundli';

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

    const reportSet = (reportData) => {
        try {
            const data = reportData.astrology_data.split('|').map((item) => item.trim());
            setReportData({
                MatchName: match.team_a + ' Vs ' + match.team_b,
                MatchStart: match.match_date,
                Weather: match.weather,
                ProfileName: user.first_name + ' ' + user.last_name,
                SignName: user.sign_name,
                MatchAstrology: data[0],
                VenueWiseZodiac: data[1],
                LuckyNumbers: data[2],
                LuckyColors: data[3],
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
        }
    }

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
        if(match && match.astrology_data) {
            reportSet(match);
        }
    }, [match])

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
                        <div className="container breadcrumb-area">
                            <div className="breadcrumb">
                                <a href="/">Home</a>
                                <span>Match Astrology Report</span>
                            </div>
                            <h2>Match Astrology Report</h2>
                        </div>
                        <div className="container pt-20">
                            <div className="row">
                                <div className="col-md-12">
                                    <section className='card player-contact'>
                                        <div className='player-profile'>
                                            <div className="player-info">
                                                <div className="country-info align-items-center">
                                                    <h1>Astrology Details</h1>
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