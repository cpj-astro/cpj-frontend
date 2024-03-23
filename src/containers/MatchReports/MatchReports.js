import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import MatchKundli from '../../components/MatchKundli';
import PhonePeIntegration from '../../components/PhonePeIntegration';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import MobileTabs from '../../components/MobileTabs';

function MatchReports() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [openAccordion, setOpenAccordion] = useState({});
    const [panditData, setPanditData] = useState([]);
    const [user, setUserData] = useState([]);
    const [match, setMatch] = useState(null);
    const [teams, setTeams] = useState([])
    const [loader, setLoader] = useState(false);
    const [astroAuth, setAstroAuth] = useState(false);
    const [reportData, setReportData] = useState(null); 
    const [payments, setPaymentsDetails] = useState([]);

    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const fetchMatchData = () => {
        setLoader(true);
        const params = {
            match_id : id,
        }
		axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/matchInfo` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/matchInfo`, params, apiConfig)
        .then((response) => {
            if(response.data.success){
                setMatch(response.data.data);
				setTeams(response.data.teams);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
	}

    const fetchUserData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setUserData(response.data.data);
                setPaymentsDetails(response.data.payment_details[0]);
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    const fetchPanditsList = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/pandits` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/pandits`, apiConfig)
        .then((response) => {
            setLoader(false);
            if(response.data.success){
                setPanditData(response.data.data);
            }
        }).catch((error) => {
            setLoader(false);
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }

    const showTag = (t, number) => {
        const checkNumberInList = (list) => {
            if (list) {
                const numbers = list.split(',').map(num => num.trim());
                if (numbers.includes(number.toString())) {
                    return true;
                }
            }
            return false;
        };
    
        if (checkNumberInList(t.bowler)) {
            return 'BL';
        } else if (checkNumberInList(t.batsman)) {
            return 'BT';
        } else if (checkNumberInList(t.wicket_keeper)) {
            return 'WK';
        } else if (checkNumberInList(t.all_rounder)) {
            return 'AR';
        } 
        return '';
    }    

    useEffect(() => {
        const params = {
            match_id : id,
        }
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/checkAstrology` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/checkAstrology`, params, apiConfig)
        .then((response) => {
            if (response.data.success) {
                setAstroAuth(true);
            } else {
                toast.error("No Astrology found for this match!")
            }
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.status_code === 401) {
                localStorage.removeItem('client_token');
                localStorage.removeItem('user_data');
                navigate('/');
            } else {
                console.log(error);
            }
        });
        if(match && match.astrology_data && astroAuth) {
            reportSet(match.astrology_data);
        }
        fetchUserData();
    }, [match])

    const reportSet = (astrologyData) => {
        setReportData(JSON.parse(astrologyData));
    }

    const generateReport = (m_id, u_id, moonSign) => {
        setLoader(true);
        const data = {
            match_id: m_id,
            user_id: u_id,
            moon_sign: moonSign,
        };

        try {
            axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/generateReport` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/generateReport`, data, apiConfig)
            .then((response) => {
                if(response.data.success){
                    let report = JSON.parse(response.data.data.astrology_data);
                    setReportData(report);
                    fetchMatchData();
                    setLoader(false);
                } else {
                    setLoader(false);
                    toast.error('Report generation failed. Try again!');
                }
            }).catch((error) => {
                setLoader(false);
                if(error && error.response && error.response.data && error.response.data.status_code == 401){
                    localStorage.removeItem('client_token');
                    localStorage.removeItem('user_data');
                    
                    navigate('/');
                } else {
                    console.log(error);
                }
            });
          } catch (error) {
            setLoader(false);
            toast.error(error.response.data.error);
          }
    }

    const toggleAccordion = (teamKey) => {
        setOpenAccordion((prevState) => {
            // Close all accordions
            const newOpenAccordion = {};
            Object.keys(prevState).forEach(key => {
                newOpenAccordion[key] = false;
            });
            // Open the selected accordion
            newOpenAccordion[teamKey] = !prevState[teamKey];
            return newOpenAccordion;
        });
    };
    
	useEffect(() => {
        fetchMatchData();
        fetchPanditsList();
    },[])
    return (
        <>
            <HeaderV2/>
            {!loader && astroAuth &&
            <main className="cp__list-sec">
                <div className="container p-0">
                    <MobileTabs/>
                    {/* Pandit buy section */}
                    {loader && <Loader/>}
                    {match && !match.transaction_id && 
                    <>
                        {(panditData && panditData.length > 0) ? panditData.map((pandit, index) => (
                            <section className="cp__about-sec pt-60">
                                <div className="container">
                                    <h2 className="cp__sec-title">{match && match.transaction_id ? '' : 'Buy'} (<i>{match && match.team_a_short ? match.team_a_short : 'N/A'} VS {match && match.team_b_short ? match.team_b_short : 'N/A'}</i>)'s Match Astrology Report</h2>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="col-lg-6 col-sm-12 cp__about-img">
                                        <div className="cp__img-block">
                                            <img src="/assets/images/client.png" alt="logo" />
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
                                            <PhonePeIntegration btnText="Buy Match Astrology" astroAmount={pandit.match_astrology_price} matchId={id} panditId={pandit.id} userId={user.id} />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="cp__aboutbg-img">
                                    <img src="/assets/images/about-us-bg.png" alt="about" />
                                </div>
                            </section>
                            )) : 
                            <div className='col-md-12'>
                                <div className='card card-shadow'>
                                    <h2>No Pandits To Show</h2>
                                </div>
                            </div> 
                        }
                    </>
                    }
                    <div className="cp__listing-wrap">
                        <section>
                            <div className='container'>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Modal show={showModal} onHide={handleCloseModal} size="lg">
                                            <Modal.Body>
                                            <p><strong>DISCLAIMER</strong></p>
                                            <span className='report-values'>
                                                <p>
                                                    Strictly for Entertainment Purposes
                                                </p>
                                                <p>
                                                    The www.cricketpanditji.com provided herein is for entertainment purposes only. Any information, guidance, or advice offered during any course of the service provided by  “Cricket Panditji “ is not intended to substitute professional, legal, financial, or medical advice. 
                                                </p>
                                                <p>
                                                    The content presented is based on interpretation, subjective analysis, and personal insights, and should not be considered as a substitute for expert advice. Individuals are encouraged to use their discretion and judgement in applying any information received during this service to their personal lives or decisions.
                                                </p>
                                                <p>
                                                    We do not guarantee the accuracy, reliability, or completeness of any information provided during this service. Participants are advised to seek appropriate professional advice or consultation for specific concerns or issues.
                                                </p>
                                                <p>
                                                    By engaging in this service, you acknowledge that any decisions or actions taken as a result of the information provided are at your own risk and discretion. Any information/advice/service must be taken as a pure entertainment and “Cricket Panditji takes no responsibility whatsoever in any manner, caused by any give any service/information by “Cricket Panditji“
                                                </p>
                                            </span>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModal}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        {/* Generate Button */}
                                        {match && match.transaction_id && match.transaction_id && match.payment_status == 'success' && !match.astrology_data && (
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className="text-center">
                                                        <p>
                                                            <h3>
                                                                Congrats Your Report is here!
                                                            </h3>
                                                        </p>
                                                        <p className='mt-3'>
                                                            Please click below button to generate the match astrology report 
                                                            <br />
                                                            <button className="cp__fill-btn mt-3" onClick={() => generateReport(match.match_id, user.id, user.moon_sign)}> 
                                                                Generate Report
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Report Section */}
                                        {match && match.transaction_id && match.payment_status == 'success' && reportData && reportData.length > 0 && (
                                            <>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <div className="text-center">
                                                            <h3>🌟 {match && match.transaction_id ? '' : 'Buy'} (<i>{match && match.team_a_short ? match.team_a_short : 'N/A'} VS {match && match.team_b_short ? match.team_b_short : 'N/A'}</i>)'s Match Astrology Report 🌟</h3>
                                                            <hr/>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className='cp__match-report'>
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <div className='display-set'>
                                                                <MatchKundli housesData={user && user.kundli_data ? user.kundli_data : []} />
                                                            </div>
                                                        </div>
                                                        <div className='col-md-8'>
                                                            <div className="info-body">
                                                                <ul className="list-striped mr-05">
                                                                    <li>
                                                                        <span className='cp__report-keys'>Name</span>
                                                                        <p>{user.first_name + " " + user.last_name}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Birth place</span>
                                                                        <p>{user.birth_place}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Birth date</span>
                                                                        <p>{user.birth_date}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Birth Time</span>
                                                                        <p>{user.birth_time}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Longitude</span>
                                                                        <p>{user.latitude}</p>
                                                                    </li>
                                                                </ul>
                                                                <ul className="list-striped">
                                                                    <li>
                                                                        <span className='cp__report-keys'>Longitude</span>
                                                                        <p>{user.longitude}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>House No.</span>
                                                                        <p>{user.moon_sign}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Moon Sign</span>
                                                                        <p>{user.sign_name}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Pandit</span>
                                                                        <p>{payments.pandit && payments.pandit.name ? payments.pandit.name : 'N/A'}</p>
                                                                    </li>
                                                                    <li>
                                                                        <span className='cp__report-keys'>Report Price</span>
                                                                        <p>र {payments.amount}</p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {reportData && reportData.length > 0 && reportData.map((report, index) => (
                                                    <>
                                                        <hr />
                                                        <div className='container'>
                                                            <div className="country-info align-items-center">
                                                                <span className="mb-10 cp__report-keys">{report.key ?? 'N/A'}</span>
                                                            </div>
                                                            <span className='report-values'>
                                                                {report.value ?? 'N/A'}
                                                            </span>
                                                        </div>
                                                    </>))}
                                                </div>
                                            </>
                                        )}

                                        {/* Teams Buy section */}
                                        {teams && teams.length > 0 && match && match.transaction_id && match.payment_status == 'success' &&
                                        <div className='mt-3'>
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className="text-center">
                                                        <h3>Fantasy Astrology Report</h3>
                                                        <hr/>
                                                    </div>
                                                </div>
                                            </div> 
                                            {teams && teams.length > 0 && teams.map((team, index) => (
                                                <div className="accordion" id={`accordion${index}`} onClick={() => toggleAccordion(index)}>
                                                    <div className="accordion-item">
                                                        <h5 className="mb-0" data-toggle="collapse" data-target={'#_' + team.id} aria-expanded={openAccordion[index]}>
                                                            <b>{team.team_name}</b>
                                                        </h5>
                                                        {openAccordion[index] && <hr/>}
                                                        <section className={`collapse${openAccordion[index] ? ' show' : ''}`} id={`bd_innings${index}`} data-bs-parent={`#accordion${index}`}>
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Players</th>
                                                                            <th scope="col" className='text-center'>CAP</th>
                                                                            <th scope="col" className='text-center'>VC</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 1) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 1)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p1}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 1 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 1 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 2) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 2)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p2}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 2 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 2 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 3) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 3)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p3}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 3 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 3 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 4) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 4)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p4}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 4 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 4 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 5) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 5)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p5}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 5 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 5 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 6) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 6)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p6}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 6 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 6 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 7) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 7)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p7}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 7 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 7 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 8) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 8)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p8}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 8 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 8 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 9) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 9)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p9}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 9 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 9 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 10) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 10)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p10}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 10 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 10 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="country-info align-items-center">
                                                                                    <div className="flag-avatar mr-05">
                                                                                        <figure className="avatar-28 p-0">
                                                                                            <img src="/assets/images/user-logo.png" alt="" />
                                                                                            {showTag(team, 11) !== '' && 
                                                                                                <span className="p_class">{showTag(team, 11)}</span>
                                                                                            }
                                                                                        </figure>
                                                                                    </div>
                                                                                    <span className="country-name text-13">{team.p11}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.captain == 11 ? 'cvc_active_class' : 'cvc_class'}>C</div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className={team.vice_captain == 11 ? 'cvc_active_class' : 'cvc_class'}>VC</div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            {!astroAuth && 
                            <div className='row' style={{height: '100vh'}}>
                                <div className='col-md-12'>
                                    <div className="text-center">
                                        <h3>No Data Found! Please Go Back.</h3>
                                    </div>
                                </div>
                            </div>}
                        </section>
                    </div>
                </div>
            </main>
            }
            <FooterV2/>
        </>
    );
}
    
export default MatchReports;