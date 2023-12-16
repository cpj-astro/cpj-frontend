import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Kundli from '../../components/Kundli';
import { toast } from 'react-toastify';
import { setDoc, getDoc, doc, collection, where, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../../authFiles/fbaseconfig';
import Reviews from '../../components/Reviews';

function HomePage() {
	const navigate = useNavigate();
	const [matchesData, setMatchesData] = useState([]);
    const [matchData, setMatchData] = useState([])
	const [user, setUserData] = useState([]);
	const [ads, setAds] = useState([]);
	const [currentAds, setCurrentAds] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	var accessToken = localStorage.getItem('client_token');
	const responsiveOptions = {
		0: {
		  	items: 1,
		},
		300: {
			items: 1,
		},
		600: {
		  	items: 3,
		},
		1000: {
		  	items: 4,
		},		
	};
	const apiConfig = {
		headers: {
			Authorization: "Bearer " + accessToken,
			'Content-Type': 'application/json',
		}
	};
	
	const fetchAllMatches = (id) => {
		const apiUrl = process.env.REACT_APP_DEV === 'true'
		? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/allMatches`
		: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/allMatches`;

		// Include user_id as a query parameter
		const urlWithParams = `${apiUrl}?user_id=${id}`;

		axios.get(urlWithParams)
		.then((response) => {
			if(response.data.success){
				localStorage.setItem('match_id', response.data.data[0].match_id);
				setMatchesData(response.data.data);
			}
		}).catch((error) => {
			toast.error("Oh Snap!" + error.code);
		});
	}

	const fetchUserData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            if(response.data.success){
                setUserData(response.data.data);
            }
        }).catch((error) => {
            toast.error(error.code);
        });
    }

	const fetchPrivateAds = () => {
		axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getAllPrivateAds` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getAllPrivateAds`, apiConfig)
		.then(response => setAds(response.data.data))
      	.catch(error => console.error('Error fetching ads:' + error));
    }

	useEffect(() => {
		if (ads.length > 0) {
		  // Calculate the number of slots
		  const slots = 4;
	
		  // Ensure there are enough ads to fill all slots
		  if (ads.length >= slots) {
			const uniqueAdIndices = getRandomUniqueIndices(ads.length, slots);
	
			// Update the current ads based on the selected indices
			const updatedCurrentAds = uniqueAdIndices.map(index => ads[index]);
			setCurrentAds(updatedCurrentAds);
	
			// Set up an interval to rotate through the ads every 10 seconds
			const interval = setInterval(() => {
			  const nextIndex = (currentIndex + 1) % ads.length;
			  setCurrentIndex(nextIndex);
			  const nextAds = ads.slice(nextIndex, nextIndex + slots);
			  setCurrentAds(nextAds);
			}, 10000);
	
			// Clear the interval when the component unmounts or ads change
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
		// Check if mediaFile is defined and not null
		if (mediaFile) {
		  // Extract the file extension
		  const fileExtension = mediaFile.split('.').pop().toLowerCase();
	  
		  // Define supported image and video file extensions
		  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		  const videoExtensions = ['mp4', 'webm', 'ogg'];
	  
		  // Check if the file extension corresponds to an image or video
		  if (imageExtensions.includes(fileExtension)) {
			return <img src={mediaFile} alt="Ad" />;
		  } else if (videoExtensions.includes(fileExtension)) {
			return <video src={mediaFile} autoPlay muted controls width="100%" height="auto" />;
		  }
		}
	  
		// If mediaFile is undefined or null, or the extension is not recognized, return null or handle accordingly
		return null;
	  };	  
	
	useEffect(() => {
		fetchAllMatches(user.id)
    }, [user.id])

	useEffect(() => {
		if(accessToken) {
			fetchUserData(); 
			fetchPrivateAds();
		} else {
			fetchPrivateAds();
		}
    },[])

	useEffect(() => {
		if(localStorage.getItem('match_id')){
			onSnapshot(doc(db, "matchdata", localStorage.getItem('match_id')), (doc) => {
			    setMatchData(doc.data()); 
			    console.log(doc.data())
			});
		}
    }, [localStorage.getItem('match_id')]);
    return (
		<>
			<Header/>
			<header className="header">
				<section className="header-middle">
					<div className="container">
						<OwlCarousel 
							items={4}
							margin={30}
							dots={false}
							responsive={responsiveOptions}
						>
							{matchesData && matchesData.length > 0 && matchesData.map((match, index) => {
								console.log('astrology_status:', match.astrology_status);
								console.log('razorpay_payment_id:', match.razorpay_payment_id);
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
												{match && typeof match.razorpay_payment_id === 'string' && match.razorpay_payment_id.includes('pay') ? (
													<button class="theme-button-2" onClick={() => {navigate(`/match-astrology/${match.match_id}`)}}>View Astrology</button>
												) : (
													<button class="theme-button-3" onClick={() => {navigate(`/match-astrology/${match.match_id}`)}}>Buy Astrology</button>
												)}
											</div>
											: 
											<div class="button-container">
												<button class="theme-button-1" onClick={() => {navigate(`/live-score-board/${match.match_id}`)}}>View Liveline</button>
											</div>}
										</div>
									);
								}
							)}
						</OwlCarousel>
					</div>
				</section>
			</header>
			<div id="main" className="main-container">
				<div className="container">
					<section className="d-none player-contact pt-0 pb-0">
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
										<div className="display-set">
											<a href="/profile" className='btn btn-primary text-13'>View Reports</a>
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
									<div className="card card-shadow">
										<div className="ad-slot" key={currentAds[0]?.id}>
											<h3>{currentAds[0]?.title}</h3>
											{renderMedia(currentAds[0]?.media_file)}
											{/* Add more details as needed */}
										</div>
									</div>
								</div>
								<div className="widget widget-upcoming-match">
									<div className="card card-shadow">
										<div className="ad-slot" key={currentAds[1]?.id}>
											<h3>{currentAds[1]?.title}</h3>
											{renderMedia(currentAds[1]?.media_file)}
											{/* Add more details as needed */}
										</div>
									</div>
								</div>
							</aside>
						</div>
						<div className="col-lg-6">
							{matchData && matchData.team_a ? (
								<h3 className="widget-title">Live Line Of {matchData.team_a + ' Vs ' + matchData.team_b} </h3>
							) : (
								<h3 className="widget-title">Live Line Of N/A</h3>
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
								<Reviews/>
							</div>
						</div>
						<div className="col-lg-3">
							<aside className="sidebar right-sidebar">
								<div className="widget widget-upcoming-match">
									<div className="card card-shadow">
										<div className="ad-slot" key={currentAds[2]?.id}>
											<h3>{currentAds[2]?.title}</h3>
											{renderMedia(currentAds[2]?.media_file)}
											{/* Add more details as needed */}
										</div>
									</div>
								</div>
								<div className="widget widget-upcoming-match">
									<div className="card card-shadow">
										<div className="ad-slot" key={currentAds[3]?.id}>
											<h3>{currentAds[3]?.title}</h3>
											{renderMedia(currentAds[3]?.media_file)}
											{/* Add more details as needed */}
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
