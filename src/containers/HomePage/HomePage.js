import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Kundli from '../../components/Kundli';
import { toast } from 'react-toastify';

function HomePage() {
	const navigate = useNavigate();
	const [matchesData, setMatchesData] = useState([]);
	const [user, setUserData] = useState([]);
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
				toast.error("Oh Snap!" + error.code);
			}
		});
	}

	const fetchUserData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
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
	
	useEffect(() => {
        fetchLiveList()
		fetchUserData();
    },[])
    return (
		<>
			<Header/>
			<header className="header">
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
										{/* <div className="floating-text">Target 147</div> */}
									</div>
									{/* <div className="score-card-footer">
										<p>India need 45 runs in 27 balls. RRR: 10.0</p>
									</div> */}
									<div class="button-container">
										<button class="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
										{match.razorpay_payment_id && match.razorpay_order_id && match.razorpay_signature && match.payment_status ? (
											<button class="theme-button-2" onClick={() => {navigate(`/match-astrology/${match.match_id}`)}}>View Astrology</button>
										) : (
											<button class="theme-button-3" onClick={() => {navigate(`/match-astrology/${match.match_id}`)}}>Buy Astrology</button>
										)}
									</div>
								</div>
								)) : <></> 
							}
						</OwlCarousel>
					</div>
				</section>
			</header>
			<div id="main" className="main-container">
				<div className="container">
					<section className="player-contact pt-0 pb-0">
						<div className="card card-shadow">
							<div className="player-profile">
								<figure className="kundli-avatar">
									<Kundli housesData={user && user.kundli_data ? user.kundli_data : []}/>
								</figure>
								<div className="player-info">
									<div className="info-header">
										<div>
											<h2>
												{user && user.first_name} {user && user.last_name} &nbsp;
												<svg xmlns="http://www.w3.org/2000/svg" width="19.636" height="24" viewBox="0 0 19.636 24">
													<path
														id="Icon_material-verified-user"
														data-name="Icon material-verified-user"
														d="M14.318,1.5,4.5,5.864v6.545c0,6.055,4.189,11.716,9.818,13.091,5.629-1.375,9.818-7.036,9.818-13.091V5.864ZM12.136,18.955,7.773,14.591l1.538-1.538,2.825,2.815,7.189-7.189,1.538,1.549Z"
														transform="translate(-4.5 -1.5)"
														fill="#3a5ae5"
													/>
												</svg>
											</h2>
										</div>
										<div className="social-share">
											<a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-instagram"></i></a>
										</div>
									</div>

									<div className="info-body">
										<ul className="list-striped mr-05">
											<li>
												<span>Date of birth</span>
												<span>{user && user.birth_date}</span>
											</li>
											<li>
												<span>Birth Time</span>
												<span>{user && user.birth_time}</span>
											</li>
											<li>
												<span>Birth place</span>
												<span>{user && user.birth_place}</span>
											</li>
										</ul>
										<ul className="list-striped">
											<li>
												<span>Moon Sign</span>
												<span>{user && user.sign_name}</span>
											</li>
											<li>
												<span>Latitude</span>
												<span>{user && user.latitude}</span>
											</li>
											<li>
												<span>Longitude</span>
												<span>{user && user.longitude}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className="row">
						<div className="col-lg-3">
							<aside className="sidebar left-sidebar">
								<div className="widget widget-upcoming-match">
									<h3 className="widget-title">Upcoming Matches</h3>

									<div className="card card-shadow">
										<ul className="nav nav-tabs">
											<li className="active"><a data-toggle="tab" href="#series" className="active">Series</a></li>
											<li><a data-toggle="tab" href="#league">League</a></li>
										</ul>

										<div className="tab-content">
											<div id="series" className="tab-pane fade in show active">
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/afghanistan.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/australia.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/india.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/england.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/bangladesh.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/zimbabwe.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div id="league" className="tab-pane fade">
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/bangladesh.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/india.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/south-africa.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/sri-lanka.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
												<div className="score-card">
													<div className="score-card-body">
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/new-zealand.png" alt="" />
																</figure>
																<span className="country-name">ban</span>
															</div>
														</div>
														<div className="score-update m-0 text-center">
															<h5>22:30</h5>
															<p className="text-muted">Today</p>
														</div>
														<div className="country-info">
															<div className="flag-avatar">
																<figure>
																	<img src="assets/images/flags/india.png" alt="" />
																</figure>
																<span className="country-name">ind</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="widget widget-key-series">
									<h3 className="widget-title">Key Series</h3>

									<div className="card card-shadow">
										<div className="score-card">
											<div className="score-card-body">
												<div className="country-info align-items-center">
													<div className="flag-avatar mr-05">
														<figure>
															<img src="assets/images/flags/new-zealand.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ban</span>
												</div>
												<div className="score-update m-0 text-center">
													<p className="text-muted">VS</p>
												</div>
												<div className="country-info align-items-center flex-row-reverse">
													<div className="flag-avatar ml-05">
														<figure>
															<img src="assets/images/flags/india.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ind</span>
												</div>
											</div>
										</div>
										<div className="score-card">
											<div className="score-card-body">
												<div className="country-info align-items-center">
													<div className="flag-avatar mr-05">
														<figure>
															<img src="assets/images/flags/afghanistan.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ban</span>
												</div>
												<div className="score-update m-0 text-center">
													<p className="text-muted">VS</p>
												</div>
												<div className="country-info align-items-center flex-row-reverse">
													<div className="flag-avatar ml-05">
														<figure>
															<img src="assets/images/flags/bangladesh.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ind</span>
												</div>
											</div>
										</div>
										<div className="score-card">
											<div className="score-card-body">
												<div className="country-info align-items-center">
													<div className="flag-avatar mr-05">
														<figure>
															<img src="assets/images/flags/australia.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ban</span>
												</div>
												<div className="score-update m-0 text-center">
													<p className="text-muted">VS</p>
												</div>
												<div className="country-info align-items-center flex-row-reverse">
													<div className="flag-avatar ml-05">
														<figure>
															<img src="assets/images/flags/zimbabwe.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ind</span>
												</div>
											</div>
										</div>
										<div className="score-card">
											<div className="score-card-body">
												<div className="country-info align-items-center">
													<div className="flag-avatar mr-05">
														<figure>
															<img src="assets/images/flags/afghanistan.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ban</span>
												</div>
												<div className="score-update m-0 text-center">
													<p className="text-muted">VS</p>
												</div>
												<div className="country-info align-items-center flex-row-reverse">
													<div className="flag-avatar ml-05">
														<figure>
															<img src="assets/images/flags/india.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ind</span>
												</div>
											</div>
										</div>
										<div className="score-card">
											<div className="score-card-body">
												<div className="country-info align-items-center">
													<div className="flag-avatar mr-05">
														<figure>
															<img src="assets/images/flags/afghanistan.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ban</span>
												</div>
												<div className="score-update m-0 text-center">
													<p className="text-muted">VS</p>
												</div>
												<div className="country-info align-items-center flex-row-reverse">
													<div className="flag-avatar ml-05">
														<figure>
															<img src="assets/images/flags/south-africa.png" alt="" />
														</figure>
													</div>
													<span className="country-name text-12">ind</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="widget widget-rankings">
									<h3 className="widget-title">Team Ranking</h3>

									<div className="card card-shadow p-0">
										<ul className="nav nav-tabs px-20 py-20 pb-0">
											<li className="active"><a data-toggle="tab" href="#t20_rank" className="active">T20</a></li>
											<li><a data-toggle="tab" href="#odi_rank">ODI</a></li>
											<li><a data-toggle="tab" href="#test_rank">Test</a></li>
										</ul>

										<div className="tab-content">
											<div id="t20_rank" className="tab-pane fade in show active">
												<div className="table-responsive">
													<table className="widget-table table table-striped no-border">
														<caption className="text-center">
															<a href="#">See all Stats</a>
														</caption>
														<thead>
															<tr>
																<th scope="col"></th>
																<th scope="col">team</th>
																<th scope="col">points</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="text-13">01.</td>
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
																<td className="text-13">272</td>
															</tr>
															<tr>
																<td className="text-13">02.</td>
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
																<td className="text-13">270</td>
															</tr>
															<tr>
																<td className="text-13">03.</td>
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
																<td className="text-13">267</td>
															</tr>
															<tr>
																<td className="text-13">04.</td>
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
																<td className="text-13">260</td>
															</tr>
															<tr>
																<td className="text-13">05.</td>
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
																<td className="text-13">255</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											<div id="odi_rank" className="tab-pane fade">
												<div className="table-responsive">
													<table className="widget-table table table-striped no-border">
														<caption className="text-center">
															<a href="#">See all Stats</a>
														</caption>
														<thead>
															<tr>
																<th scope="col"></th>
																<th scope="col">team</th>
																<th scope="col">points</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="text-13">01.</td>
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
																<td className="text-13">121</td>
															</tr>
															<tr>
																<td className="text-13">02.</td>
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
																<td className="text-13">119</td>
															</tr>
															<tr>
																<td className="text-13">03.</td>
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
																<td className="text-13">118</td>
															</tr>
															<tr>
																<td className="text-13">04.</td>
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
																<td className="text-13">111</td>
															</tr>
															<tr>
																<td className="text-13">05.</td>
																<td className="pl-0">
																	<div className="country-info align-items-center">
																		<div className="flag-avatar mr-05">
																			<figure className="avatar-28">
																				<img src="assets/images/flags/south-africa.png" alt="" />
																			</figure>
																		</div>
																		<span className="country-name text-13">south africa</span>
																	</div>
																</td>
																<td className="text-13">107</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											<div id="test_rank" className="tab-pane fade">
												<div className="table-responsive">
													<table className="widget-table table table-striped no-border">
														<caption className="text-center">
															<a href="#">See all Stats</a>
														</caption>
														<thead>
															<tr>
																<th scope="col"></th>
																<th scope="col">team</th>
																<th scope="col">points</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="text-13">01.</td>
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
																<td className="text-13">120</td>
															</tr>
															<tr>
																<td className="text-13">02.</td>
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
																<td className="text-13">118</td>
															</tr>
															<tr>
																<td className="text-13">03.</td>
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
																<td className="text-13">113</td>
															</tr>
															<tr>
																<td className="text-13">04.</td>
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
																<td className="text-13">106</td>
															</tr>
															<tr>
																<td className="text-13">05.</td>
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
																<td className="text-13">90</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</aside>
						</div>
						<div className="col-lg-6">
							<section className="widget features-sec pt-0">
								<h3 className="widget-title">Featured</h3>
								<div className="card card-shadow p-0">
									<div className="score-card score-card-lg">
										<div className="score-card-body">
											<div className="country-info">
												<div className="flag-avatar">
													<figure>
														<img src="assets/images/flags/bangladesh.png" alt="" />
													</figure>
													<span className="country-name">ban</span>
												</div>
												<div className="score-update">
													<h5>146/6</h5>
													<p className="text-muted">20.0 ov.</p>
												</div>
											</div>
											<div className="score-update text-center">
												<h5>Live</h5>
												<p className="text-muted">Day 2, Session 2, India trail by 152 runs.</p>
											</div>
											<div className="country-info flex-row-reverse">
												<div className="flag-avatar ml-05">
													<figure>
														<img src="assets/images/flags/india.png" alt="" />
													</figure>
													<span className="country-name">ind</span>
												</div>
												<div className="score-update">
													<h5>102/4</h5>
													<p className="text-muted">20.0 ov</p>
												</div>
											</div>
										</div>
										<div className="floating-text">Day-night Test, Adelaide</div>
									</div>
									<div className="image-card">
										<figure className="overlay">
											<img src="assets/images/posts/1.jpg" alt="" />
										</figure>

										<div className="image-card-content">
											<h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game</p>
										</div>
									</div>
								</div>

								<div className="card card-shadow">
									<div className="content-card card-grid">
										<figure className="w-190">
											<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
										</figure>
										<div className="content-block">
											<h3>
												<a href="#">Strength to smarts: How Smith has levelled up</a>
											</h3>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</div>
								</div>
								<div className="card card-shadow">
									<div className="content-card card-grid">
										<figure className="w-190">
											<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
										</figure>
										<div className="content-block">
											<h3>
												<a href="#">Strength to smarts: How Smith has levelled up</a>
											</h3>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</div>
								</div>

								<div className="row gutters-5">
									<div className="col-md-6">
										<div className="card card-shadow">
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card card-shadow">
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="card card-shadow">
									<OwlCarousel 
										className="editors-pick owl-theme"
										items={3}
										loop
										nav
										autoplay
										margin={10}
										dots={false}
									>
										<div className="content-card">
											<figure>
												<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
											</figure>
											<div className="content-block">
												<h3>
													<a href="#">Strength to smarts: How Smith has levelled up</a>
												</h3>
												<a href="#" className="post-meta">02 hours ago</a>
											</div>
										</div>
										<div className="content-card">
											<figure>
												<img src="assets/images/posts/thumbs/feat-2.jpg" alt="" />
											</figure>
											<div className="content-block">
												<h3>
													<a href="#">Strength to smarts: How Smith has levelled up</a>
												</h3>
												<a href="#" className="post-meta">02 hours ago</a>
											</div>
										</div>
										<div className="content-card">
											<figure>
												<img src="assets/images/posts/thumbs/feat-3.jpg" alt="" />
											</figure>
											<div className="content-block">
												<h3>
													<a href="#">Strength to smarts: How Smith has levelled up</a>
												</h3>
												<a href="#" className="post-meta">02 hours ago</a>
											</div>
										</div>
										<div className="content-card">
											<figure>
												<img src="assets/images/posts/thumbs/feat-2.jpg" alt="" />
											</figure>
											<div className="content-block">
												<h3>
													<a href="#">Strength to smarts: How Smith has levelled up</a>
												</h3>
												<a href="#" className="post-meta">02 hours ago</a>
											</div>
										</div>
									</OwlCarousel>
								</div>

								<div className="image-card mb-10">
									<figure className="overlay">
										<img src="assets/images/posts/2.jpg" alt="" />
									</figure>

									<div className="image-card-content">
										<h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
										<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game</p>
									</div>
								</div>

								<div className="card card-shadow">
									<div className="content-card card-grid">
										<figure className="w-190">
											<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
										</figure>
										<div className="content-block">
											<h3>
												<a href="#">Strength to smarts: How Smith has levelled up</a>
											</h3>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</div>
								</div>
								<div className="card card-shadow">
									<div className="content-card card-grid">
										<figure className="w-190">
											<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
										</figure>
										<div className="content-block">
											<h3>
												<a href="#">Strength to smarts: How Smith has levelled up</a>
											</h3>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</div>
								</div>
								<div className="card card-shadow">
									<div className="content-card card-grid">
										<figure className="w-190">
											<img src="assets/images/posts/thumbs/feat-1.jpg" alt="" />
										</figure>
										<div className="content-block">
											<h3>
												<a href="#">Strength to smarts: How Smith has levelled up</a>
											</h3>
											<p>It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now.</p>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</div>
								</div>

								<div className="text-center mt-30">
									<a href="#" className="cricnotch-btn btn-filled bg-success loadMore-btn"><i className="fas fa-spinner"></i>&nbsp;&nbsp;&nbsp; Load more</a>
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
								<div className="widget widget-feature-video">
									<h3 className="widget-title">Featured Videos</h3>

									<div className="card card-shadow">
										<OwlCarousel
											className="featVideo-caro owl-theme"
											items={1}
											loop
											nav
											autoplay
											margin={10}
											dots={false}
										>
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/2.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/2.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/2.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/2.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
											<div className="content-card">
												<figure>
													<img src="assets/images/posts/2.jpg" alt="" />
												</figure>
												<div className="content-block">
													<h3>
														<a href="#">Strength to smarts: How Smith has levelled up</a>
													</h3>
													<a href="#" className="post-meta">02 hours ago</a>
												</div>
											</div>
										</OwlCarousel>
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
			<Footer />
		</>
    );
}

export default HomePage;
