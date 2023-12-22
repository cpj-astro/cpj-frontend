import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Feedback() {
    const { register, handleSubmit, setValue, getValues, watch, reset, formState, formState: { isSubmitSuccessful } } = useForm();
    const [loader, setLoader] = useState(false);
    const [user, setUserData] = useState([]);

    var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json',
        }
    };

    const onSubmit = async (data) => {
        if(data.review && data.name) {
            try {
                setLoader(true);
                axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/submitFeedback` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/submitFeedback`, data, apiConfig)
                .then((response) => {
                    if(response.data.status == true) {
                        setLoader(false);
                        toast.success(response.data.message);
                    } else {
                        setLoader(false);
                        toast.error(response.data.message);
                    }
                    reset();
                }).catch((error) => {
                    setLoader(false);
                    reset();
                    console.log(error);
                });
            } catch (error) {
                reset();
                console.log(error);
            }
        } else {
            toast.error("Please enter name and review.");
        }
	};

    useEffect(() => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/user` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/user`, apiConfig)
        .then((response) => {
            if(response.data.success){
                let userData = response.data.data; 
                setUserData(userData);
                if(userData.first_name || userData.last_name){
                    setValue('id', userData.id)
                    setValue('name', userData.first_name + ' ' + userData.last_name);
                }
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
				setUserData([]);
			} else {
                toast.error(error.code);
			}
        });
    }, []);

    return (
        <>
            <Header/>
            <div id="main" className="main-container contactus">
                <div className="container breadcrumb-area">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Feedback</span>
                    </div>
                    <h2>Feedback</h2>
                </div>
                <section className="contact-sec pt-15">
                    <div className="container">
                    <div className="card card-shadow px-30 py-30 checkout-form">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="comment-form p-0">
                            <p className="mb-20">
                                <strong>Help Us Improve – Your Opinion Matters!</strong>
                            </p>
                            <hr/>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" {...register("id")} value={null}/>    
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="input-field">
                                        <label htmlFor="name">Your name</label>
                                        {user && user.first_name ?
                                            (
                                                <input id="name" type="text" name="name" placeholder="Enter name" required {...register("name")} disabled/>
                                            )
                                            :
                                            (
                                                <input id="name" type="text" name="name" placeholder="Enter name" required {...register("name")} />   
                                            )
                                        }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-field">
                                            <label htmlFor="rating">Rating</label>
                                            <select {...register("rating")} required>   
                                                <option value={5} key="2">5</option>
                                                <option value={4} key="3">4</option>
                                                <option value={3} key="4">3</option>
                                                <option value={2} key="5">2</option>
                                                <option value={1} key="6">1</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-field textarea">
                                <label htmlFor="review">Review</label>
                                <textarea id="review" name="review" placeholder="Write your review" defaultValue={""} {...register("review")}/>
                                </div>
                                <button type="submit" className="cricnotch-btn btn-filled radius-5">{loader ? 'Processing Your Request...' : 'Submit Review'}</button>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}
