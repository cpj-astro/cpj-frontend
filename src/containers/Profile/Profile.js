import React from 'react';
import axios from 'axios';
import HeaderTwo from '../../components/HeaderTwo';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Kundli from '../../components/Kundli';
import { Modal, Button } from 'react-bootstrap';
import MatchKundli from '../../components/MatchKundli';

function Profile() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [user, setUserData] = useState([]);
    var accessToken = localStorage.getItem('client_token');

    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const fetchUserData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            console.log(response);
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

    const logout = () => {
		localStorage.removeItem('client_token');
		navigate('/sign-in');
	}

    useEffect(() => {
        fetchUserData();
    },[])
    return (
        <>
            <HeaderTwo/>
            <div id="main" className="main-container">
                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" style={{paddingLeft: '0px'}}>
                    <Modal.Body>
                        <section className='player-contact pt-0'>
                            <div className='player-profile'>
                                <div className="player-info">
                                    <div className="country-info align-items-center">
                                        <span className="country-name text-13">Astrology Details</span>
                                    </div>
                                    <hr className="mt-0"/>
                                    <div className="info-body">
                                        <ul className="list-striped mr-05">
                                            <li>
                                                <span>Match Name</span>
                                                <p className='text-muted'>Ind Vs Pak</p>
                                            </li>
                                            <li>
                                                <span>Match Start</span>
                                                <p className='text-muted'>4:00 PM IST</p>
                                            </li>
                                            <li>
                                                <span>Weather</span>
                                                <p className='text-muted'>Cloudy/Rainy</p>
                                            </li>
                                            <li>
                                                <span>Profile Name</span>
                                                <p className='text-muted'>Anurag</p>
                                            </li>
                                            <li>
                                                <span>Direction</span>
                                                <p className='text-muted'>North</p>
                                            </li>
                                        </ul>
                                        <ul className="list-striped">
                                            <li>
                                                <span>Rashi/Zodiac</span>
                                                <p className='text-muted'>Sagittarius</p>
                                            </li>
                                            <li>
                                                <span>Reason of betting</span>
                                                <p className='text-muted'>Mars, Rahu in 7th or 11th House</p>
                                            </li>
                                            <li>
                                                <span>Lucky Numbers</span>
                                                <p className='text-muted'>Odd/Even</p>
                                            </li>
                                            <li>
                                                <span>Lucky Colours</span>
                                                <p className='text-muted'>
                                                    Red
                                                </p>
                                            </li>
                                            <li>
                                                <span>Favourite Team</span>
                                                <p className='text-muted'>
                                                    India (Do bet on this team)
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className=''/>  
                                    <div className='info-body'>
                                        <ul className="list-striped">
                                            <li>
                                                <span className='long-stripped'>Match Turning Time/Point</span>
                                                <p className='text-muted'>In between 17 to 20 overs 1st innings or around 15:00 IST</p>
                                            </li>
                                            <li>
                                                <span className='long-stripped'>Special Recommendation</span>
                                                <p className='text-muted'>Avoid Major Risk , do mantras for this time.</p>
                                            </li>
                                            <li>
                                                <span className='long-stripped'>Patience & timing for this match</span>
                                                <p className='text-muted'>Around 2 PM for just 15 min</p>
                                            </li>
                                            <li>
                                                <span className='long-stripped'>Venue avourite zodiacs</span>
                                                <p className='text-muted'>Aries, Capricorn, Leo</p>
                                            </li>
                                            <li>
                                                <span className='long-stripped'>Favourite Team</span>
                                                <p className='text-muted'>
                                                    India (Do bet on this team)
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className='mb-0'/>
                                    <div className='container'>
                                        <div className="country-info align-items-center">
                                            <span className="country-name text-13">Match Astrology</span>
                                        </div>
                                        <span className='text-muted'>
                                            How is your day overall, For this match you have to take calculated risk chances of your bet success is very less, Today is not your day so better only watch this match or if rate goes under minimum you will take little risk and book the profit immediately.
                                        </span>
                                    </div>
                                    <hr className='mb-0'/>
                                    <div className='container'>
                                        <div className="country-info align-items-center">
                                            <span className="country-name text-13">Astrological Favourite players</span>
                                        </div>
                                        <span className='text-muted'>
                                            Virat. Kohli 65%, Suresh Raina 70%, Rohit Sharma 50%, Ishan Patel 75%, Rishabh Pant 80%, Hardik Pandya 90%, Shubham Gill 70%.
                                        </span>
                                    </div>
                                    <hr className='mb-0'/>
                                    <div className='container text-center'>
                                        <span className="country-name text-13 mb-2">Match Natal Chart</span>
                                        <MatchKundli housesData={user && user.kundli_data ? user.kundli_data : []} />
                                    </div>
                                    <hr className='mb-0'/>
                                    <div className='container'>
                                        <div className="country-info align-items-center">
                                            <span className="country-name text-13">Suggestions & Mantras</span>
                                        </div>
                                        <span className='text-muted'>
                                            •	Strengthen the power of the Sun by donating wheat, jaggery, and copper on Sundays and wearing a copper ring on the right-hand ring finger.<br />
                                            •	Chant the Gayatri Mantra or the Maha Mrityunjaya Mantra daily to improve luck and gain financial stability.<br />
                                            •	Avoid wearing black while Gambling and choose bright colors like red, orange, and yellow instead.<br />
                                            •	Donate yellow sweets, bananas, or turmeric on Thursdays to strengthen Jupiter's influence and gain prosperity.<br />
                                            •	Recite Hanuman Chalisa daily for good luck, success, and financial stability.<br />
                                            •	Keep a silver coin in your wallet or purse while Gambling to increase your chances of success.
                                        </span>
                                    </div>
                                    <hr className='mb-0'/>
                                    <div className='container'>
                                        <div className="country-info align-items-center">
                                            <span className="country-name text-13">Disclaimer</span>
                                        </div>
                                        <span className='text-muted'>
                                            The testimonials provided on our website are personal views and experiences of our clients. We do not make any type of false claims of guaranteed results as we are not GODS or HIS decendants. We promise the best of the services with truth, faith and devotion. There is no guarantee of specific results and that the results can vary as every individual has its own horoscope and different pattern of their planets. Hence, results or final effects of remedies could vary from person to person.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="container breadcrumb-area">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Profile</span>
                    </div>
                    <h2>Profile</h2>
                </div>
                <section className="product-checkout-sec pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="widget">
                                    <div className="mt-4 card card-shadow px-30 py-30">
                                        <div className="checkout-form p-0">
                                            <form>
                                                <div className="row">
                                                    <div className='col-md-12'>
                                                        <aside className="sidebar right-sidebar">
                                                            <div className="widget widget-upcoming-match">
                                                                <ul className="nav nav-tabs">
                                                                    <li className="active"><a data-toggle="tab" href="#profile-details" className="active">Details</a></li>
                                                                    <li><a data-toggle="tab" href="#view-kundli">Kundli</a></li>
                                                                    <li><a data-toggle="tab" href="#payment-history">Payment History</a></li>
                                                                    <li><a data-toggle="tab" href="#astrology-reports">Astrology Reports</a></li>
                                                                    <li><a data-toggle="tab" href="#scorecard">Account Settings</a></li>
                                                                </ul>

                                                                <div className="tab-content">
                                                                    <div id="profile-details" className="tab-pane fade in show active" onClick={()=> { fetchUserData();}}>
                                                                        <div className="form-row">
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="first_name">First Name</label>
                                                                                    <input id="first_name" type="text" name="first_name" placeholder="Enter Firth Name" required value={user.first_name} {...register('first_name')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="last_name">Last Name</label>
                                                                                    <input id="last_name" type="text" name="last_name" placeholder="Enter Last Name" required value={user.last_name} {...register('last_name')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="useremail">Email address</label>
                                                                                    <input id="useremail" type="email" name="email" placeholder="Enter email" required value={user.email} {...register('email')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="birth_date">Date Of Birth</label>
                                                                                    <input id="birth_date" type="date" name="birth_date" placeholder="Birth Date" required value={user.birth_date} {...register('birth_date')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="birth_time">Birth Time - (24 Hour Format)</label>
                                                                                    <input id="birth_time" type="time" name="birth_time" required value={user.birth_time} {...register('birth_time')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="input-field">
                                                                                    <label for="birth_place">Birth Place</label>
                                                                                    <input id="birth_place" type="text" name="birth_place" placeholder="Birth Place" required value={user.birth_place} {...register('birth_place')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <hr/>
                                                                                <button type="submit" className="cricnotch-btn btn-filled radius-5">Save Changes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="view-kundli" className="tab-pane fade">
                                                                        <Kundli housesData={user && user.kundli_data ? user.kundli_data : []}/>
                                                                    </div>
                                                                    <div id="payment-history" className="tab-pane fade">
                                                                        <h1 className='text-dark'>Payment History</h1>
                                                                    </div>
                                                                    <div id="astrology-reports" className="tab-pane fade">
                                                                    <div className="table-responsive">
                                                                        <table className="widget-table table table-striped no-border">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th scope="col" className="text-12">Match Date</th>
                                                                                    <th scope="col" className="text-12">Opponents</th>
                                                                                    <th scope="col" className="text-12">Time</th>
                                                                                    <th scope="col" className="text-12">Status</th>
                                                                                    <th scope="col" className="text-12">Competition</th>
                                                                                    <th scope="col" className="text-12">Venue</th>
                                                                                    <th scope="col" className="text-12">Astrology Report</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Sat, Mar 24</td>
                                                                                    <td>
                                                                                        <div className="country-info">
                                                                                            <span className="country-name text-13">ind</span>
                                                                                            <span className="country-name text-12 mx-2">VS</span>
                                                                                            <span className="country-name text-13">eng</span>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>9:00PM EST</td>
                                                                                    <td>FINISHED</td>
                                                                                    <td>IPL</td>
                                                                                    <td>Madison Cube Stadium</td>
                                                                                    <td className='text-center'>
                                                                                    <span className="cricnotch-btn btn-filled py-05 cursor-pointer" onClick={handleShowModal}>
                                                                                        <i className='fa fa-eye'></i> View Report
                                                                                    </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </aside>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
}
    
export default Profile;