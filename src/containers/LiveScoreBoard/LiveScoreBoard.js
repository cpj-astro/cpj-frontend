import React, { useEffect, useState } from 'react';
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

function LiveScoreBoard() {
    const randomNumbers = Array.from({ length: 11 }, () => Math.floor(Math.random() * 100));
	const navigate = useNavigate();
    const {id} = useParams();
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
    const [teams, setTeams] = useState([])
    const [seriesData, setSeriesData] = useState([])
    const [lastFewBalls, setLastFewBalls] = useState([])
    const { speak } = useSpeechSynthesis();
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    
    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const returnBallStatus = (run) => {
        if(run == 6) {
            return 'bg-success';
        } else if(run == 4) {
            return 'bg-primary';
        } else if(run == 'w') {
            return 'bg-danger';
        } else {
            return 'bg-secondary text-white';
        }
    }
    
    const fetchSeriesData = (s_id) => {
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/fetchSeriesData` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/fetchSeriesData`, s_id)
        .then((response) => {
            if(response.data.success){
                setSeriesData(response.data.data);
            }
        }).catch((error) => {
            toast.error(error.code);
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

    const fetchMatchDetails = (id) => {
        const params = {
            match_id: id,
        }
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfo`, params, apiConfig)
		.then((response) => {
			if(response.data.success){
				setMatchDetails(response.data.data);
				setTeams(response.data.teams);
			}
		}).catch((error) => {
			toast.error("Oh Snap!" + error.code);
		});
    }
    
    const showTag = (t, number) => {
        const checkNumberInList = (list) => {
            if (list) {
                const numbers = list.split(',').map(num => num.trim());
                if (numbers.includes(number.toString())) {
                    return true;
                }
            }
            return false;
        };
    
        if (checkNumberInList(t.bowler)) {
            return 'BL';
        } else if (checkNumberInList(t.batsman)) {
            return 'BT';
        } else if (checkNumberInList(t.wicket_keeper)) {
            return 'WK';
        } else if (checkNumberInList(t.all_rounder)) {
            return 'AR';
        } 
        return '';
    }    

    useEffect(() => {
        if(accessToken) {
            fetchMatchDetails(id);
        }
    }, [matchData]);

    useEffect(() => {
        if(matchData && matchData.last4overs){
            prepareLastAFewBalls(matchData.last4overs);
        }
    }, [matchData.last4overs]);

    useEffect(() => {
        if(matchData && matchData.series_id){
            console.log(matchData.series_id)
            fetchSeriesData(matchData.series_id);
        }
    }, [matchData.series_id]);

    useEffect(() => {
        onSnapshot(doc(db, "matchdata", id), (doc) => {
            setMatchData(doc.data()); 
            console.log(doc.data())
        });
    }, []);
    
    useEffect(() => {
        setBack1Style('summer-yellow');
        setTimeout(() => {
            setBack1Style('');
        }, 200);
    }, [matchData.back1])

    useEffect(() => {
        setLay1Style('summer-yellow');
        setTimeout(() => {
            setLay1Style('');
        }, 200);
    }, [matchData.lay1])

    useEffect(() => {
        setBack2Style('summer-yellow');
        setTimeout(() => {
            setBack2Style('');
        }, 200);
    }, [matchData.back2])

    useEffect(() => {
        setLay2Style('summer-yellow');
        setTimeout(() => {
            setLay2Style('');
        }, 200);
    }, [matchData.lay2])

    useEffect(() => {
        setMcBack1Style('summer-yellow');
        setTimeout(() => {
            setMcBack1Style('');
        }, 200);
    }, [matchData.match_completed && matchData.match_completed.t1_back])

    useEffect(() => {
        setMcLay1Style('summer-yellow');
        setTimeout(() => {
            setMcLay1Style('');
        }, 200);
    }, [matchData.match_completed && matchData.match_completed.t1_lay])

    useEffect(() => {
        setMcBack2Style('summer-yellow');
        setTimeout(() => {
            setMcBack2Style('');
        }, 200);
    }, [matchData.match_completed && matchData.match_completed.t2_back])

    useEffect(() => {
        setMcLay2Style('summer-yellow');
        setTimeout(() => {
            setMcLay2Style('');
        }, 200);
    }, [matchData.match_completed && matchData.match_completed.t2_lay])

    useEffect(() => {
        setMtBack1Style('summer-yellow');
        setTimeout(() => {
            setMtBack1Style('');
        }, 200);
    }, [matchData.match_tied && matchData.match_tied.t1_back])

    useEffect(() => {
        setMtLay1Style('summer-yellow');
        setTimeout(() => {
            setMtLay1Style('');
        }, 200);
    }, [matchData.match_tied && matchData.match_tied.t1_lay])

    useEffect(() => {
        setMtBack2Style('summer-yellow');
        setTimeout(() => {
            setMtBack2Style('');
        }, 200);
    }, [matchData.match_tied && matchData.match_tied.t2_back])

    useEffect(() => {
        setMtLay2Style('summer-yellow');
        setTimeout(() => {
            setMtLay2Style('');
        }, 200);
    }, [matchData.match_tied && matchData.match_tied.t2_lay])

    useEffect(() => {
        if(matchData.first_circle) {
            speak({ text: matchData.first_circle });
        }
    }, [matchData.first_circle]);
    return (
		<>
			<div id="main" className="l_con main-container others">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className='rrates-container mb-3'>
                                <a href={"/"} className="left-com">
                                    <i className='fa fa-arrow-left'></i>
                                </a>
                                {accessToken ?
                                    <a href={"/profile"} className="right-com">
                                        <span className=''>My Profile</span>
                                    </a>
                                : 
                                    <a href={"/sign-in"} className="right-com">
                                        <span className=''>Sign In</span>
                                    </a>
                                }
                            </div>
                            <section className="live-matches p-0">
                                <span onClick={() => {navigate(`/match-astrology/${id}`)}} className="btn-astro">
                                    <div>
                                        {matchDetails.razorpay_payment_id ? 'View Astrology' : 'Buy Astrology'}
                                    </div>
                                </span>
                                <div className='tv-container mt-3'>    
                                    <div className="tv">
                                        <div className='just-set'>
                                            <strong className="text-red text-uppercase">{matchData.match_category}</strong>
                                        </div>
                                        <div className="score">
                                            {matchData.first_circle}
                                        </div>
                                        <div className='card mb-0'>
                                            <div className="score-card-lg d-md-flex p-0">
                                                <div className="flex-grow-1">
                                                    <div className="score-card-body">
                                                        <div className="country-info">
                                                            <div className="text-center">
                                                                <span className="country-name">{matchData.team_a_short}</span>
                                                                <span>{matchData && matchData.team_a_scores ? matchData.team_a_scores : '00-0'}</span> &nbsp;
                                                                <span className="text-muted">{matchData && matchData.team_a_over ? matchData.team_a_over : '0.0'} ov.</span>
                                                            </div>
                                                        </div>
                                                        <div className="country-info">
                                                            <div className="text-center">
                                                                <span className="country-name">{matchData.team_b_short}</span>
                                                                <span>{matchData && matchData.team_b_scores ? matchData.team_b_scores : '00-0'}</span> &nbsp;
                                                                <span className="text-muted">{matchData && matchData.team_b_over ? matchData.team_b_over : '0.0'} ov.</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className='col-md-12'>
                                    <div className="card card-shadow">
                                        <div className="spell-sum-box">
                                            <h5>Last 4 Overs</h5>
                                            <div className="recent-spell" style={{overflow: 'auto'}}>
                                                <ul style={{display: 'flex'}}>
                                                {
                                                    lastFewBalls && lastFewBalls.map((itemJ, keyJ) => {
                                                        if (itemJ.over != "") {
                                                            return (
                                                                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} key={keyJ}>
                                                                    <div style={{ color: '#000000', width: 'max-content', marginRight: '5px' }}>{itemJ.over}</div>
                                                                </div>
                                                            );
                                                        }
                                                        else if (itemJ.ballVal != "") {
                                                            return (
                                                                <Ball key={keyJ} val={itemJ.ballVal} />
                                                            );
                                                        }
                                                        else if (itemJ.runs != "") {
                                                            return (
                                                                <div key={keyJ} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                                                    <div style={{ color: '#000000', width: 'max-content', marginRight: '5px' }}> = {itemJ.runs} {lastFewBalls.length > (keyJ + 1) && '|'} </div>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                }
                                                {lastFewBalls.length == 0 && <div>No Data</div>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <aside className="sidebar right-sidebar">
                                            <div className="widget widget-upcoming-match">
                                                <div className="card card-shadow">
                                                    <ul className="nav nav-tabs">
                                                        <li className="active"><a data-toggle="tab" href="#liveline" className="active">Liveline</a></li>
                                                        <li><a data-toggle="tab" href="#liveastrology">Live Astrology</a></li>
                                                        <li><a data-toggle="tab" href="#fantasyteams">Fantasy Teams</a></li>
                                                        <li><a data-toggle="tab" href="#info">Info</a></li>
                                                        <li><a data-toggle="tab" href="#session">Session</a></li>
                                                        <li><a data-toggle="tab" href="#commentary">Commentary</a></li>
                                                        <li><a data-toggle="tab" href="#scorecard">Scorecard</a></li>
                                                        <li><a data-toggle="tab" href="#history">History</a></li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div id="liveline" className="tab-pane fade in show active">
                                                            <hr className='m-0'/>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="widget widget-rankings">
                                                                        <h3 className="widget-title">Match Odds</h3>

                                                                        <div className="card px-0 py-10 odd-border">
                                                                            <div id="test_rank_trs" className="tab-pane fade in show active">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Team Name</th>
                                                                                                <th scope="col">Back</th>
                                                                                                <th scope="col">Lay</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>{matchData.team_a}</td>
                                                                                                <td className={'back-color bl-style ' + back1Style}>{matchData.back1}</td>
                                                                                                <td className={'lay-color bl-style ' + lay1Style}>{matchData.lay1}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>{matchData.team_b}</td>
                                                                                                <td className={'back-color bl-style ' + back2Style}>{matchData.back2}</td>
                                                                                                <td className={'lay-color bl-style ' + lay2Style}>{matchData.lay2}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>  
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {matchData && matchData.fancy_info && matchData.fancy_info.length > 0 ?  
                                                                <div className="col-md-12">
                                                                    <div className="widget widget-rankings">
                                                                        <h3 className="widget-title">Fancy Info</h3>

                                                                        <div className="card px-0 py-10 odd-border">
                                                                            <div id="test_rank_trs" className="tab-pane fade in show active">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Fancy</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>No</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>Yes</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {matchData && matchData.fancy_info && matchData.fancy_info.map((fancy, index) => (
                                                                                            <tr className={fancy.over ? '' : 'd-none'}>
                                                                                                <td> 
                                                                                                    <div>
                                                                                                        {fancy.s_over + ' over runs'}
                                                                                                    </div> 
                                                                                                </td>
                                                                                                <td style={{padding: '0px'}}> 
                                                                                                    <div className='back-color bl-style'>
                                                                                                        {fancy.suspend && 
                                                                                                            <div className='suspend-style'>SUSPENDED</div>
                                                                                                        } 
                                                                                                        <div className='fancy-t1'>{fancy.s_min}</div>
                                                                                                        <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{fancy.s_min_rate}</div>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td style={{ padding: '0px' }}>
                                                                                                    <div className='lay-color bl-style'>
                                                                                                        {fancy.suspend && 
                                                                                                            <div className='suspend-style'>SUSPENDED</div>
                                                                                                        } 
                                                                                                        <div className='fancy-t1'>{fancy.s_max}</div>
                                                                                                        <div style={{color: 'black', fontSize: '9px', fontWeight: 'bold'}}>{fancy.s_max_rate}</div>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>  
                                                                        </div>
                                                                    </div>
                                                                </div> : <></>}
                                                                {matchData && matchData.match_completed && matchData.match_completed.status &&
                                                                <div className="col-md-12">
                                                                    <div className="widget widget-rankings">
                                                                        <h3 className="widget-title">Match Completed</h3>
                                                                        <div className="card px-0 py-10 odd-border">
                                                                            <div id="test_rank_trs" className="tab-pane fade in show active">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Team Name</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>Back</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>Lay</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>YES</td>
                                                                                                <td className={'back-color bl-style ' + mcBack1Style}>{matchData && matchData.match_completed ? matchData.match_completed.t1_back : ''}</td>
                                                                                                <td className={'lay-color bl-style ' + mcLay1Style}>{matchData && matchData.match_completed ? matchData.match_completed.t1_lay : ''}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>NO</td>
                                                                                                <td className={'back-color bl-style ' + mcBack2Style}>{matchData && matchData.match_completed ? matchData.match_completed.t2_back : ''}</td>
                                                                                                <td className={'lay-color bl-style ' + mcLay2Style}>{matchData && matchData.match_completed ? matchData.match_completed.t2_lay : ''}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>}
                                                                {matchData && matchData.match_tied && matchData.match_tied.status &&
                                                                <div className="col-md-12">
                                                                    <div className="widget widget-rankings">
                                                                        <h3 className="widget-title">Match Tied</h3>

                                                                        <div className="card px-0 py-10 odd-border">
                                                                            <div id="test_rank_trs" className="tab-pane fade in show active">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Team Name</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>Back</th>
                                                                                                <th scope="col" style={{width: '10%', textAlign: 'center'}}>Lay</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>YES</td>
                                                                                                <td className={'back-color bl-style ' + mtBack1Style}>{matchData && matchData.match_tied ? matchData.match_tied.t1_back : ''}</td>
                                                                                                <td className={'lay-color bl-style ' + mtLay1Style}>{matchData && matchData.match_tied ? matchData.match_tied.t1_lay : ''}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>NO</td>
                                                                                                <td className={'back-color bl-style ' + mtBack2Style}>{matchData && matchData.match_tied ? matchData.match_tied.t2_back : ''}</td>
                                                                                                <td className={'lay-color bl-style ' + mtLay2Style}>{matchData && matchData.match_tied ? matchData.match_tied.t2_lay : ''}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                            <hr/>
                                                            <div className="accordion" id="accordion">
                                                                <div className="accordion-item">
                                                                    <h5 className="" data-toggle="collapse" data-target="#bd_innings" aria-expanded="true">{matchData.batting_team == matchData.team_a_id ? matchData.team_a : matchData.team_b} Innings</h5>
                                                                    <div id="bd_innings" className="collapse show" data-parent="#accordion">
                                                                        <div className="acr-body">
                                                                            <div className="card card-shadow p-0">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped table-medium no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Batsmen</th>
                                                                                                <th scope="col">r</th>
                                                                                                <th scope="col">b</th>
                                                                                                <th scope="col">4s</th>
                                                                                                <th scope="col">6s</th>
                                                                                                <th scope="col">sr</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {matchData && matchData.batsman && matchData.batsman.map((batsman, index) => (
                                                                                                <tr>
                                                                                                    <td>{batsman.name}</td>
                                                                                                    <td><strong>{batsman.run}</strong></td>
                                                                                                    <td>{batsman.ball}</td>
                                                                                                    <td>{batsman.fours}</td>
                                                                                                    <td>{batsman.sixes}</td>
                                                                                                    <td>{batsman.strike_rate}</td>
                                                                                                </tr>
                                                                                            ))}
                                                                                            <tr>
                                                                                                <td><strong>Extras</strong></td>
                                                                                                <td>b 0, lb 2, w 0, nb 0, p 0</td>
                                                                                                <td className="text-left" colspan="5"><strong>2</strong></td>
                                                                                            </tr>
                                                                                            <tr className="score-text-bold">
                                                                                                <td>Total Score</td>
                                                                                                <td>{matchData.team_a_scores}</td>  
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <div className="spell-sum-box px-30 py-20">
                                                                                        <h5>Yet to bat: &nbsp;
                                                                                        <span> 
                                                                                        {matchData && matchData.yet_to_bet && matchData.yet_to_bet.map((bet, index, array) => (
                                                                                            <React.Fragment key={index}>
                                                                                            {bet}
                                                                                            {index !== array.length - 1 && ', '}
                                                                                            </React.Fragment>
                                                                                        ))}
                                                                                        </span>

                                                                                        </h5>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card card-shadow p-0">
                                                                                <div className="table-responsive">
                                                                                    <table className="widget-table table table-striped table-medium no-border">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">Bowlers</th>
                                                                                                <th scope="col">o</th>
                                                                                                <th scope="col">r</th>
                                                                                                <th scope="col">w</th>
                                                                                                <th scope="col">econ</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <a href="#"><strong>{matchData && matchData.bolwer && matchData.bolwer.name ? matchData.bolwer.name : ''}</strong></a>
                                                                                                </td>
                                                                                                <td><strong>{matchData && matchData.bolwer && matchData.bolwer.over ? matchData.bolwer.over : ''}</strong></td>
                                                                                                <td>{matchData && matchData.bolwer && matchData.bolwer.run ? matchData.bolwer.run : ''}</td>
                                                                                                <td>{matchData && matchData.bolwer && matchData.bolwer.wicket ? matchData.bolwer.wicket : ''}</td>
                                                                                                <td>{matchData && matchData.bolwer && matchData.bolwer.economy ? matchData.bolwer.economy : ''}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="liveastrology" className="tab-pane fade">
                                                            Time: 10:00 PM <br/>
                                                            Description: Lorem Ipsum <br/>
                                                            Zodiac/Rashi: Lorem Ipsum Dorem <br/>
                                                            Special Recommendation: Lorem Ipsum <br/>
                                                        </div>
                                                        <div id="fantasyteams" className="tab-pane fade">
                                                        <hr className='mb-2 mt-2'/>
                                                        {teams && teams.length > 0 && teams.map((team, index) => (
                                                            <div className="widget widget-shop-categories widget-accordion">
                                                                <div className="accordion" id="accordion">
                                                                    <div className="accordion-item">
                                                                        <h5 className="collapsed just-set" data-toggle="collapse" data-target={'#_' + team.id} aria-expanded="false">
                                                                            <b>{team.team_name}</b>
                                                                            <button className='btn btn-success buy-btn' onClick={()=> {toast('Will show payment gateway on fantasy team purchase')}}>₹&nbsp;39</button>
                                                                        </h5>
                                                                    </div>
                                                                    <section id={'_' + team.id} data-parent="#accordion" className="collapse team-rankings pt-1 p-0 pb-1">
                                                                        <div className="tab-pane fade in show active">
                                                                            <div className="card card-shadow table-responsive p-0">
                                                                                <table className="fantasy-players widget-table table table-striped no-border">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">Players</th>
                                                                                            <th scope="col" className='text-center'>CAP</th>
                                                                                            <th scope="col" className='text-center'>VC</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 1) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 1)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p1}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 1 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 1 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 2) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 2)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p2}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 2 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 2 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 3) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 3)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p3}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 3 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 3 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 4) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 4)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p4}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 4 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 4 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 5) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 5)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p5}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 5 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 5 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 6) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 6)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p6}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 6 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 6 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 7) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 7)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p7}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 7 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 7 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 8) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 8)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p8}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 8 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 8 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 9) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 9)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p9}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 9 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 9 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 10) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 10)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p10}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 10 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 10 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="country-info align-items-center">
                                                                                                    <div className="flag-avatar mr-05">
                                                                                                        <figure className="avatar-28 p-0">
                                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                                            {showTag(team, 11) !== '' && 
                                                                                                                <span class="p_class">{showTag(team, 11)}</span>
                                                                                                            }
                                                                                                        </figure>
                                                                                                    </div>
                                                                                                    <span className="country-name text-13">{team.p11}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.captain == 11 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                                            </td>
                                                                                            <td className='text-center'>
                                                                                                <div className={team.vice_captain == 11 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {accessToken && teams && teams.length == 0 && <div>No Fantasy Teams</div>}
                                                        {!accessToken && teams && teams.length == 0 && <div>Please Login to see Fantasy Teams</div>}
                                                        </div>
                                                        <div id="info" className="tab-pane fade">
                                                            <hr className='mb-0'/>
                                                            <div className='status-bar-fill'>{matchData.result ? matchData.result : 'No Result' }</div>
                                                            <div className="pt-0 pb-10">
                                                                <div className="player-profile">
                                                                    <div className="player-info">
                                                                        <div className="info-body">
                                                                            <ul className="list-striped mr-05">
                                                                                <li>
                                                                                    <span>Series: </span>
                                                                                    <p style={{fontSize: '11px'}}>{seriesData && seriesData.series_name ? seriesData.series_name : 'N/A'}</p>
                                                                                </li>
                                                                                <li>
                                                                                    <span>Match: </span>
                                                                                    <p style={{fontSize: '11px'}}>{matchData.date_wise}</p>
                                                                                </li>
                                                                            </ul>
                                                                            <ul className="list-striped">
                                                                                <li>
                                                                                    <span>Date & Day: </span>
                                                                                    <p style={{fontSize: '11px'}}>{seriesData && seriesData.series_date}</p>
                                                                                </li>
                                                                                <li>
                                                                                    <span>Time: </span>
                                                                                    <p>{matchData.match_time}</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='pb-10'>
                                                                <h3 className="widget-title">Squads</h3>
                                                                <div className="widget widget-shop-categories widget-accordion">
                                                                    <div className="accordion" id="accordion">
                                                                        <div className="accordion-item">
                                                                            <h5 className="collapsed" data-toggle="collapse" data-target="#team_a" aria-expanded="false">INDIA</h5>
                                                                            <div id="team_a" className="collapse" data-parent="#accordion">
                                                                                <div className="acr-body">
                                                                                    <section className="pb-20 pt-0">
                                                                                        <div className="row">
                                                                                            {randomNumbers.map((number, index) => (
                                                                                            <div className='col-md-6' key={index}>
                                                                                                <div className="row">
                                                                                                    <div className="col-md-6">
                                                                                                        <div className='d-flex'>
                                                                                                            <div className="mt-10">
                                                                                                                <img src="/assets/images/shop/single-shop/thumbs/cart-1.jpg" alt="" className='player-avatar-img'/>
                                                                                                            </div>
                                                                                                            <div className="mt-10 pl-10">
                                                                                                                <div className="content-block">
                                                                                                                    <h3>
                                                                                                                        <a href="#">Player Name</a>
                                                                                                                    </h3>
                                                                                                                    <div className="prod-info">
                                                                                                                        <a href="#" className="post-meta category">Wicket Keeper</a>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </section>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="accordion-item">
                                                                            <h5 className="collapsed" data-toggle="collapse" data-target="#team_b" aria-expanded="false">PAKISTAN</h5>
                                                                            <div id="team_b" className="collapse" data-parent="#accordion">
                                                                            <div className="acr-body">
                                                                                    <section className="pb-20 pt-0">
                                                                                        <div className="row">
                                                                                            {randomNumbers.map((number, index) => (
                                                                                            <div className='col-md-6' key={index}>
                                                                                                <div className="row">
                                                                                                    <div className="col-md-6">
                                                                                                        <div className='d-flex'>
                                                                                                            <div className="mt-10">
                                                                                                                <img src="/assets/images/shop/single-shop/thumbs/cart-1.jpg" alt="" className='player-avatar-img'/>
                                                                                                            </div>
                                                                                                            <div className="mt-10 pl-10">
                                                                                                                <div className="content-block">
                                                                                                                    <h3>
                                                                                                                        <a href="#">Player Name</a>
                                                                                                                    </h3>
                                                                                                                    <div className="prod-info">
                                                                                                                        <a href="#" className="post-meta category">Wicket Keeper</a>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </section>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='pb-10'>
                                                                <h3 className="widget-title">Team Form - Last 5 matches</h3>
                                                                <table className='table-responsive'>
                                                                    <tr>
                                                                        <td>
                                                                            <h5 className='mb-0'>INDIA: </h5>
                                                                        </td>
                                                                        <td>
                                                                            <div className='spell-sum-box p-1'>
                                                                                <div className="recent-spell">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <span>*</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-success">W</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-success">W</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <h5 className='mb-0'>PAKISTAN: </h5>
                                                                        </td>
                                                                        <td>
                                                                            <div className='spell-sum-box p-1'>
                                                                                <div className="recent-spell">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <span>*</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-success">W</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span className="bg-danger">L</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                            <div className='pb-10'>
                                                                <h3 className="widget-title">Venue Guide</h3>
                                                                <div className="venue-wrapper">
                                                                    <i className='fa fa-map-pin'></i>
                                                                    <span className="">{matchData.venue}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="session" className='tab-pane fade'>
                                                            <hr className='mb-0'/>
                                                            <div className='text-session' dangerouslySetInnerHTML={{__html: matchData.session}} /> 
                                                        </div>
                                                        <div id="commentary" className="tab-pane fade">
                                                            <hr className='mb-0'/>
                                                            <div className='mt-10 text-muted'>NO COMMENTARY YET</div>
                                                        </div>
                                                        <div id="scorecard" className="tab-pane fade">
                                                            
                                                        </div>
                                                        <div id="history" className="tab-pane fade">
                                                            <hr className='mb-0'/>
                                                            <div className="widget widget-shop-categories widget-accordion">
                                                                <div className="accordion" id="accordion">
                                                                    <div className="accordion-item">
                                                                        <h5 className="collapsed" data-toggle="collapse" data-target="#team_b" aria-expanded="false">1st Over (4-0)</h5>
                                                                        <div id="team_b" className="collapse" data-parent="#accordion">
                                                                            <div className="acr-body">
                                                                                <section className="live-matches pt-0 pb-0">
                                                                                    <div className="score-card-lg d-md-flex p-0 custom-runs">
                                                                                        <div className="score-card-inner flex-grow-1 px-3 py-3">
                                                                                            <div className="score-card-body">
                                                                                                <div className="country-info">
                                                                                                    <div className="flag-avatar">
                                                                                                        <figure className="run-figure run-wide">
                                                                                                            WD
                                                                                                        </figure>
                                                                                                        <span className="country-name">03:06 PM</span>
                                                                                                    </div>
                                                                                                    <div className="score-update ml-10 text-center">
                                                                                                        <h5>151 - 7</h5>
                                                                                                        <p className="text-muted">0.3</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                
                                                                                                <div className="">
                                                                                                    <div className="d-flex custom-fancy-tags">
                                                                                                        <div className="tag-1">PAK</div>
                                                                                                        <div className="tag-2">12</div>
                                                                                                        <div className="tag-3">15</div>
                                                                                                    </div>
                                                                                                    <div className="d-flex custom-fancy-tags mt-1">
                                                                                                        <div className="tag-4">10 Over</div>
                                                                                                        <div className='tag-2'>50</div>
                                                                                                        <div className='tag-3'>53</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="score-card-lg d-md-flex p-0 custom-runs">
                                                                                        <div className="score-card-inner flex-grow-1 px-3 py-3">
                                                                                            <div className="score-card-body">
                                                                                                <div className="country-info">
                                                                                                    <div className="flag-avatar">
                                                                                                        <figure className="run-figure run-4">
                                                                                                            4
                                                                                                        </figure>
                                                                                                        <span className="country-name">03:06 PM</span>
                                                                                                    </div>
                                                                                                    <div className="score-update ml-10 text-center">
                                                                                                        <h5>150 - 7</h5>
                                                                                                        <p className="text-muted">0.3</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                
                                                                                                <div className="">
                                                                                                    <div className="d-flex custom-fancy-tags">
                                                                                                        <div className="tag-1">PAK</div>
                                                                                                        <div className="tag-2">10</div>
                                                                                                        <div className="tag-3">15</div>
                                                                                                    </div>
                                                                                                    <div className="d-flex custom-fancy-tags mt-1">
                                                                                                        <div className="tag-4">10 Over</div>
                                                                                                        <div className='tag-2'>51</div>
                                                                                                        <div className='tag-3'>53</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="score-card-lg d-md-flex p-0 custom-runs">
                                                                                        <div className="score-card-inner flex-grow-1 px-3 py-3">
                                                                                            <div className="score-card-body">
                                                                                                <div className="country-info">
                                                                                                    <div className="flag-avatar">
                                                                                                        <figure className="run-figure run-1">
                                                                                                            1
                                                                                                        </figure>
                                                                                                        <span className="country-name">02:00 PM</span>
                                                                                                    </div>
                                                                                                    <div className="score-update ml-10 text-center">
                                                                                                        <h5>146 - 6</h5>
                                                                                                        <p className="text-muted">0.1</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                
                                                                                                <div className="">
                                                                                                    <div className="d-flex custom-fancy-tags">
                                                                                                        <div className="tag-1">PAK</div>
                                                                                                        <div className="tag-2">10</div>
                                                                                                        <div className="tag-3">11</div>
                                                                                                    </div>
                                                                                                    <div className="d-flex custom-fancy-tags mt-1">
                                                                                                        <div className="tag-4">10 Over</div>
                                                                                                        <div className='tag-2'>52</div>
                                                                                                        <div className='tag-3'>53</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-3">
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
		</>
    );
}

export default LiveScoreBoard;
