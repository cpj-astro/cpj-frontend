import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MatchCard({match, index}) {
    const navigate = useNavigate();
    return (
        <div className="score-card card-shadow p-0 mt-3" key={index}>
            <div className="score-card-inner"  onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>
                <div className="score-card-header text-center">
                    <span>{match.series_name}</span>
                    <div className='text-center owl-it' style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
                        {match.match_category == 'live' && <span className='online-red-dot'></span>}
                        <strong>
                            {match.match_category}
                        </strong>
                    </div>
                </div>
                <div className="score-card-body">
                    <div className="country-info">
                        <div className="flag-avatar">
                            <figure>
                                <img src={match && match.team_a_img ? process.env.REACT_APP_IMG_FIX+match.team_a_img : '/assets/images/flags/bangladesh.png'} alt="" />
                            </figure>
                            <span className="country-name">{match && match.team_a_short ? match.team_a_short : ''}</span>
                        </div>
                        <div className="score-update">
                            <h5>{match && match.team_a_scores ? match.team_a_scores : '00-0'}</h5>
                            <p className="text-muted">{match && match.team_a_over ? match.team_a_over : '00-0'} ov.</p>
                        </div>
                    </div>
                    <div className='vs-style'>
                        <span>VS</span>
                    </div>
                    <div className="country-info flex-row-reverse">
                        <div className="flag-avatar ml-05">
                            <figure>
                                <img src={match && match.team_b_img ? process.env.REACT_APP_IMG_FIX+match.team_b_img : '/assets/images/flags/bangladesh.png'} alt="" />
                            </figure>
                            <span className="country-name">{match.team_b_short}</span>
                        </div>
                        <div className="score-update">
                            <h5>{match && match.team_b_scores ? match.team_b_scores : '00-0'}</h5>
                            <p className="text-muted">{match && match.team_b_over ? match.team_b_over : '00-0'} ov.</p>
                        </div>
                    </div>
                </div>
                <div className='match-dtr-set'>
                    {match && match.dateLive ?
                        <div className='country-name'>
                            {match.dateLive}
                        </div>
                    :
                        <div className='country-name'>
                            {match.match_date ? match.match_date + ', ' : ''} {match.match_time ? match.match_time : ''}
                        </div>
                    }
                    <div>
                        <span className='country-name mr-3'>{match.fav_team}</span>
                        <span className='min-r-set'>{match && match.min_rate ? match.min_rate : '0.0'}</span>
                        <span className='max-r-set'>{match && match.max_rate ? match.max_rate : '0.0'}</span>
                    </div>
                </div>
            </div>
            {match.astrology_status === 'enable' && match.astrology_data ?
            <div className="button-container">
                <button className="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
                {match.match_category == 'recent' && match.payment_id && 
                    <button className={match.button_class} onClick={() => {navigate(`/match-reports/${match.match_id}`)}}>View Astrology</button>
                }
                {match.match_category !== 'recent' &&
                    <button className={match.button_class} onClick={() => {navigate(`/match-reports/${match.match_id}`)}}>{match.button_text}</button>
                }
            </div>
            : 
            <div className="button-container">
                <button className="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
            </div>}
        </div>
    )
}
