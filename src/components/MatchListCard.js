import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhonePeIntegration from './PhonePeIntegration';

export default function MatchListCard({match, index}) {
    console.log("Match", match);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_data');    
    const [pandit, setPandit] = useState([]);
    var accessToken = localStorage.getItem('client_token');
    const [loader, setLoader] = useState(false);
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const fetchPanditsList = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/pandits` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/pandits`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setPandit(response.data.data[0]);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    useEffect(() => {
        fetchPanditsList();
    }, [])

    return (
        <div className="cp__card cp__single-btn d-flex justify-content-between" key={match.match_id + index} data-aos="">
            <div className="cp__card-content" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>
                <div className="cp__card-top d-flex align-items-center justify-content-between">
                    <span>{match.match_type}</span>
                </div>
                <div className="cp__card-middle d-flex align-items-center justify-content-between">
                    <div className="cp__left d-flex align-items-center">
                        <div className="cp__score-desc">
                        <p>{match && match.team_a_short ? match.team_a_short : ''}, {match && match.team_a_scores ? match.team_a_scores : '00-0'}</p>
                        <p className="cp__over">{match && match.team_a_over ? match.team_a_over : '00-0'} OV.</p>
                        </div>
                    </div>
                    <div className="cp__vs"><img src="/assets/images/vs.svg" alt="logo" /></div>
                    <div className="cp__right d-flex align-items-center">
                        <div className="cp__score-desc">
                        <p>{match && match.team_b_short ? match.team_b_short : ''}, {match && match.team_b_scores ? match.team_b_scores : '00-0'}</p>
                        <p className="cp__over">{match && match.team_b_over ? match.team_b_over : '00-0'} OV.</p>
                        </div>
                    </div>
                </div>
                <div className="cp__card-bottom d-flex align-items-center">
                    <p>
                        {match && match.dateLive ? match.dateLive :
                            (match.match_date ? match.match_date + ', ' : '') + (match.match_time ? match.match_time : '')
                        }
                    </p>
                    <span>-</span>
                    <div className="d-flex align-items-center justify-content-between">
                        <span>{match.fav_team}</span>
                        {(match.fav_team == match.team_a_short) ?
                            <>
                                <span className="cp__blue">{match.back1 ? match.back1 : '0.0'}</span>
                                <span className="cp__red">{match.lay1 ? match.lay1 : '0.0'}</span>
                            </> : 
                            <>  
                                <span className="cp__blue">{match.back2 ? match.back2 : '0.0'}</span>
                                <span className="cp__red">{match.lay2 ? match.lay2 : '0.0'}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
            {match.astrology_status === 'enable' && !match.astro_on_live ?
            <div className="cp__card-btngrp d-flex align-items-center justify-content-between">
                {match.match_category == 'recent' && match.payment_id && 
                    <a href={`/match-reports/${match.match_id}`} className="cp__fill-btn">View Astrology</a>
                }
                {match.match_category !== 'recent' && match.button_text == "Buy Astrology" ?
                    <PhonePeIntegration btnText={'Buy Astrology'} astroAmount={pandit.match_astrology_price} matchId={match.match_id} panditId={pandit.id} userId={userId} />
                    :
                    <a href={`/match-reports/${match.match_id}`} className="cp__fill-btn">View Astrology</a>
                }
            </div>
            : 
            <div className="cp__card-btngrp d-flex align-items-center justify-content-between">
                {match.astrology_status === 'enable' && match.astro_on_live && match.is_paid &&
                    <a href={`/match-reports/${match.match_id}`} className="cp__fill-btn">View Astrology</a>
                }
                {match.astrology_status === 'enable' && match.astro_on_live && !match.is_paid &&
                    <PhonePeIntegration btnText="Buy Astrology" astroAmount={pandit.match_astrology_price} matchId={match.match_id} panditId={pandit.id} userId={userId} />

                    // <a href={`/match-reports/${match.match_id}`} className="cp__fill-btn">Buy Astrology</a>
                }
            </div>}
            {match.match_category &&
            <div className="cp__event-status">{match.match_category}</div>
            }
        </div>
    )
}
