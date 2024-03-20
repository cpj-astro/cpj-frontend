import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import OwlCarousel from 'react-owl-carousel';
import Footer from '../../components/Footer';
import { useForm } from 'react-hook-form';
import { db } from '../../authFiles/fbaseconfig';
import { toast } from 'react-toastify';
import { setDoc, getDoc, doc, collection, where, onSnapshot, query, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import Ball from '../../components/Ball';
import Header from '../../components/Header';
import Scorecard from '../../components/ScoreCard';
import OddHistory from '../../components/OddHistory';
import Commentary from '../../components/Commentary';
import PlayingXI from '../../components/PlayingXI';
import HeaderV2 from '../../components/HeaderV2'
import FooterV2 from '../../components/FooterV2'

export default function LiveLineV2() {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialSpeakTriggered = useRef(false);
    const [activeTab, setActiveTab] = useState('liveline');
    const [back1Style, setBack1Style] = useState('')
    const [lay1Style, setLay1Style] = useState('')
    const [back2Style, setBack2Style] = useState('')
    const [lay2Style, setLay2Style] = useState('')
    const [mcBack1Style, setMcBack1Style] = useState('')
    const [mcLay1Style, setMcLay1Style] = useState('')
    const [mcBack2Style, setMcBack2Style] = useState('')
    const [mcLay2Style, setMcLay2Style] = useState('')
    const [mtBack1Style, setMtBack1Style] = useState('')
    const [mtLay1Style, setMtLay1Style] = useState('')
    const [mtBack2Style, setMtBack2Style] = useState('')
    const [mtLay2Style, setMtLay2Style] = useState('')
    const [matchData, setMatchData] = useState([])
    const [matchDetails, setMatchDetails] = useState([])
    const [oddHistory, setOddHistory] = useState(null)
    const [playingXI, setPlayingXI] = useState(null)
    const [volumeStatus, setVolumeStatus] = useState(false)
    const [astroStatus, setAstroStatus] = useState(false)
    const [isEnableAstro, setIsEnableAstro] = useState(false)
    const [seriesData, setSeriesData] = useState([])
    const [lastFewBalls, setLastFewBalls] = useState([])
    const [comData, setComData] = useState(null);
    const { speak } = useSpeechSynthesis();
    const [scoreCard, setScoreCard] = useState(null);
    const [matchInfo, setMatchInfo] = useState([]);
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    
    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };
    
    const fetchSeriesData = (s_id) => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/fetchSeriesData` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/fetchSeriesData`, {series_id : s_id})
        .then((response) => {
            if(response.data.success){
                setSeriesData(response.data.data);
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
    
    const prepareLastAFewBalls = (lastBallsData) => {
        let data = [];
        try {
            lastBallsData = (typeof (lastBallsData) == 'string') ? JSON.parse(lastBallsData) : lastBallsData;
            Object.keys(lastBallsData).map((item, key) => {
                data.push({ "ballVal": "", "over": "Ovr. " + lastBallsData[key].over, "runs": "" });
                lastBallsData[key] && lastBallsData[key].balls && lastBallsData[key].balls.map((itemJ, keyJ) => {
                    data.push({ "ballVal": itemJ, "over": "", "runs": "" });
                })
                data.push({ "ballVal": "", "over": "", "runs": lastBallsData[key].runs });
            })
            setLastFewBalls(data);
        } catch (error) {
            setLastFewBalls(data);
        }
    }

    const loadCommentary = () => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/commentary` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/commentary`, { match_id: id }, apiConfig)
        .then((res) => {
            if (res && res.data.success) {
                let n = res.data.data;
                let data = [];
                Object.keys(n).map((item, key) => {
                    Object.keys(n[item]).map((ingItem, ingKey) => {
                        (Object.keys(n[item][ingItem]).length > 0) &&
                            n[item][ingItem].map((i, k) => {
                                data.push(i);
                        })
                    })
                })
                setComData(data);
            }
        })
        .catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    };

    useEffect(() => {
        if(matchData && matchData.last4overs){
            prepareLastAFewBalls(matchData.last4overs);
        }
    }, [matchData && matchData.last4overs]);

    useEffect(() => {
        if(matchData && matchData.series_id){
            fetchSeriesData(matchData.series_id);
        }
    }, [matchData && matchData.series_id]);
    
    useEffect(() => {
        setBack1Style('summer-yellow');
        setTimeout(() => {
            setBack1Style('');
        }, 200);
    }, [matchData && matchData.back1])

    useEffect(() => {
        setLay1Style('summer-yellow');
        setTimeout(() => {
            setLay1Style('');
        }, 200);
    }, [matchData && matchData.lay1])

    useEffect(() => {
        setBack2Style('summer-yellow');
        setTimeout(() => {
            setBack2Style('');
        }, 200);
    }, [matchData && matchData.back2])

    useEffect(() => {
        setLay2Style('summer-yellow');
        setTimeout(() => {
            setLay2Style('');
        }, 200);
    }, [matchData && matchData.lay2])

    useEffect(() => {
        setMcBack1Style('summer-yellow');
        setTimeout(() => {
            setMcBack1Style('');
        }, 200);
    }, [matchData && matchData.match_completed && matchData.match_completed.t1_back])

    useEffect(() => {
        setMcLay1Style('summer-yellow');
        setTimeout(() => {
            setMcLay1Style('');
        }, 200);
    }, [matchData && matchData.match_completed && matchData.match_completed.t1_lay])

    useEffect(() => {
        setMcBack2Style('summer-yellow');
        setTimeout(() => {
            setMcBack2Style('');
        }, 200);
    }, [matchData && matchData.match_completed && matchData.match_completed.t2_back])

    useEffect(() => {
        setMcLay2Style('summer-yellow');
        setTimeout(() => {
            setMcLay2Style('');
        }, 200);
    }, [matchData && matchData.match_completed && matchData.match_completed.t2_lay])

    useEffect(() => {
        setMtBack1Style('summer-yellow');
        setTimeout(() => {
            setMtBack1Style('');
        }, 200);
    }, [matchData && matchData.match_tied && matchData.match_tied.t1_back])

    useEffect(() => {
        setMtLay1Style('summer-yellow');
        setTimeout(() => {
            setMtLay1Style('');
        }, 200);
    }, [matchData && matchData.match_tied && matchData.match_tied.t1_lay])

    useEffect(() => {
        setMtBack2Style('summer-yellow');
        setTimeout(() => {
            setMtBack2Style('');
        }, 200);
    }, [matchData && matchData.match_tied && matchData.match_tied.t2_back])

    useEffect(() => {
        setMtLay2Style('summer-yellow');
        setTimeout(() => {
            setMtLay2Style('');
        }, 200);
    }, [matchData && matchData.match_tied && matchData.match_tied.t2_lay])

    const getCricketTermDescription = (term) => {
        const termsMap = {
            'ball': 'Ball Start',
            '0': 'Dot Ball',
            '1': 'Single Single',
            '2': 'Double Double',
            '3': 'Triple Triple',
            '4': 'Four Four Four',
            'four': 'Four Four Four',
            'six': 'Six Six Sixer',
            '5': '5 Runs',
            '6': 'Six Six Sixer',
            'wide': 'Wide Ball',
            'over': 'Over Complete'
        };
    
        const lowerCaseTerm = term.toLowerCase();
        return termsMap[lowerCaseTerm] || term
    }
    
    const getDisplayContent = (firstCircle) => {
        if (!firstCircle) return '';
        switch(firstCircle.toLowerCase()) {
            case 'ball start':
                return <img src={"/assets/images/liveline/ball-start.gif"} className="fc-img-style" alt="Ball Start" />;
            case 'dot ball':
                return <img src={"/assets/images/liveline/0.gif"} className="fc-img-style" alt="Dot Ball" />;
            case 'single single':
                return <img src={"/assets/images/liveline/1.gif"} className="fc-img-style" alt="Single Single" />;
            case 'double double':
                return <img src={"/assets/images/liveline/2.gif"} className="fc-img-style" alt="Double Double" />;
            case 'triple triple':
                return <img src={"/assets/images/liveline/3.gif"} className="fc-img-style" alt="Triple Triple" />;
            case 'four four four':
                return <img src={"/assets/images/liveline/4.gif"} className="fc-img-style" alt="Four Four Four" />;
            case '5 runs':
                return <img src={"/assets/images/liveline/5.gif"} className="fc-img-style" alt="5 runs" />;
            case 'six six sixer':
                return <img src={"/assets/images/liveline/6.gif"} className="fc-img-style" alt="Six Six Sixer" />;
            case 'wide ball':
                return <img src={"/assets/images/liveline/wide.gif"} className="fc-img-style" alt="Wide Ball" />;
            case 'out':
                return <img src={"/assets/images/liveline/out.gif"} className="fc-img-style" alt="Wide Ball" />;
            case 'wicket':
                return <img src={"/assets/images/liveline/out.gif"} className="fc-img-style" alt="Wide Ball" />;
            default:
                return firstCircle; // Default to showing text
        }
    };

    useEffect(() => {
        if(matchData && matchData.first_circle && volumeStatus) {
            const description = getCricketTermDescription(matchData.first_circle);
            speak({ text: description });
        }
    }, [matchData && matchData.first_circle]);
    
    const fetchMatchInfoByMatchId = () => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfoByMatchId` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfoByMatchId`, { match_id: id }, apiConfig)
        .then((res) => {
            setMatchInfo(res.data.data);
        })
        .catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    const fetchMatchInfo = () => {
        const authenticated = localStorage.getItem('client_token');
        let url = null;
        if(authenticated) {
            url = process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfo`;
        } else {
            url = process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/offlineMatchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/offlineMatchInfo`
        }
        axios.post(url, { match_id: id }, apiConfig)
        .then((res) => {
            let data = res.data.data;
            if (data.team_a_short == data.fav_team) {
                data.back1 = data.min_rate;
                data.lay1 = data.max_rate;

                if (data.back1 != "" && data.back1 != undefined) {
                    data.back2 = (1 / (data.max_rate - 1)) + 1;
                    data.back2 = data.back2.toFixed(2);

                    data.lay2 = (1 / (data.min_rate - 1)) + 1;
                    data.lay2 = data.lay2.toFixed(2);
                }
                else {
                    data.back1 = "";
                    data.back2 = 1000;
                    data.lay2 = "";
                }

            }
            else if (data.team_b_short == data.fav_team) {
                data.back2 = data.min_rate;
                data.lay2 = data.max_rate;

                if (data.back2 != "" && data.back2 != undefined) {
                    data.back1 = (1 / (data.max_rate - 1)) + 1;
                    data.back1 = data.back1.toFixed(2);

                    data.lay1 = (1 / (data.min_rate - 1)) + 1;
                    data.lay1 = data.lay1.toFixed(2);
                }
                else {
                    data.back2 = "";
                    data.back1 = 1000;
                    data.lay1 = "";
                }
            }
            else {
                data.back1 = 1.90;
                data.back2 = 1.90;
                data.lay1 = 2.00;
                data.lay2 = 2.00;
            }
            setMatchData(data);
        })
        .catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    const fetchScorecardByMatchId = () => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/scorecardByMatchId` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/scorecardByMatchId`, { match_id: id }, apiConfig)
        .then((res) => {
            setScoreCard(res.data.data);
        })
        .catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    const fetchPlayingXIByMatchId = () => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/playingXiByMatchId` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/playingXiByMatchId`, { match_id: id }, apiConfig)
        .then((res) => {
            setPlayingXI(res.data.data);
        })
        .catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }
    
    const fetchOddHistoryByMatchId = () => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchOddHistory` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchOddHistory`, { match_id: id }, apiConfig)
        .then((res) => {
            setOddHistory(res.data.data);
        })
        .catch((error) => {
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

    useEffect(() => {
        const authenticated = localStorage.getItem('client_token');
        let url = null;
        if(authenticated) {
            url = process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfo`;
        } else {
            url = process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/offlineMatchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/offlineMatchInfo`
        }
        axios.post(url, { match_id: id }, apiConfig)
        .then((res) => {
            if (res.data && res.data.data && res.data.data.match_category == 'live') {
                setMatchDetails(res.data.data);
            } 
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    useEffect(() => {
        onSnapshot(doc(db, "matchdata", id), (doc) => {
            if(doc.data()) {
                setMatchData(doc.data()); 
            } else {
                fetchMatchInfo();
            }
        });
    }, []);

    const handleMuteButton = () => {
        if (!initialSpeakTriggered.current) {
            speak({ text: '' });
            initialSpeakTriggered.current = true;
        }
        setVolumeStatus(!volumeStatus)
    }

    return (
        <>
            <HeaderV2/>
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
                            <section>
                                <div className='container'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className='tv-container'>    
                                                <div className="tv">
                                                    <div className='just-set'>
                                                        {matchData && matchData.match_category && 
                                                            <strong className="text-uppercase powerplay-set p-2">{matchData.match_category}</strong>
                                                        }
                                                        {matchData && matchData.powerplay && 
                                                            <strong className="powerplay-set p-2">P.P - {matchData.powerplay}</strong>
                                                        }
                                                        <strong className="text-white" onClick={handleMuteButton}>
                                                            <div className='volume-icon-set'>
                                                                {volumeStatus ? <i className='fa fa-volume-up'></i> : <i className='fa fa-volume-off'></i>}    
                                                            </div>    
                                                        </strong>
                                                    </div>
                                                    <div className="score">
                                                        <span>
                                                            {matchData && matchData.first_circle ? getDisplayContent(getCricketTermDescription(matchData.first_circle)) : ''}
                                                        </span>
                                                    </div>
                                                    <div className='rate-container'>
                                                        <div className="left-side">
                                                            <p>C.R.R - {matchData && matchData.curr_rate ? matchData.curr_rate : '0.00'}</p>
                                                        </div>
                                                        <div className="right-side">
                                                            <p>R.R.R - {matchData && matchData.rr_rate ? matchData.rr_rate : '0.00'}</p>
                                                        </div>
                                                    </div>
                                                    <div className='card bg-cyan p-1' style={{color: '#0F0E0E', borderRadius: '0px 0px 4px 4px'}}>
                                                        {matchData && matchData.batting_team == matchData.team_a_id ?
                                                        <div className="score-card-body">
                                                            <div className="country-info">
                                                                <div className="text-center">
                                                                    <span className="country-name">{matchData && matchData.team_a_short ? matchData.team_a_short : 'No Data'}</span>
                                                                    <span>{matchData && matchData.team_a_scores ? matchData.team_a_scores : '00-0'}</span> &nbsp;
                                                                    <span className="text-muted">{matchData && matchData.team_a_over ? matchData.team_a_over : '0.0'} ov.</span>
                                                                </div> 
                                                            </div>
                                                            <div className="country-info">
                                                                <div className="text-center">
                                                                    <span className="country-name">{matchData && matchData.team_b_short ? matchData.team_b_short : 'No Data'}</span>
                                                                    <span>{matchData && matchData.team_b_scores ? matchData.team_b_scores : '00-0'}</span> &nbsp;
                                                                    <span className="text-muted">{matchData && matchData.team_b_over ? matchData.team_b_over : '0.0'} ov.</span>
                                                                </div> 
                                                            </div>
                                                        </div> : 
                                                        <div className="score-card-body">
                                                            <div className="country-info">
                                                                <div className="text-center">
                                                                    <span className="country-name">{matchData && matchData.team_b_short ? matchData.team_b_short : 'No Data'}</span>
                                                                    <span>{matchData && matchData.team_b_scores ? matchData.team_b_scores : '00-0'}</span> &nbsp;
                                                                    <span className="text-muted">{matchData && matchData.team_b_over ? matchData.team_b_over : '0.0'} ov.</span>
                                                                </div> 
                                                            </div>
                                                            <div className="country-info">
                                                                <div className="text-center">
                                                                    <span className="country-name">{matchData && matchData.team_a_short ? matchData.team_a_short : ' '}</span>
                                                                    <span>{matchData && matchData.team_a_scores ? matchData.team_a_scores : '00-0'}</span> &nbsp;
                                                                    <span className="text-muted">{matchData && matchData.team_a_over ? matchData.team_a_over : '0.0'} ov.</span>
                                                                </div> 
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>	
                                    </div>

                                    {matchData.astrology_status == 'enable' && matchDetails && matchDetails.length == 0 &&
                                    <div>
                                        {matchData.match_category == 'recent' && matchData.payment_id && 
                                            <a className="cp__fill-btn-live" href={`/match-reports/${matchData.match_id}`}>View Astrology</a>
                                        }
                                        {matchData.match_category !== 'recent' &&
                                            <a className="cp__fill-btn-live" href={`/match-reports/${matchData.match_id}`}>{matchData.button_text}</a>
                                        }
                                    </div>
                                    }

                                    {matchDetails && matchDetails.astrology_status == 'enable' &&
                                    <div>
                                        {matchDetails.match_category == 'recent' && matchDetails.payment_id && 
                                            <a className="cp__fill-btn-live" href={`/match-reports/${matchData.match_id}`}>View Astrology</a>
                                        }
                                        {matchDetails.match_category !== 'recent' &&
                                            <a className="cp__fill-btn-live" href={`/match-reports/${matchData.match_id}`}>{matchDetails.button_text}</a>
                                        }
                                    </div>
                                    }
                                        
                                    {matchData && matchData.need_run_ball &&
                                    <div className="spell-sum-box px-3 pb-0 pt-0 mt-3">
                                        <h5 className='text-center mb-0'>
                                            <marquee behavior="scroll" direction="left" scrollamount="10" style={{fontWeight: '600', paddingTop: '5px'}}> 
                                            {matchData && matchData.need_run_ball ? matchData.need_run_ball : 'No Data'}
                                            </marquee>
                                        </h5>
                                    </div>}

                                    <div className='ul-group-set'>
                                        <ul style={{overflowX: 'auto!important'}}>
                                            <li className={activeTab === 'liveline' ? 'li-active' : 'li-inactive'} onClick={() => handleTabChange('liveline')}>
                                                Live
                                            </li>
                                            <li className={activeTab === 'info' ? 'li-active' : 'li-inactive'} onClick={() => {fetchMatchInfoByMatchId(); handleTabChange('info');}}>
                                                Info
                                            </li>
                                            <li className={activeTab === 'playingXI' ? 'li-active' : 'li-inactive'} onClick={() => {fetchPlayingXIByMatchId(); handleTabChange('playingXI');}}>
                                                PlayingXI
                                            </li>
                                            <li className={activeTab === 'commentary' ? 'li-active' : 'li-inactive'} onClick={() => {loadCommentary(); handleTabChange('commentary');}}>
                                                Commentary
                                            </li>
                                            <li className={activeTab === 'scorecard' ? 'li-active' : 'li-inactive'} onClick={() => {fetchScorecardByMatchId(); handleTabChange('scorecard');}}>
                                                Scorecard
                                            </li>
                                            <li className={activeTab === 'history' ? 'li-active' : 'li-inactive'} onClick={() => {fetchOddHistoryByMatchId(); handleTabChange('history');}}>
                                                History
                                            </li>
                                        </ul>
                                    </div>

                                    <div className='tab-content mt-2'>
                                        <div id="liveline" className={`tab-pane fade in ${activeTab === 'liveline' ? 'show active' : ''}`}>
                                            {matchData && matchData.match_type == 'Test' && matchData.trail_lead && 
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="widget widget-rankings">
                                                        <div className="card shadow px-2 py-2 odd-border text-center text-uppercase">
                                                        <strong>{matchData.trail_lead}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div id="test_rank_trs">
                                                        <div className="table-v2-card">
                                                            <table className="table-v2" cellPadding={5} cellSpacing={5}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className='table-width-col'>Match Odds</th>
                                                                        <th scope="col" className='table-width-td text-center'>Back</th>
                                                                        <th scope="col" className='table-width-td text-center'>Lay</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            {matchData && matchData.team_a ? matchData.team_a : ''}
                                                                        </td>
                                                                        <td className='text-center'> 
                                                                            <div className={'back-color bl-style ' + back1Style}>
                                                                            {matchData && matchData.back1 ? matchData.back1 : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + lay1Style}>
                                                                            {matchData && matchData.lay1 ? matchData.lay1 : '0'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {matchData && matchData.team_b ? matchData.team_b : ''}
                                                                        </td>
                                                                        <td className='text-center'> 
                                                                            <div className={'back-color bl-style ' + back2Style}>
                                                                            {matchData && matchData.back2 ? matchData.back2 : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + lay2Style}>
                                                                            {matchData && matchData.lay2 ? matchData.lay2 : '0'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {matchData && matchData.match_type == "Test" &&
                                                                        <tr>
                                                                            <td>The Draw</td>
                                                                            <td className='text-center'>
                                                                                <div className={'back-color bl-style ' + back2Style}>
                                                                                {matchData && matchData.min_rate_2 ? matchData.min_rate_2 : '0'}
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={'lay-color bl-style ' + lay2Style}>
                                                                                {matchData && matchData.max_rate_2 ? matchData.max_rate_2 : '0'}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>  
                                                </div>

                                                {((matchData && matchData.fancy_api) || (matchData && !matchData.fancy_api)) && ((matchData && matchData.s_ovr ? matchData.s_ovr != 0 : '') || (matchData && matchData.s_over ? matchData.s_over != 0 : '')) &&
                                                <div className="col-md-12 mt-3">
                                                    <div id="test_rank_trs">
                                                        <div className="table-v2-card">
                                                            <table className="table-v2" cellPadding={5} cellSpacing={5}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className='table-width-col'>Fancy Info</th>
                                                                        <th scope="col" className='table-width-td text-center'>No</th>
                                                                        <th scope="col" className='table-width-td text-center'>Yes</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {matchData && matchData.fancy_api &&
                                                                        <tr>
                                                                            <td>{matchData.s_ovr + ' over runs'}</td>
                                                                            <td className='text-center'>
                                                                                <div className={'back-color bl-style ' + back1Style}>    
                                                                                    {matchData && ['rain', 'no ball', 'out', 'wicket', 'lbw', 'free hit', '3rd umpire', 'third umpire', 'review', 'decision pending', 'catch checking', 'boundary check', 'ball start', 'ball']
                                                                                    .some(phrase => matchData.first_circle.toLowerCase() === phrase.toLowerCase()) && (
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    )}
                                                                                    <div>{matchData.s_min}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{matchData.s_min_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={'lay-color bl-style ' + lay1Style}>
                                                                                    {matchData && ['rain', 'no ball', 'out', 'wicket', 'lbw', 'free hit', '3rd umpire', 'third umpire', 'review', 'decision pending', 'catch checking', 'boundary check', 'ball start', 'ball']
                                                                                    .some(phrase => matchData.first_circle.toLowerCase() === phrase.toLowerCase()) && (
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    )}
                                                                                    <div>{matchData.s_max}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{matchData.s_max_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                    {matchData && !matchData.fancy_api && matchData.fancy_info && matchData.fancy_info.map((fancy, index) => 
                                                                        fancy.s_over != 0 && (
                                                                        <tr className={fancy.over ? '' : 'd-none'} key={index}>
                                                                            <td>{matchData.s_over + ' over runs'}</td>
                                                                            <td className='text-center'>
                                                                                <div className={'back-color bl-style ' + back1Style}>
                                                                                    {matchData && ['rain', 'no ball', 'out', 'wicket', 'lbw', 'free hit', '3rd umpire', 'third umpire', 'review', 'decision pending', 'catch checking', 'boundary check', 'ball start', 'ball']
                                                                                    .some(phrase => matchData.first_circle.toLowerCase() === phrase.toLowerCase()) && (
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    )}
                                                                                    <div>{fancy.s_min}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{fancy.s_min_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={'lay-color bl-style ' + lay1Style}>
                                                                                    {fancy.suspend && 
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    } 
                                                                                    <div>{fancy.s_max}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{fancy.s_max_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        )
                                                                    )}

                                                                    {matchData.lambi_ovr && matchData.lambi_ovr != 0 && 
                                                                    matchData.current_inning == 1 && matchData.lambi_ovr != matchData.s_ovr && matchData.lambi_ovr != 0 &&
                                                                        <tr>
                                                                            <td>{matchData.lambi_ovr + ' over runs (LAMBI)'}</td>
                                                                            <td className='text-center'> 
                                                                                <div className={'back-color bl-style ' + back1Style}>
                                                                                    {matchData && ['rain', 'no ball', 'out', 'wicket', 'lbw', 'free hit', '3rd umpire', 'third umpire', 'review', 'decision pending', 'catch checking', 'boundary check', 'ball start', 'ball']
                                                                                    .some(phrase => matchData.first_circle.toLowerCase() === phrase.toLowerCase()) && (
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    )}
                                                                                    <div>{matchData.lambi_min}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{matchData.lambi_min_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={'lay-color bl-style ' + lay1Style}>
                                                                                    {matchData && ['rain', 'no ball', 'out', 'wicket', 'lbw', 'free hit', '3rd umpire', 'third umpire', 'review', 'decision pending', 'catch checking', 'boundary check', 'ball start', 'ball']
                                                                                    .some(phrase => matchData.first_circle.toLowerCase() === phrase.toLowerCase()) && (
                                                                                        <div className='suspend-style'>SUSPENDED</div>
                                                                                    )}
                                                                                    <div>{matchData.lambi_max}</div>
                                                                                    <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{matchData.lambi_max_rate}</div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>  
                                                    </div>
                                                </div>}
                                                
                                                {matchData && matchData.match_completed && matchData.match_completed.status &&
                                                <div className="col-md-12 mt-3">
                                                    <div id="test_rank_trs">
                                                        <div className="table-v2-card">
                                                            <table className='table-v2' cellPadding={5} cellSpacing={5}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className='table-width-col'>Match Completed</th>
                                                                        <th scope="col" className='table-width-td text-center'>Back</th>
                                                                        <th scope="col" className='table-width-td text-center'>Lay</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>YES</td>
                                                                        <td className='text-center'>
                                                                            <div className={'back-color bl-style ' + mcBack1Style}>
                                                                            {matchData && matchData.match_completed ? matchData.match_completed.t1_back : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + mcLay1Style}>
                                                                            {matchData && matchData.match_completed ? matchData.match_completed.t1_lay : '0'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>NO</td>
                                                                        <td className='text-center'>
                                                                            <div className={'back-color bl-style ' + mcBack2Style}>
                                                                            {matchData && matchData.match_completed ? matchData.match_completed.t2_back : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + mcLay2Style}>
                                                                            {matchData && matchData.match_completed ? matchData.match_completed.t2_lay : '0'}
                                                                            </div> 
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>} 

                                                {matchData && matchData.match_tied && matchData.match_tied.status &&
                                                <div className="col-md-12 mt-3">
                                                    <div id="test_rank_trs">
                                                        <div className="table-v2-card">
                                                            <table className='table-v2' cellPadding={5} cellSpacing={5}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className='table-width-col'>Match Tied</th>
                                                                        <th scope="col" className='table-width-td text-center'>Back</th>
                                                                        <th scope="col" className='table-width-td text-center'>Lay</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>YES</td>
                                                                        <td className='text-center'>
                                                                            <div className={'back-color bl-style ' + mtBack1Style}>
                                                                            {matchData && matchData.match_tied ? matchData.match_tied.t1_back : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + mtLay1Style}>
                                                                            {matchData && matchData.match_tied ? matchData.match_tied.t1_lay : '0'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>NO</td>
                                                                        <td className='text-center'>
                                                                            <div className={'back-color bl-style ' + mtBack2Style}>
                                                                            {matchData && matchData.match_tied ? matchData.match_tied.t2_back : '0'}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className={'lay-color bl-style ' + mtLay2Style}>
                                                                            {matchData && matchData.match_tied ? matchData.match_tied.t2_lay : '0'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>} 
                                            </div>

                                            {lastFewBalls && lastFewBalls.length > 0 &&
                                            <div className="spell-sum-box shadow mt-3">
                                                <div className="recent-spell" style={{overflow: 'auto'}}>
                                                    <ul style={{display: 'flex'}}>
                                                        {lastFewBalls && lastFewBalls.map((itemJ, keyJ) => {
                                                            if (itemJ.over != "") {
                                                            return (
                                                                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} key={keyJ}>
                                                                    <div style={{ color: '#fff', width: 'max-content', marginRight: '5px' }}>{itemJ.over}</div>
                                                                </div>
                                                            )}
                                                            else if (itemJ.ballVal != "") {
                                                            return (
                                                                <Ball key={keyJ} val={itemJ.ballVal} />
                                                            )}
                                                            else if (itemJ.runs != "") {
                                                            return (
                                                                <div key={keyJ} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                                                    <div style={{ color: '#fff', width: 'max-content', marginRight: '5px' }}> = {itemJ.runs} {lastFewBalls.length > (keyJ + 1) && '|'} </div>
                                                                </div>
                                                            )}
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>}

                                            {matchData && matchData.batsman && matchData.batsman.length > 0 && matchData.batsman[0].name && matchData.batsman[0].name !== "" && 
                                            <div className="col-md-12 mt-3">
                                                <div id="test_rank_trs">
                                                    <div className="table-v2-card">
                                                        <table className='table-v2' cellPadding={5}>
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" style={{width: '60%'}}>Batsmen</th>
                                                                    <th scope="col">R</th>
                                                                    <th scope="col">B</th>
                                                                    <th scope="col">4s</th>
                                                                    <th scope="col">6s</th>
                                                                    <th scope="col">Sr</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {matchData && matchData.batsman && matchData.batsman.map((batsman, index) => (
                                                                    <tr key={index}>
                                                                        <td>{batsman.name}</td>
                                                                        <td><strong>{batsman.run}</strong></td>
                                                                        <td>{batsman.ball}</td>
                                                                        <td>{batsman.fours}</td>
                                                                        <td>{batsman.sixes}</td>
                                                                        <td>{batsman.strike_rate}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>}

                                            {matchData && matchData.bolwer && matchData.bolwer.name && 
                                            <div className="col-md-12 mt-3">
                                                <div id="test_rank_trs">
                                                    <div className="table-v2-card">
                                                        <table className='table-v2' cellPadding={5}>
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" style={{width: '60%'}}>Bowlers</th>
                                                                    <th scope="col">O</th>
                                                                    <th scope="col">R</th>
                                                                    <th scope="col">W</th>
                                                                    <th scope="col">Econ</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <strong>{matchData && matchData.bolwer && matchData.bolwer.name ? matchData.bolwer.name : 'No Data'}</strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>{matchData && matchData.bolwer && matchData.bolwer.over ? matchData.bolwer.over : 'No Data'}</strong>
                                                                    </td>
                                                                    <td>
                                                                        {matchData && matchData.bolwer && matchData.bolwer.run ? matchData.bolwer.run : ''}
                                                                    </td>
                                                                    <td>
                                                                        {matchData && matchData.bolwer && matchData.bolwer.wicket ? matchData.bolwer.wicket : ''}
                                                                    </td>
                                                                    <td>
                                                                        {matchData && matchData.bolwer && matchData.bolwer.economy ? matchData.bolwer.economy : ''}
                                                                    </td>
                                                                </tr>
                                                                <tr><td colSpan={5}></td></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>}
                                            
                                            {matchData && matchData.yet_to_bet && 
                                            <div className="spell-sum-box shadow mt-3">
                                                <span>Yet to bat: &nbsp;
                                                    <span> 
                                                    {matchData && matchData.yet_to_bet && 
                                                    matchData.yet_to_bet.join(', ')}
                                                    </span>
                                                </span>
                                            </div>} 
                                            
                                            {matchData && matchData.session &&
                                            <div className='text-center spell-sum-box shadow mt-3'>
                                                <div style={{marginBottom: '-10px'}}>
                                                    <h3>Session History</h3>
                                                </div>
                                                <div className='text-session' dangerouslySetInnerHTML={{__html: matchData && matchData.session ? matchData.session : ''}} /> 
                                            </div>}
                                        </div>
                                        <div id="info" className={`tab-pane fade in ${activeTab === 'info' ? 'show active' : ''}`}>
                                            <div className="spell-sum-box px-3 pb-1 pt-1 mb-3">
                                                <h5 className='text-center mb-0'>
                                                    {matchData && matchData.result ? matchData.result : 'No Result' }
                                                </h5>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td className='text-capitalize'>Series</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.series ? matchInfo.series : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Match:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.team_a && matchInfo.team_b ? matchInfo.team_a + ' vs ' + matchInfo.team_b + ' ' + matchInfo.matchs : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Date & Time:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.match_time && matchInfo.match_date ? matchInfo.match_date + ' - ' + matchInfo.match_time : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Venue:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.venue ? matchInfo.venue : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Toss:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.toss ? matchInfo.toss : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Umpire:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.umpire ? matchInfo.umpire : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>3rd Umpire:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.third_umpire ? matchInfo.third_umpire : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Referee:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.referee ? matchInfo.referee : 'No Data'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-capitalize'>Man of the Match:</td>
                                                            <td className='text-capitalize'>{matchInfo && matchInfo.man_of_match_player ? matchInfo.man_of_match_player : 'No Data'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <div className='mt-2 display-s-set'>
                                                    <div className='weather-card text-center w-100'>
                                                        <div>
                                                            Weather Report ({matchInfo && matchInfo.place ? matchInfo.place : 'No Data'})
                                                        </div>
                                                        <img src="/assets/images/weather.png" className='w-img-set'/>
                                                        <div>
                                                            {matchInfo && matchInfo.venue_weather && matchInfo.venue_weather.temp_c ? matchInfo.venue_weather.temp_c : ''}°c 
                                                        </div>
                                                        <div>
                                                            {matchInfo && matchInfo.venue_weather && matchInfo.venue_weather.weather ? matchInfo.venue_weather.weather : ''}
                                                        </div>
                                                        <div>
                                                            Wind Speed - {matchInfo && matchInfo.venue_weather && matchInfo.venue_weather.wind_mph ? matchInfo.venue_weather.wind_mph + 'm/h' : ''} 
                                                        </div>
                                                        <div>
                                                            Humidity - {matchInfo && matchInfo.venue_weather && matchInfo.venue_weather.humidity ? matchInfo.venue_weather.humidity + '%' : ''}
                                                        </div>
                                                        <div>
                                                            Rain Change
                                                        </div>
                                                        <div>
                                                            {matchInfo && matchInfo.venue_weather && matchInfo.venue_weather.cloud ? matchInfo.venue_weather.cloud + '%' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="playingXI" className={`tab-pane fade in ${activeTab === 'playingXI' ? 'show active' : ''}`}>
                                            {playingXI && playingXI.length == 0 && 'No Data'}
                                            {playingXI ? <PlayingXI playingXIData={playingXI}/> : "Loading..."}
                                        </div>
                                        <div id="commentary" className={`tab-pane fade in ${activeTab === 'commentary' ? 'show active' : ''}`}>
                                            {comData && comData.length == 0 && 'No Data'}
                                            {comData ? <Commentary commentaryData={comData}/> : "Loading..."}
                                        </div>
                                        <div id="scorecard" className={`tab-pane fade in ${activeTab === 'scorecard' ? 'show active' : ''}`}>
                                            {scoreCard && scoreCard.length == 0 && 'No Data'}
                                            {scoreCard ? <Scorecard scorecardData={scoreCard}/> : "Loading..."}
                                        </div>
                                        <div id="history" className={`tab-pane fade in ${activeTab === 'history' ? 'show active' : ''}`}>
                                            {oddHistory ? <OddHistory oddHistoryData={oddHistory}/> : "Loading..."}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            <FooterV2/>
        </>    
    )
}
