import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Header from '../../components/Header';
import {
  setDoc,
  getDoc,
  doc,
  collection,
  where,
  onSnapshot,
  query,
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../../authFiles/fbaseconfig';
import Reviews from '../../components/Reviews';
import MatchCard from '../../components/MatchCard';
import MatchLoader from '../../components/MatchLoader';
import moment from 'moment';
import IntroCard from '../../components/IntroCard';
import Feedback from '../Feedback';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import MatchCardV2 from '../../components/MatchCardV2';

export default function HomePageV2() {
  const [carouselKey, setCarouselKey] = useState('');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
	const [matchPayIds, setMatchPayIds] = useState([]);
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
		.then((response) => {
			setAds(response.data.data)
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
	
	
	let matchDataRef = collection(db, "matchdata");
	
	useEffect(() => {
    const userId = localStorage.getItem("user_data");
		
		const fetchMatchDataIds = async () => {
			try {
				const userSubscribeMatchRef = doc(db, "user_subscribe_match", userId);
				const userSubscribeMatchDoc = await getDoc(userSubscribeMatchRef);
        if(userSubscribeMatchDoc.exists()) {
          const matchDataPaymentIds = userSubscribeMatchDoc.data().match_id || [];
          
          if (matchDataPaymentIds.length > 0) {
            setInitialLoadComplete(true);
            setMatchPayIds(matchPayIds);
          } 
        }
			} catch (error) {
        console.error("Error fetching match data IDs:", error);
			}
		};
    
		if(userId) {
      fetchMatchDataIds();
		} else {
      onSnapshot(matchDataRef, (snapshot) => {
        const allMatches = [];
				snapshot.forEach((doc) => {
          let data = doc.data();
					if(data && (data.result == "" || data.result == null)) {
            data.dateLive = moment().format("DD-MMM, HH:mm A")
						data.match_category = 'live';
						data.is_paid = false;
						allMatches.push(data);
					}
				});
				if(allMatches && allMatches.length > 0) {
					localStorage.setItem('match_id', allMatches[0].match_id);
				}
				setLiveMatches(allMatches);
			}, (error) => {
        console.error("Error fetching data:", error);
			});
		}	
	}, []);
  
	useEffect(() => {
    setLoader(true);
		const userId = localStorage.getItem("user_data");
		if(userId) {
      onSnapshot(matchDataRef, (snapshot) => {
        const allMatches = [];
				snapshot.forEach((doc) => {
          let data = doc.data();
					if(data && (data.result == "" || data.result == null)) {
            if(matchPayIds.includes(data.match_id)) {
              data.is_paid = true;
						} else {
              data.is_paid = false;
						}
						data.dateLive = moment().format("DD-MMM, HH:mm A")
						data.match_category = 'live';
						allMatches.push(data);
					}
				});
				if(allMatches && allMatches.length > 0) {
          localStorage.setItem('match_id', allMatches[0].match_id);
				}
				setLiveMatches(allMatches);
				setLoader(false);
			}, (error) => {
        console.error("Error fetching data:", error);
			});
		};
  }, [initialLoadComplete]);
	
  useEffect(() => {
    // Update the carousel key whenever liveMatches or loader changes
    setCarouselKey(JSON.stringify(liveMatches));
  }, [liveMatches]);

  useEffect(() => {
    fetchUpcomingList();
    fetchRecentList();
    fetchNews();
    fetchDataFromGameZop();
    fetchPrivateAds();
  }, []);

  return (
    <div>
      <HeaderV2/>
      <main>
        <section className="cp__hero-sec">
          <div className="container">
            <div className="cp__mobile-tab">
              <div className="nav nav-tabs mb-3 d-lg-none d-lg-block" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                <button className="nav-link" id="nav-live-tab" data-bs-toggle="tab" data-bs-target="#nav-live" type="button" role="tab" aria-controls="nav-live" aria-selected="false">Live</button>
                <button className="nav-link" id="nav-upcoming-tab" data-bs-toggle="tab" data-bs-target="#nav-upcoming" type="button" role="tab" aria-controls="nav-upcoming" aria-selected="false">Upcoming</button>
                <button className="nav-link" id="nav-finished-tab" data-bs-toggle="tab" data-bs-target="#nav-finished" type="button" role="tab" aria-controls="nav-finished" aria-selected="false">Finished</button>
                <button className="nav-link" id="nav-news-tab" data-bs-toggle="tab" data-bs-target="#nav-news" type="button" role="tab" aria-controls="nav-news" aria-selected="false">News</button>
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-between cp__hero-wrap">
              <div className="col-lg-6 col-sm-12 cp__hero-content" data-aos="fade-right">
                <h2>Enroll Today and Transform Your <span className="cp__txt-green">Cricket Game</span></h2>
                <h1>Maximize your winning chances with cricket astrology predictions. Unlock star-guided insights to boost your game strategy and dominate the field</h1>
                <a href="#" className="cp__fill-btn">Get Started<img src="assets/images/arrow-right-black.svg" alt="logo" className="cp__black" />
                  <img src="assets/images/arrow-right-green.svg" alt="logo" className="cp__green" />
                </a>
              </div>
              <div className="col-lg-6 col-sm-12 cp__hero-cardslider" data-aos="fade-left">
                <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  slidesPerView={1}
                >
                  {(liveMatches && liveMatches.length > 0 && !loader) && (
                    <>
                      {liveMatches.map((m, i) => (
                        <SwiperSlide>
                          <MatchCardV2 key={m.match_id} match={m} index={i}/>
                        </SwiperSlide>
                      ))}
                    </>
                  )}

                  {(upcomingMatches && upcomingMatches.length > 0 && !matchLoader) && (
                    <>
                      {upcomingMatches.slice(0, 5).map((m, i) => (
                        <SwiperSlide>
                          <MatchCardV2 key={m.match_id} match={m} index={i}/>
                        </SwiperSlide>
                      ))}
                    </>
                  )}

                  {(recentMatches && recentMatches.length > 0 && !matchLoader) && (
                    <>
                      {recentMatches.slice(0, 5).map((m, i) => (
                        <SwiperSlide>
                          <MatchCardV2 key={m.match_id} match={m} index={i}/>
                        </SwiperSlide>
                      ))}
                    </>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="cp__herobg-img">
            <img src="assets/images/herotop.png" alt="logo" />
          </div>
        </section>
        <section className="cp__coverview-sec">
          <div className="container">
            <h2 className="cp__sec-title" data-aos="zoom-in">Company Overview</h2>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="col-lg-5 col-sm-12">
                <div className="cp__img-block" data-aos="zoom-in">
                  <img src="assets/images/moon-inverse.png" alt="logo" className="cp__moon-inverse" />
                  <img src="assets/images/moon-sign.png" alt="logo" className="cp__moon-sign" />
                </div>
              </div>
              <div className="col-lg-7 col-sm-12" data-aos="fade-left">
                <div className="cp__top-view">
                  <h3>Who Are We?</h3>
                  <ul>
                    <li className="cp__before-dot">CricketPanditji.com: Where Cricket Comes Alive!</li>
                    <li className="cp__before-dot">Immerse yourself in live matches with faster-than-broadcast updates.</li>
                    <li className="cp__before-dot">Unleash cricket astrology for insights and strategic advice.</li>
                    <li className="cp__before-dot">Elevate your fantasy cricket game with tailored teams.</li>
                    <li className="cp__before-dot">Manage your profile for a personalized cricket journey.</li>
                    <li className="cp__before-dot">Join our community for an unmatched cricket experience!</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="cp__bottom-view d-flex  justify-content-between cp__comover-wrap" data-aos="zoom-in">
              <div className="cp__left-view cp__desc-list d-flex">
                <div className="cp__img">
                  <img src="assets/images/ms.png" alt="ms" />
                </div>
                <div className="cp__desc">
                  <h4>Cricket Panditji</h4>
                  <span>Cricket Astrology | Fantasy Players Astrology</span>
                  <ul>
                    <li className="cp__before-dot">क्या आप जानते है की आपका क्रिकेट मैच के प्रति ज्योतिष क्या होगा ?</li>
                    <li className="cp__before-dot">क्या आपको जानना है की कोनसा खिलाड़ी अच्छा खेलेगा ?</li>
                    <li className="cp__before-dot">आपकी कुंडली क्या कहती है क्रिकेट मैच के बारे में ?</li>
                    <li className="cp__before-dot">क्रिकेट पण्डितजी आपको देगा आपकी कुंडली के आधार पर क्रिकेट मैच का ज्योतिष !</li>
                  </ul>
                  <p>फ्री लाइव लाइन | मैच रिपोर्ट्स | Fantasy रिपोर्ट्स</p>
                </div>
              </div>
              <div className="cp__right-view cp__desc-list d-flex">
                <div className="cp__img">
                  <img src="assets/images/ms.png" alt="ms" />
                </div>
                <div className="cp__desc">
                  <h4>Cricket Panditji</h4>
                  <span>Cricket Astrology | Fantasy Players Astrology</span>
                  <ul>
                    <li className="cp__before-dot">Do you know what the astrology will be for your cricket match?</li>
                    <li className="cp__before-dot">Do you want to know which player will play well?</li>
                    <li className="cp__before-dot">What does your horoscope say about the cricket match?</li>
                    <li className="cp__before-dot">Cricket Panditji will give you astrology of cricket match based on
                      your horoscope!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cp__about-sec">
          <div className="container">
            <h2 className="cp__sec-title" data-aos="zoom-in">About Us</h2>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="col-lg-6 col-sm-12 cp__about-img">
                <div className="cp__img-block" data-aos="zoom-in">
                  <img src="assets/images/client.png" alt="logo" />
                </div>
                <div className="cp__exp-desc" data-aos="zoom-in">
                  <span>8</span>
                  <span>Years of experience</span>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12" data-aos="fade-left">
                <div className="cp__img-block">
                  <img src="assets/images/esoteric.png" alt="logo" className="cp__start-img" />
                </div>
                <h3>Expertise and Experience</h3>
                <p>Highlighting the expertise and experience of astrology pandits in the field, including their qualifications, specializations, and years of practice.</p>
                <ul>
                  <li className="cp__before-dot">Aries individuals are known for their boldness, energy, and competitiveness.</li>
                  <li className="cp__before-dot">Taureans are known for their stability, determination, and practicality.</li>
                </ul>
                <div className="cp__about-btn">
                  <a href="#" className="cp__fill-btn">Get Started<img src="assets/images/arrow-right-black.svg" alt="logo" className="cp__black" />
                    <img src="assets/images/arrow-right-green.svg" alt="logo" className="cp__green" /></a>
                  <a href="#"> <img src="assets/images/phone-call.png" alt="logo" />123 456 7890</a>
                </div>
              </div>
            </div>
          </div>
          <div className="cp__aboutbg-img">
            <img src="assets/images/about-us-bg.png" alt="about" />
          </div>
        </section>

        <section className="cp__feature-sec">
          <div className="container">
            <h2 className="cp__sec-title" data-aos="zoom-in">Features</h2>
            <div className="d-flex align-items-center flex-wrap">
              <div className="col-lg-6 col-sm-12">
                <ul className="nav nav-pills flex-column nav-pills align-items-end" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation" data-aos="fade-right">
                    <button className="nav-link text-primary fw-semibold active position-relative d-flex align-items-center" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                  <li className="nav-item" role="presentation" data-aos="fade-right">
                    <button className="nav-link text-primary fw-semibold position-relative d-flex align-items-center" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                  <li className="nav-item" role="presentation" data-aos="fade-right">
                    <button className="nav-link text-primary fw-semibold position-relative d-flex align-items-center" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="tab-content text-end" id="pills-tabContent" data-aos="fade-left">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <img src="assets/images/feature.png" alt="ms" />
                  </div>
                  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <img src="assets/images/feature.png" alt="ms" />
                  </div>
                  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <img src="assets/images/feature.png" alt="ms" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cp__buypro-sec">
          <div className="container">
            <h2 className="cp__sec-title" data-aos="zoom-in">Buy Our Reports</h2>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="col-lg-6 col-sm-12 cp__buy-content" data-aos="fade-left">
                <p>Brief overview of how astrology can be applied to cricket and the benefits of astrology cricket reports.</p>
                <ul>
                  <li className="cp__before-dot">Match Prediction Reports</li>
                  <li className="cp__before-dot">Forecasts for cricket tournaments and series based on astrological trends</li>
                  <li className="cp__before-dot">Team Analysis Reports</li>
                  <li className="cp__before-dot">Tournament Forecasts</li>
                  <li className="cp__before-dot">Player Performance Reports</li>
                </ul>
              </div>
              <div className="col-lg-6 col-sm-12" data-aos="fade-right">
                <div className="cp__img-block">
                  <img src="assets/images/report.png" alt="logo" />
                </div>
              </div>
            </div>
          </div>
          <div className="cp__buybg-img">
            <img src="assets/images/star.png" alt="logo" />
          </div>
        </section>
        
        <section className="cp__faq-sec">
          <div className="container">
            <h2 className="cp__sec-title" data-aos="zoom-in">Frequently Asked Questions</h2>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item" data-aos="fade-up">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    How does astrology impact cricket matches?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Astrologers might analyze the horoscopes or birth charts of cricket teams to predict their overall performance in a particular match, tournament, or season.
                  </div>
                </div>
              </div>
              <div className="accordion-item" data-aos="fade-up">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    How accurate are astrological predictions for cricket matches?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Astrologers might analyze the horoscopes or birth charts of cricket teams to predict their overall performance in a particular match, tournament, or season.
                  </div>
                </div>
              </div>
              <div className="accordion-item" data-aos="fade-up">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    How does astrology impact cricket matches?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Astrologers might analyze the horoscopes or birth charts of cricket teams to predict their overall performance in a particular match, tournament, or season.
                  </div>
                </div>
              </div>
              <div className="accordion-item" data-aos="fade-up">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    How does astrology impact cricket matches?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Astrologers might analyze the horoscopes or birth charts of cricket teams to predict their overall performance in a particular match, tournament, or season.
                  </div>
                </div>
              </div>
              <div className="accordion-item" data-aos="fade-up">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    How does astrology impact cricket matches?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Astrologers might analyze the horoscopes or birth charts of cricket teams to predict their overall performance in a particular match, tournament, or season.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cp__faqbg-img">
            <img src="assets/images/overview-bg.png" alt="logo" />
          </div>
        </section>
      </main>
      <FooterV2/>   
    </div>
  )
}
