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
import MobileTabs from '../../components/MobileTabs';

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
  const [faqs, setFaqs] = useState([]);
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

	const fetchFaqs = () => {
		axios.get(
		process.env.REACT_APP_DEV === 'true'
			? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getAllFaqs`
			: `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getAllFaqs`,
		apiConfig
		)
		.then((response) => {
			setFaqs(response.data.faqs);
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
    })
    .catch((error) => {
      setLoader(false);
      console.error(error);
    });
  }
    
  useEffect(() => {
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
				const userSubscribeMatchRef = doc(db, "user_match_subscribe", userId);
				const userSubscribeMatchDoc = await getDoc(userSubscribeMatchRef);
        if(userSubscribeMatchDoc.exists()) {
          const matchDataPaymentIds = userSubscribeMatchDoc.data().match_id || [];
          if (matchDataPaymentIds.length > 0) {
            setInitialLoadComplete(true);
            setMatchPayIds(matchDataPaymentIds);
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
            if(matchPayIds.includes(String(data.match_id))) {
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
    fetchFaqs();
    fetchUpcomingList();
    fetchRecentList();
    fetchPanditsList();
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
            <MobileTabs/>
            <div className="d-flex flex-wrap align-items-center justify-content-between cp__hero-wrap">
              <div className="col-lg-6 col-sm-12 cp__hero-content">
                <h2>Enroll Today and Transform Your <span className="cp__txt-green">Cricket Game</span></h2>
                <h1>Maximize your winning chances with cricket astrology predictions. Unlock star-guided insights to boost your game strategy and dominate the field</h1>
                <a href="/astro" className="cp__fill-btn">Get Started<img src="assets/images/arrow-right-black.svg" alt="logo" className="cp__black" />
                  <img src="assets/images/arrow-right-blue.svg" alt="logo" className="cp__blue" />
                </a>
              </div>
              <div className="col-lg-6 col-sm-12 cp__hero-cardslider">
                <Swiper
                  pagination={{ clickable: true }}
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
            <h2 className="cp__sec-title">Company Overview</h2>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="col-lg-5 col-sm-12">
                <div className="cp__img-block">
                  <img src="assets/images/moon-inverse.png" alt="logo" className="cp__moon-inverse" />
                  <img src="assets/images/moon-sign.png" alt="logo" className="cp__moon-sign" />
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
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
            <div className="cp__bottom-view d-flex  justify-content-between cp__comover-wrap">
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
                  <p>Free Live Line | Match Reports | Fantasy Reports</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cp__buypro-sec">
          <div className="container">
            <h2 className="cp__sec-title">Buy Our Reports</h2>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="col-lg-6 col-sm-12 cp__buy-content">
                <p>Brief overview of how astrology can be applied to cricket and the benefits of astrology cricket reports.</p>
                <ul>
                  <li className="cp__before-dot">Match Prediction Reports</li>
                  <li className="cp__before-dot">Forecasts for cricket tournaments and series based on astrological trends</li>
                  <li className="cp__before-dot">Team Analysis Reports</li>
                  <li className="cp__before-dot">Tournament Forecasts</li>
                  <li className="cp__before-dot">Player Performance Reports</li>
                </ul>
              </div>
              <div className="col-lg-6 col-sm-12">
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

        <section className="cp__about-sec">
          <div className="container">
            <h2 className="cp__sec-title">Our Pandit</h2>
            {(panditData && panditData.length > 0) && panditData.map((pandit, index) => (
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="col-lg-6 col-sm-12 cp__about-img">
                <div className="cp__img-block">
                  <img src="assets/images/client.png" alt="logo" />
                </div>
                <div className="cp__exp-desc">
                <span>{pandit.experience}</span>
                <span>Years of experience</span>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                  <div className="cp__img-block">
                      <img src="/assets/images/esoteric.png" alt="logo" className="cp__start-img" />
                  </div>
                  <h3>{pandit.name}</h3>
                  <p>
                      Our experienced pandit specialize in providing detailed match & fantasy astrology insights for cricket matches. Enhance your match experience by unlocking the secrets of the stars. Purchase their services now!
                  </p>
                  <ul>
                      <li className="cp__before-dot">Rating:{Array.from({ length: pandit.rating }, (_, index) => (
                          <>
                              &nbsp;<i key={index} className="fa fa-star text-warning"></i>
                          </>
                      ))} <i className='fa fa-star-half text-warning'></i>
                      </li>
                      <li className="cp__before-dot">Astrology Price: ₹ {pandit.match_astrology_price}</li>
                  </ul>
                  <div className="cp__about-btn">
                      <a href='/astro' className="cp__fill-btn">
                          Get Started
                          <img src="/assets/images/arrow-right-black.svg" alt="logo" className="cp__black" />
                          <img src="/assets/images/arrow-right-blue.svg" alt="logo" className="cp__green" />
                      </a>
                  </div>
              </div>
            </div>))}
          </div>
          <div className="cp__aboutbg-img">
            <img src="assets/images/about-us-bg.png" alt="about" />
          </div>
        </section>

        <section className="d-none cp__feature-sec">
          <div className="container">
            <h2 className="cp__sec-title">Features</h2>
            <div className="d-flex align-items-center flex-wrap">
              <div className="col-lg-6 col-sm-12">
                <ul className="nav nav-pills flex-column nav-pills align-items-end" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation" >
                    <button className="nav-link text-primary fw-semibold active position-relative d-flex align-items-center" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                  <li className="nav-item" role="presentation" >
                    <button className="nav-link text-primary fw-semibold position-relative d-flex align-items-center" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                  <li className="nav-item" role="presentation" >
                    <button className="nav-link text-primary fw-semibold position-relative d-flex align-items-center" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><img src="assets/images/ms.png" alt="ms" /><p>Provide astrologically derived predictions for upcoming cricket matches based on celestial alignments and planetary influences.</p></button>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="tab-content text-end" id="pills-tabContent">
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
        
        {faqs && faqs.length > 0 ? 
          <section className="mt-3 cp__faq-sec">
            <div className="container">
              <h2 className="cp__sec-title">Frequently Asked Questions</h2>
              <div className="accordion" id="accordionExample">
                {faqs.map((faq, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} // Remove 'collapsed' className for the first item
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0 ? 'true' : 'false'} // Set 'true' for the first item, 'false' for others
                        aria-controls={`collapse${index}`}
                      >
                        {faq.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} // Add 'show' className for the first item
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {faq.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cp__faqbg-img">
              <img src="assets/images/overview-bg.png" alt="logo" />
            </div>
          </section>
        : 
          <section className='mt-3 cp__faq-sec'></section>
        }
      </main>
      <FooterV2/>   
    </div>
  )
}
