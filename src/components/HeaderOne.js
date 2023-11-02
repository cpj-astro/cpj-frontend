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
			{/* {matchesData && matchesData.length == 0 &&
				<div id="preloader">
					<div id="status"><img src="/assets/images/logo-h.png" alt="logo" /></div>
				</div> 
			} */}
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

				<section className="main-header">
					<div className="container">
						<nav className="navbar">
							<div className="nav-menu">
								<button className="mobile-nav-toggler"><i className="fas fa-bars"></i></button>
								<ul>
									<li><a href="#">Home</a></li>
									<li className="has-menu-child">
										<a href="#">Features</a>
										<ul className="mega-menu mega-full mega-content-box">
											<li>
												<div className="row align-items-center">
													<div className="col-md-6">
														<figure>
															<img src="/assets/images/posts/2.jpg" alt="" />
														</figure>
													</div>
													<div className="col-md-6">
														<div className="content-block">
															<h3>
																<a href="#">Strength to smarts: How Smith has levelled up</a>
															</h3>
															<a href="#" className="post-meta">02 hours ago</a>
															<p>
																It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now. Lorem ipsum dolor sit amet consectetur, adipisicing
																elit. Mollitia ipsum dolor ducimus cupiditate eaque natus quidem commodi consequuntur? Qui aperiam dolorem veritatis est magnam, ea fugiat repellat et
																laboriosam omnis?
															</p>
															<a href="#" className="cricnotch-btn btn-filled bg-success">Learn more</a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">The Team</a>
									</li>
									<li className="has-menu-child">
										<a href="#">News</a>

										<ul className="mega-menu mega-full mega-content-box">
											<li>
												<div className="row align-items-center">
													<div className="col-md-4">
														<div className="image-card">
															<figure className="overlay">
																<img src="/assets/images/posts/2.jpg" alt="" />
															</figure>

															<div className="image-card-content">
																<h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
																<p>
																	It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
																</p>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="image-card">
															<figure className="overlay">
																<img src="/assets/images/posts/2.jpg" alt="" />
															</figure>

															<div className="image-card-content">
																<h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
																<p>
																	It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
																</p>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="image-card">
															<figure className="overlay">
																<img src="/assets/images/posts/2.jpg" alt="" />
															</figure>

															<div className="image-card-content">
																<h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
																<p>
																	It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
																</p>
															</div>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li className="has-menu-child has-submenu">
										<a href="#">Shop</a>
										<ul className="sub-menu">
											<li><a href="#">Item 1</a></li>
											<li><a href="#">Item 2</a></li>
											<li><a href="#">Item 3</a></li>
											<li><a href="#">Item 4</a></li>
											<li><a href="#">Item 5</a></li>
										</ul>
									</li>
								</ul>
							</div>
							<div className="header-search">
								<form action="homepage.html">
									<input type="text" placeholder="Search here" required />
									<button type="submit"><i className="fas fa-search"></i></button>
								</form>
							</div>
						</nav>
					</div>
				</section>
			</header>
		</>
    );
}

export default HeaderOne;
