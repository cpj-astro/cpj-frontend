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
import MatchCard from '../../components/MatchCard';

const HomePage = () => {
	const navigate = useNavigate();
	const [matchesData, setMatchesData] = useState([]);
	const [matchData, setMatchData] = useState([]);
	const [gameZop, setGameZop] = useState([]);
	const [upcomingMatches, setUpcomingMatches] = useState([]);
	const [recentMatches, setRecentMatches] = useState([]);
	const [liveMatches, setLiveMatches] = useState([]);
	const [ads, setAds] = useState([]);
	const [newsData, setNewsData] = useState([]);
	const [currentAds, setCurrentAds] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [activeTab, setActiveTab] = useState('home');
	const accessToken = localStorage.getItem('client_token');
	const maxTitleLength = 35;
	const [newsCount, setNewsCount] = useState(5);

    const newsloadMore = () => {
        setNewsCount((prevCount) => prevCount + 5);
    };

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
				setGameZop(response.data.data);
			}
		})
		.catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
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
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
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
		.catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
		});
	};
	
	const fetchUpcomingList = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'upcomingMatches': 'offlineUpcomingMatches'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'upcomingMatches': 'offlineUpcomingMatches'}`,
		apiConfig
		)
		.then((response) => setUpcomingMatches(response.data.data))
		.catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
		});
	};
	
	const fetchRecentList = () => {
		axios.get(
			process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'recentMatches': 'offlineRecentMatches'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'recentMatches': 'offlineRecentMatches'}`,
			apiConfig
			)
			.then((response) => {
				setRecentMatches(response.data.data)
			})
			.catch((error) => {
				if(error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
                    toast.error('Session Expired!, Please Re-login.')
                    navigate('/sign-in');
                } else {
                    console.log(error);
                }
			});
	};
	
	const fetchLiveList = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'liveMatches': 'offlineLiveMatches'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'liveMatches': 'offlineLiveMatches'}`,
		apiConfig
		)
		.then((response) => setLiveMatches(response.data.data))
		.catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
		});
	};

	const fetchNews = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/news`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/news`,
		apiConfig
		)
		.then((response) => {
			setNewsData(response.data.data);
		})
		.catch((error) => {
			if(error.response.data.status_code == 401){
				localStorage.removeItem('client_token');
				toast.error('Session Expired!, Please Re-login.')
				navigate('/sign-in');
			} else {
				console.log(error);
			}
		});
	}

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
	
    const handleTabChange = (tab) => {
		setActiveTab(tab);
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

	useEffect(() => {
		if (localStorage.getItem('match_id')) {
		onSnapshot(doc(db, "matchdata", localStorage.getItem('match_id')), (doc) => {
			setMatchData(doc.data());
		});
		}
	}, [localStorage.getItem('match_id')]);
	
	useEffect(() => {
		fetchAllMatches();
		fetchLiveList();
		fetchUpcomingList();
		fetchRecentList();
		fetchNews();
		fetchDataFromGameZop();
		fetchPrivateAds();
	}, []);

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
									className="editors-pick owl-theme"
									items={4}
									margin={30}
									dots={false}
									// autoPlay
									responsive={responsiveOptions}
								>
								{matchesData && matchesData.length > 0 ? matchesData.map((m, i) => {
									return (
											<MatchCard match={m} index={i}/>
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
			<div id="main" className="main-container home-page p-0">
				<div className="row">
					<div className="col-md-2">

					</div>
					<div className="col-md-8 bg-white">	
						<div className="widget">
							<div className="card p-0">
								<div className="checkout-form p-0">
									<div className="row">
										<div className='col-md-12'>
											<aside className="sidebar right-sidebar">
												<div className="widget widget-upcoming-match">
													<ul className="nav nav-tabs custom-nav">
														<li className={activeTab === 'home' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => handleTabChange('home')}>Home</a>
														</li>
														<li className={activeTab === 'live-matches' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => handleTabChange('live-matches')}>Live</a>
														</li>
														<li className={activeTab === 'upcoming-matches' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => handleTabChange('upcoming-matches')}>Upcoming</a>
														</li>
														<li className={activeTab === 'recent-matches' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => handleTabChange('recent-matches')}>Finished</a>
														</li>
													</ul>
													<div className="mt-2 tab-content">
														<div id="home" className={`tab-pane fade in ${activeTab === 'home' ? 'show active' : ''}`}>
															<div className="container">
																<div className="row">
																	<div className="col-md-8" style={{backgroundColor: '#ffffff'}}>
																		{matchData && matchData.team_a && (
																			<>
																				<h3 className="widget-title">Live Line Of {matchData.team_a_short + ' (vs) ' + matchData.team_b_short}</h3>
																				<div className='tv-container'>    
																					<div className="tv">
																						<div className="score">
																							{matchData && matchData.first_circle ? matchData.first_circle : 'No Data'}
																						</div>
																						<div className='tv-score'>
																							<div className="score-card-body">
																								<div className="country-info">
																									<div className="text-center">
																										<span className="country-name">{matchData && matchData.team_a_short ? matchData.team_a_short : 'Team A'}</span>
																										<span>{matchData && matchData.team_a_scores ? matchData.team_a_scores : '00-0'}</span> &nbsp;
																										<span className="text-muted">{matchData && matchData.team_a_over ? matchData.team_a_over : '0.0'} ov.</span>
																									</div>
																								</div>
																								<div className="country-info">
																									<div className="text-center">
																										<span className="country-name">{matchData && matchData.team_b_short ? matchData.team_b_short : 'Team B'}</span>
																										<span>{matchData && matchData.team_b_scores ? matchData.team_b_scores : '00-0'}</span> &nbsp;
																										<span className="text-muted">{matchData && matchData.team_b_over ? matchData.team_b_over : '0.0'} ov.</span>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div> 
																			</>
																		)}
																		{gameZop.game_link && gameZop.status &&
																			<>
																				<h3 className="widget-title">Games & More</h3>
																				<a href={gameZop.game_link} target='_blank'>
																					<img src='assets/images/gamezop-banner.png' className='gamezop-image'/>
																				</a>
																			</>
																		}
																		<h3 className="widget-title">Cricket News</h3>
																		<section className="related-news p-0">
																		{(newsData && newsData.length > 0) && (
																			<div className="row">
																				{newsData.slice(0, newsCount).map((news, index) => (
																					<div className="col-md-6" key={news.news_id}>
																						<div className="card card-shadow p-0">
																							<div className="content-card news-card">
																								<figure>
																									<img src={process.env.REACT_APP_IMG_FIX+news.image} alt="" />
																								</figure>
																								<div className="content-block">
																									<h3>
																										<a href={`/news-details/${news.news_id}/${news.title}/${news.pub_date}`}>{news.title.slice(0, maxTitleLength)}...</a>
																									</h3>
																									<span className="post-meta">{news.pub_date}</span>
																								</div>
																							</div>
																						</div>
																					</div>
																				))}
																			</div>
																		)}
																		{newsData.length > newsCount && (
																			<div className="text-center mb-10">
																				<button className="cricnotch-btn btn-filled loadMore-btn" onClick={newsloadMore}><i className="fas fa-spinner"></i>&nbsp;&nbsp;&nbsp; Load more</button>
																			</div>
																		)}
																		</section>
																		<Reviews/>
																	</div>
																	<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
																		<div>
																			<img src='/assets/images/fantacy-ground.png' className='mt-30 fantasy-ground'/>
																		</div>

																		<aside className="sidebar right-sidebar">
																			<div className="widget widget-upcoming-match">
																				{currentAds[0]?.status == 1 && 
																				<a href={currentAds[0]?.link} target='_blank'>
																					<div className="card card-shadow">
																						<div className="ad-slot" key={currentAds[0]?.id}>
																							<h3>{currentAds[0]?.title}</h3>
																							{renderMedia(currentAds[0]?.media_file)}
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
														<div id="live-matches" className={`tab-pane fade ${activeTab === 'live-matches' ? 'show active' : ''}`}>
															<div className='container'>
																<div className='row'>
																	<div className='col-md-8'>
																		<h3 className="widget-title">Live Matches</h3>
																		{liveMatches && liveMatches.length > 0 && liveMatches.map((m, i) => (
																			<MatchCard match={m} index={i}/>
																		))}
																		{liveMatches && liveMatches.length == 0 && 
																		<div>No Live Matches</div>}
																	</div>
																	<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
																		<div>
																			{/* <h3 className="widget-title">Astrological Fantasy Players</h3> */}
																			<img src='/assets/images/fantacy-ground.png' className='mt-30 fantasy-ground'/>
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
														<div id="upcoming-matches" className={`tab-pane fade ${activeTab === 'upcoming-matches' ? 'show active' : ''}`}>
															<div className='container'>
																<div className='row'>
																	<div className='col-md-8'>
																		<h3 className="widget-title">Upcoming Matches</h3>
																		{upcomingMatches && upcomingMatches.length > 0 && upcomingMatches.map((m, i) => (
																			<MatchCard match={m} index={i}/>
																		))}
																		{upcomingMatches && upcomingMatches.length == 0 && 
																		<div>No Upcoming Matches</div>}
																	</div>
																	<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
																		<div>
																			{/* <h3 className="widget-title">Astrological Fantasy Players</h3> */}
																			<img src='/assets/images/fantacy-ground.png' className='mt-30 fantasy-ground'/>
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
														<div id="recent-matches" className={`tab-pane fade ${activeTab === 'recent-matches' ? 'show active' : ''}`}>
															<div className='container'>
																<div className='row'>
																	<div className='col-md-8'>
																		<h3 className="widget-title">Recent Matches</h3>
																		{recentMatches && recentMatches.length > 0 && recentMatches.map((m, i) => (
																			<MatchCard match={m} index={i}/>
																		))}
																		{recentMatches && recentMatches.length == 0 && 
																		<div>No Recent Matches</div>}
																	</div>
																	<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
																		<div>
																			<img src='/assets/images/fantacy-ground.png' className='mt-30 fantasy-ground'/>
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
													</div>
												</div>
											</aside>
										</div>
									</div>
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
