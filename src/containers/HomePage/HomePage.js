import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
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
import MatchLoader from '../../components/MatchLoader';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import IntroCard from '../../components/IntroCard';
import Feedback from '../Feedback';

const HomePage = () => {
	const [upcomingMatches, setUpcomingMatches] = useState([]);
	const [recentMatches, setRecentMatches] = useState([]);
	const [liveMatches, setLiveMatches] = useState([]);
	const [loader, setLoader] = useState(false)
	const [matchLoader, setMatchLoader] = useState(false)
    const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [matchData, setMatchData] = useState([]);
	const [gameZop, setGameZop] = useState([]);
	const [ads, setAds] = useState([]);
	const [newsData, setNewsData] = useState([]);
	const [currentAds, setCurrentAds] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [activeTab, setActiveTab] = useState('home');
	const accessToken = localStorage.getItem('client_token');
	const maxTitleLength = 30;
	const [newsCount, setNewsCount] = useState(6);
    const [panditData, setPanditData] = useState([]);
	const handleCloseModal = () => setShowModal(false);
	
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
				localStorage.removeItem('user_data');
				
				navigate('/');
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
				localStorage.removeItem('user_data');
				
				navigate('/');
			} else {
				console.log(error);
			}
		});
		setLoader(false)
	};
	
	const fetchUpcomingList = () => {
		setMatchLoader(true);
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'upcomingMatches': 'offlineUpcomingMatches'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'upcomingMatches': 'offlineUpcomingMatches'}`,
			apiConfig
		)
		.then((response) => {
			setMatchLoader(false); 
			setUpcomingMatches(response.data.data);
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
	
	const fetchRecentList = () => {
		setMatchLoader(true);
		axios.get(
			process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'recentMatches': 'offlineRecentMatches'}`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'recentMatches': 'offlineRecentMatches'}`,
			apiConfig
		)
		.then((response) => {
			setMatchLoader(false);
			setRecentMatches(response.data.data)
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
				localStorage.removeItem('user_data');
				
				navigate('/');
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
		fetchUpcomingList();
		fetchRecentList();
		fetchNews();
		fetchDataFromGameZop();
		fetchPrivateAds();
	}, []);
	
	const matchDataRef = collection(db, "matchdata");

	useEffect(() => {
		setLoader(true);
		onSnapshot(matchDataRef, (snapshot) => {
			const allMatches = [];
			snapshot.forEach((doc) => {
				let data = doc.data();
				if(data && data.result == "") {
					data.dateLive = moment().format("DD-MMM, HH:mm A")
					data.match_category = 'live';
					data.series_name = data.match_type;
					allMatches.push(data);
				}
			});
			if(allMatches && allMatches.length > 0) {
				localStorage.setItem('match_id', allMatches[0].match_id);
			}
			console.log('match live', allMatches);
			setLiveMatches(allMatches);
			setLoader(false);
		}, (error) => {
			console.error("Error fetching data:", error);
		});
    }, []);
	
	const fetchPanditsList = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/pandits` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/pandits`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setPanditData(response.data.data);
            }
        }).catch((error) => {
            setLoader(false);
			console.error(error);
        });
    }
	
	useEffect(() => {
        fetchPanditsList();
		// Check if the 'visited' flag is set in sessionStorage
		const hasVisited = sessionStorage.getItem('visited');
	
		if (!hasVisited) {
		  // Show the modal if the user hasn't visited before
		  setShowModal(true);
		  // Set the 'visited' flag in sessionStorage
		  sessionStorage.setItem('visited', 'true');
		}
	}, []);
	
	return (
		<>
			<Header/>
			{/* <Modal show={showModal} scrollable={true} size="lg" onHide={handleCloseModal}  style={{paddingLeft: '0px'}}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h1 className='widget-title-intro'>Welcome to <a href='/'>CricketPanditji.com</a> – Where Astrology meets Cricket!</h1>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<IntroCard />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Close
					</Button>
				</Modal.Footer>
            </Modal> */}
			<header className="header">
				<section className="header-middle" style={{paddingBottom: '0px'}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12">	
								<OwlCarousel 
									items={4} 
									dots={true} 
									arrows={false} 
									key={new Date().getTime()}
									margin={30}
									responsive={responsiveOptions}
									className="editors-pick owl-theme"
								>
								{(liveMatches && liveMatches.length > 0 && !loader) && (
									<>
										{liveMatches.map((m, i) => (
											<MatchCard match={m} index={i}/>
										))}
									</>
								)}
								
								{(upcomingMatches && upcomingMatches.length > 0 && !matchLoader) ? (
									<>
										{upcomingMatches.slice(0, 5).map((m, i) => (
											<MatchCard match={m} index={i}/>
										))}
									</>
								) : 
									<MatchLoader/>
								}
								{(recentMatches && recentMatches.length > 0 && !matchLoader) ? (
									<>
										{recentMatches.slice(0, 5).map((m, i) => (
											<MatchCard match={m} index={i}/>
										))}
									</>
								) : 
									<MatchLoader/>
								}
								</OwlCarousel>
							</div>
						</div>
					</div>
				</section>
			</header>
			<div className='container'>
				<div className="row">
					<div className="col-md-12 bg-white">	
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
															<a onClick={() => { handleTabChange('upcoming-matches'); fetchUpcomingList();}}>Upcoming</a>
														</li>
														<li className={activeTab === 'recent-matches' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => { handleTabChange('recent-matches'); fetchRecentList();}}>Finished</a>
														</li>
														<li className={activeTab === 'cricket-news' ? 'cursor-pointer active' : 'cursor-pointer'}>
															<a onClick={() => { handleTabChange('cricket-news');}}>News</a>
														</li>
													</ul>
													<div className="mt-2 tab-content">
														<div id="home" className={`tab-pane fade in ${activeTab === 'home' ? 'show active' : ''}`}>
															<div className="row">
																<div className="col-md-8" style={{backgroundColor: '#ffffff'}}>
																	<div>
																		<h3 className="widget-title">Who we are?</h3>
																		<IntroCard />
																	</div>
																	<div>
																		<h3 className="widget-title">Cricket Panditji (Astrology & Fantasy Reports)</h3>
																		<img src='assets/images/banner-1.jpg' className='banner-1-image'/>
																	</div>

																	<section className="player-contact pt-0 pb-0">
																		<h3 className="widget-title">Cricket Panditji (Pandits)</h3>
																		<OwlCarousel autoplay={true} autoplayTimeout={3000} loop={true} className='owl-theme' dots={true} arrows={false} items={1} key={new Date().getTime()} >
																			{(panditData && panditData.length > 0) && panditData.map((pandit, index) => (
																				<div class="pandit-container">
																					<div class="pandit-card">
																						<div class="pandit-header">
																							<img src={`/assets/images/pandits/${pandit.avatar_image}`} alt={pandit.name} class="pandit-avatar" />
																							<div class="pandit-details">
																								<div class="pandit-name">
																									{pandit.name}
																								</div>
																								<div class="pandit-status">
																								Experience : {pandit.experience == 1 ? pandit.experience + ' Year' : pandit.experience + ' Years'}
																								</div>
																								<div class="pandit-status">
																								Astrology: ₹ {pandit.match_astrology_price}
																								</div>
																							</div>
																						</div>
																						<h4 className='mt-4'>Rating : 
																							{Array.from({ length: pandit.rating }, (_, index) => (
																								<i key={index} className="fa fa-star text-warning ml-1"></i>
																							))} ({pandit.rating} out of 5 stars)
																						</h4>
																						<div class="pandit-quote">
																							{pandit.description}
																						</div>
																					</div>
																				</div>
																			))}
																		</OwlCarousel>
																	</section>
																	
																	<div>
																		<h3 className="widget-title">Buy Our Reports</h3>
																		<img src='assets/images/report.png' className='report-1-image'/>
																	</div>

																	{gameZop.game_link && gameZop.status &&
																		<>
																			<h3 className="widget-title">Games & More</h3>
																			<a href={gameZop.game_link} target='_blank'>
																				<img src='assets/images/gamezop-banner.png' className='gamezop-image'/>
																			</a>
																		</>
																	}

																	<div>
																		<h3 className="widget-title">Janam Chart</h3>
																		<img src='assets/images/banner-2.png' className='banner-1-image'/>
																	</div>

																	<h3 className="widget-title">Reviews & Ratings</h3>
																	
																	<Feedback/>
																	
																	<Reviews/>
																</div>
																<div className="col-md-4" style={{backgroundColor: '#ffffff'}}>
																	<div>
																		<img src='/assets/images/play-banner-1.jpg' className='mt-30 fantasy-ground'/>
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
														<div id="live-matches" className={`tab-pane fade ${activeTab === 'live-matches' ? 'show active' : ''}`}>
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
														<div id="upcoming-matches" className={`tab-pane fade ${activeTab === 'upcoming-matches' ? 'show active' : ''}`}>
															<div className='row'>
																<div className='col-md-8'>
																	<h3 className="widget-title">Upcoming Matches</h3>
																	{!matchLoader && upcomingMatches && upcomingMatches.length > 0 ? upcomingMatches.map((m, i) => (
																		<MatchCard match={m} index={i}/>
																	)) : 
																		<>
																			<MatchLoader/>
																			<MatchLoader/>
																			<MatchLoader/>
																		</>
																	}
																	{upcomingMatches && upcomingMatches.length == 0 && 
																	<div>No Upcoming Matches</div>}
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
														<div id="recent-matches" className={`tab-pane fade ${activeTab === 'recent-matches' ? 'show active' : ''}`}>
															<div className='row'>
																<div className='col-md-8'>
																	<h3 className="widget-title">Recent Matches</h3>
																	{!matchLoader && recentMatches && recentMatches.length > 0 ? recentMatches.map((m, i) => (
																		<MatchCard match={m} index={i}/>
																	)) : 
																		<>
																			<MatchLoader/>
																			<MatchLoader/>
																			<MatchLoader/>
																		</>
																	}
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
														<div id="cricket-news" className={`tab-pane fade ${activeTab === 'cricket-news' ? 'show active' : ''}`}>
															<div className='row'>
																<div className='col-md-8'>
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
											</aside>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default HomePage;
