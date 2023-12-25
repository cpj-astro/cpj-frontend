import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import {
  setDoc,
  getDoc,
  doc,
  collection,
  where,
  onSnapshot,
  query,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../authFiles/fbaseconfig';
import Reviews from '../../components/Reviews';
import newsData from '../../apiResponses/news.json';

const HomePage = () => {
	const navigate = useNavigate();
	const [matchesData, setMatchesData] = useState([]);
	const [matchData, setMatchData] = useState([]);
	const [gameZop, setGameZop] = useState([]);
	const [user, setUserData] = useState([]);
	const [ads, setAds] = useState([]);
	const [currentAds, setCurrentAds] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const accessToken = localStorage.getItem('client_token');
	const maxContentLength = 100;
	const maxTitleLength = 35;
	const responsiveOptions = {
		0: { items: 1 },
		300: { items: 1 },
		600: { items: 3 },
		1000: { items: 3 },
	};

	const apiConfig = {
		headers: {
		Authorization: "Bearer " + accessToken,
		'Content-Type': 'application/json',
		},
	};

	const fetchDataFromGameZop = () => {
		const apiUrl =
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getGameZop`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getGameZop`;
		axios.get(apiUrl)
		.then((response) => {
			if (response.data.success) {
			setGameZop(response.data.data.game_link);
			}
		})
		.catch((error) => {
			toast.error("Oh Snap!" + error.code);
		});
	};

	const fetchAllMatches = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'allMatchesOnline': 'allMatchesOffline'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'allMatchesOnline': 'allMatchesOffline'}`,
		apiConfig
		)
		.then((response) => {
			if (response.data.success) {
				localStorage.setItem('match_id', response.data.data[0].match_id);
				setMatchesData(response.data.data);
			}
		})
		.catch((error) => {
			console.log(error.code);
		});
	};

	const fetchPrivateAds = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getAllPrivateAds`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getAllPrivateAds`,
		apiConfig
		)
		.then((response) => setAds(response.data.data))
		.catch((error) => console.error('Error fetching ads:' + error));
	};

	useEffect(() => {
		if (ads.length > 0) {
		const slots = 4;

		if (ads.length >= slots) {
			const uniqueAdIndices = getRandomUniqueIndices(ads.length, slots);

			const updatedCurrentAds = uniqueAdIndices.map(index => ads[index]);
			setCurrentAds(updatedCurrentAds);

			const interval = setInterval(() => {
			const nextIndex = (currentIndex + 1) % ads.length;
			setCurrentIndex(nextIndex);
			const nextAds = ads.slice(nextIndex, nextIndex + slots);
			setCurrentAds(nextAds);
			}, 20000);

			return () => clearInterval(interval);
		}
		}
	}, [ads, currentIndex]);

	const getRandomUniqueIndices = (max, count) => {
		const indices = [];
		while (indices.length < count) {
		const randomIndex = Math.floor(Math.random() * max);
		if (!indices.includes(randomIndex)) {
			indices.push(randomIndex);
		}
		}
		return indices;
	};

	const renderMedia = (mediaFile) => {
		if (mediaFile) {
		const fileExtension = mediaFile.split('.').pop().toLowerCase();
		const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		const videoExtensions = ['mp4', 'webm', 'ogg'];

		if (imageExtensions.includes(fileExtension)) {
			return <img src={mediaFile} alt="Ad" />;
		} else if (videoExtensions.includes(fileExtension)) {
			return <video src={mediaFile} muted controls width="100%" height="auto" />;
		}
		}
		return null;
	};

	useEffect(() => {
		fetchAllMatches();
		fetchDataFromGameZop();
		fetchPrivateAds();
	}, []);

	useEffect(() => {
		if (localStorage.getItem('match_id')) {
		onSnapshot(doc(db, "matchdata", localStorage.getItem('match_id')), (doc) => {
			setMatchData(doc.data());
			console.log(doc.data());
		});
		}
	}, [localStorage.getItem('match_id')]);
	
	return (
		<>
			<Header/>
			<header className="header">
				<section className="header-middle">
					<div className="row">
						<div className="col-md-2">

						</div>
						<div className="col-md-8">	
							<div className="container">
								<OwlCarousel 
									key={new Date().getTime()} 
									className='owl-theme'
									items={4}
									margin={30}
									dots={false}
									responsive={responsiveOptions}
								>
								{matchesData && matchesData.length > 0 ? matchesData.map((match, index) => {
									return (
										<div className="score-card p-0" key={index}>
											<div className="score-card-inner">
												<div className="score-card-header text-center">
													<strong>{match.match_category}</strong>
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
											</div>
											{match.astrology_status === 'enable' ?
											<div class="button-container">
												<button class="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>

												<button class={match.button_class} onClick={() => {navigate(`/match-astrology/${match.match_id}`)}}>{match.button_text}</button>
											</div>
											: 
											<div class="button-container">
												<button class="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
											</div>}
										</div>
										);
									}
								) : null}
								</OwlCarousel>
							</div>
						</div>
						<div className="col-md-2">

						</div>
					</div>
				</section>
			</header>
			<div id="main" className="main-container home-page" style={{padding:'0px'}}>
				<div className="row">
					<div className="col-md-2">

					</div>
					<div className="col-md-8">		
						<div className="container">
							<div className="row">
								<div className="col-md-8" style={{backgroundColor: '#ffffff'}}>
									{matchData && matchData.team_a ? (
										<h3 className="widget-title">Live Line Of {matchData.team_a + ' Vs ' + matchData.team_b} </h3>
									) : (
										<h3 className="widget-title">No Data</h3>
									)}
									
									<div className=''>
										<div className='tv-container'>    
											<div className="tv">
												<div className="score">
													{matchData.first_circle}
												</div>
												<div className='tv-score'>
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
											<div className='tv-line-horizontal'></div>
											<div className='tv-line-vertical'></div>
										</div> 
										{gameZop &&
											<>
												<h3 className="widget-title">Games & More</h3>
												<a href={gameZop} target='_blank'>
													<img src='assets/images/gamezop-banner.png' className='gamezop-image'/>
												</a>
											</>
										}
										<h3 className="widget-title">Cricket News</h3>
										<section className="related-news p-0">
											<div className="row">
											{newsData.status ? (
												<>
													{newsData.data.map((news) => (
														<div className="col-md-6" key={news.news_id}>
															<div className="card card-shadow p-0">
																<div className="content-card news-card">
																	<figure>
																		<img src={news.image} alt="" />
																	</figure>
																	<div className="content-block">
																		<h3>
																			<a href="#">{news.title.slice(0, maxTitleLength)}...</a>
																		</h3>
																		<div
																		dangerouslySetInnerHTML={{
																			__html: `${news.content[0].slice(0, maxContentLength)}...`,
																		}}/>
																		<a href="#" className="post-meta">02 hours ago</a>
																	</div>
																</div>
															</div>
														</div>
													))}
												</>
											) : (
												<p>No data available</p>
											)}
											</div>
										</section>
										<Reviews/>
									</div>
								</div>
								<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
									<div>
										{/* <h3 className="widget-title">Astrological Fantasy Players</h3> */}
										<img src='/assets/images/fantacy-ground.png' className='pt-15 fantasy-ground'/>
									</div>

									<aside className="sidebar right-sidebar">
										<div className="widget widget-upcoming-match">
											{currentAds[0]?.status == 1 && 
											<a href={currentAds[0]?.link} target='_blank'>
												<div className="card card-shadow">
													<div className="ad-slot" key={currentAds[0]?.id}>
														<h3>{currentAds[0]?.title}</h3>
														{renderMedia(currentAds[0]?.media_file)}
														{/* Add more details as needed */}
													</div>
												</div>
											</a>}
										</div>
										<div className="widget widget-upcoming-match">
											{currentAds[1]?.status == 1 && 
											<a href={currentAds[1]?.link} target='_blank'>
												<div className="card card-shadow">
													<div className="ad-slot" key={currentAds[1]?.id}>
														<h3>{currentAds[1]?.title}</h3>
														{renderMedia(currentAds[1]?.media_file)}
														{/* Add more details as needed */}
													</div>
												</div>
											</a>}
										</div>
										<div className="widget widget-upcoming-match">
											{currentAds[2]?.status == 1 && 
											<a href={currentAds[2]?.link} target='_blank'>
												<div className="card card-shadow">
													<div className="ad-slot" key={currentAds[2]?.id}>
														<h3>{currentAds[2]?.title}</h3>
														{renderMedia(currentAds[2]?.media_file)}
														{/* Add more details as needed */}
													</div>
												</div>
											</a>}
										</div>
										<div className="widget widget-upcoming-match">
											{currentAds[3]?.status == 1 && 
											<a href={currentAds[3]?.link} target='_blank'>
												<div className="card card-shadow">
													<div className="ad-slot" key={currentAds[3]?.id}>
														<h3>{currentAds[3]?.title}</h3>
														{renderMedia(currentAds[3]?.media_file)}
														{/* Add more details as needed */}
													</div>
												</div>
											</a>}
										</div>
									</aside>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2">
						
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default HomePage;
