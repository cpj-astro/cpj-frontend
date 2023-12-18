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
        LuckyColors: '',
        LuckyNumbers: '',
        MatchBet: '',
        FancyOrSession: '',
        FavTeam: '',
        YourMatchAstrology: '',
        FancyMatchData: '',
        AstrologicalBettingTime: '',
        AstroFavPlayers: '',
        OverallBettingForMatch: '',
        Suggestions: '',
        Direction: '',
        Mantras: '',
        SpecialRecommendation: '',
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
            const data = reportData.astrology_data.split('#').map((item) => item.trim());
            setReportData({
                MatchName: match.team_a + ' Vs ' + match.team_b,
                MatchStart: match.match_date,
                Weather: match.weather,
                ProfileName: user.first_name + ' ' + user.last_name,
                SignName: user.sign_name,
                LuckyColors: data[0],
                LuckyNumbers: data[1],
                MatchBet: data[2],
                FancyOrSession: data[3],
                FavTeam: data[4],
                YourMatchAstrology: data[5],
                FancyMatchData: data[6],
                AstrologicalBettingTime: data[7],
                AstroFavPlayers: data[8],
                OverallBettingForMatch: data[9],
                Suggestions: data[10],
                Direction: data[11],
                Mantras: data[12],
                SpecialRecommendation: data[13],
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
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            setLoader(false);
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

    const fetchPanditsList = () => {
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
        fetchUserData();
    }, [match])

    useEffect(() => {
        if(reportData && reportData.YourMatchAstrology) {
            setTimeout(() => {
                setLoader(false);   
            }, 3000);
        }
    }, [reportData])

	useEffect(() => {
        fetchMatchData();
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
                                                <div className='row'>
                                                    <div className='col-md-8'>        
                                                        <div className="info-body">
                                                            <ul className="list-striped mr-05">
                                                                <li>
                                                                    <span className='text-15'>Match Name</span>
                                                                    <p className='report-values'>{reportData.MatchName ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Match Start</span>
                                                                    <p className='report-values'>{reportData.MatchStart ?? 'N/A'} IST</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Weather</span>
                                                                    <p className='report-values'>{reportData.Weather ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Profile Name</span>
                                                                    <p className='report-values'>{reportData.ProfileName ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Your Rashi</span>
                                                                    <p className='report-values'>{reportData.SignName ?? 'N/A'}</p>
                                                                </li>
                                                            </ul>
                                                            <ul className="list-striped">
                                                                <li>
                                                                    <span className='text-15'>Lucky Colors</span>
                                                                    <p className='report-values'>{reportData.LuckyColors ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Lucky Numbers</span>
                                                                    <p className='report-values'>{reportData.LuckyNumbers ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Match Bet</span>
                                                                    <p className='report-values'>{reportData.MatchBet ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Fancy/Session</span>
                                                                    <p className='report-values'>{reportData.FancyOrSession ?? 'N/A'}</p>
                                                                </li>
                                                                <li>
                                                                    <span className='text-15'>Favourite Team</span>
                                                                    <p className='report-values'>{reportData.FavTeam ?? 'N/A'}</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='display-set'>
                                                            <MatchKundli housesData={user && user.kundli_data ? user.kundli_data : []} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Match Astrology</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.YourMatchAstrology ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Fancy Match Data</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.FancyMatchData ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Astrological Betting Time</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.AstrologicalBettingTime ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Astrological Favourite Players</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.AstroFavPlayers ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Overall Betting For Match</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.OverallBettingForMatch ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Suggestions</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.Suggestions ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Direction</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.Direction ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Mantras</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.Mantras ?? 'N/A'}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className='container'>
                                                    <div className="country-info align-items-center">
                                                        <span className="country-name text-17 mb-10">Special Recommendations</span>
                                                    </div>
                                                    <span className='report-values'>
                                                        {reportData.SpecialRecommendation ?? 'N/A'}
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
                                            <div className='d-flex'>
                                                <div className=''>
                                                    <img src={`/assets/images/pandits/${pandit.avatar_image}`} alt className='pandit-img'/>
                                                </div>
                                                <div className='ml-3'>
                                                    <div className='mt-2'>
                                                        <h4>Name: {pandit.name}</h4>
                                                        <h4>Experience : {pandit.experience}</h4>
                                                        <h4>Rating : 
                                                            {Array.from({ length: pandit.rating }, (_, index) => (
                                                                <i key={index} className="fa fa-star text-warning ml-1"></i>
                                                            ))}
                                                        </h4>
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