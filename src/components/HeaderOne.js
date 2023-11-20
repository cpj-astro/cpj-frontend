import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import HeaderLayer from './HeaderLayer';
import axios from 'axios';
import swal from 'sweetalert';

function HeaderOne() {
	const navigate = useNavigate();
	const [matchesData, setMatchesData] = useState([]);
	var accessToken = localStorage.getItem('client_token');
	const apiConfig = {
		headers: {
			Authorization: "Bearer " + accessToken,
			'Content-Type': 'application/json',
		}
	};
	const fetchLiveList = () => {
		axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/liveMatches` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/liveMatches`, apiConfig)
		.then((response) => {
			if(response.data.success){
				setMatchesData(response.data.data);
			}
		}).catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				navigate('/sign-in');
			} else {
				swal("Oh Snap!", error.code, "error");
			}
		});
	}
	useEffect(() => {
        fetchLiveList()
    },[])
    return (
		<>
			<header className="header">
				<HeaderLayer/>
				<section className="header-middle">
					<div className="container">
						<OwlCarousel 
							items={4}
							autoplay
							margin={30}
							dots={false}
						>
							{(matchesData && matchesData.length > 0) ? matchesData.map((match, index) => (
								<div className="score-card p-0" key={index}>
									<div className="score-card-inner">
										<div className="score-card-header text-center">
											<strong>Live</strong>
											<span>{match.matchs}</span>
										</div>
										<div className="score-card-body">
											<div className="country-info">
												<div className="flag-avatar">
													<figure>
														<img src="/assets/images/flags/bangladesh.png" alt="" />
													</figure>
													<span className="country-name">{match.team_a_short}</span>
												</div>
												<div className="score-update">
													<h5>146/6</h5>
													<p className="text-muted">20.0 ov.</p>
												</div>
											</div>
											<div className="country-info flex-row-reverse">
												<div className="flag-avatar ml-05">
													<figure>
														<img src="/assets/images/flags/india.png" alt="" />
													</figure>
													<span className="country-name">{match.team_b_short}</span>
												</div>
												<div className="score-update">
													<h5>102/4</h5>
													<p className="text-muted">20.0 ov</p>
												</div>
											</div>
										</div>
										<div className="floating-text">Target 147</div>
									</div>
									<div className="score-card-footer">
										<p>India need 45 runs in 27 balls. RRR: 10.0</p>
									</div>
									<div class="button-container">
										<button class="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
										<button class="theme-button-2" onClick={() => {navigate('/player-stats')}}>View Astrology</button>
									</div>
								</div>
								)) : <></> 
							}
						</OwlCarousel>
					</div>
				</section>
			</header>
		</>
    );
}

export default HeaderOne;
