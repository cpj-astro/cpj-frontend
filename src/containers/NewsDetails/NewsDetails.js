import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewsDetails() {    
    const navigate = useNavigate();
    const {id, title,  pub_date} = useParams();
    const [newsData, setNewsData] = useState([]);
    var accessToken = localStorage.getItem('client_token');

    useEffect(() => {
        const params = {
            news_id : id,
        }
        axios.post(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/news` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/news`, params)
        .then((response) => {
            if(response.data.success){
                setNewsData(response.data.data);
            }
        }).catch((error) => {
            if(error.response.data.status_code == 401){
                localStorage.removeItem('client_token');
                toast.error('Session Expired!, Please Re-login.')
                navigate('/sign-in');
            } else {
                console.log(error);
            }
        });
    }, [id]);

    return (
        <>
        <Header/>
        <div id="main" className='l_con'>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-9">
                        <div className='rrates-container mb-2'>
                            <a href={"/"} className="left-com">
                                <i className='fa fa-arrow-left'></i>
                            </a>
                            {accessToken ?
                                <a href={"/profile"} className="right-com">
                                    <span className=''>My Profile</span>
                                </a>
                            : 
                                <a href={"/sign-in"} className="right-com">
                                    <span className=''>Sign In</span>
                                </a>
                            }
                        </div>
                        <section className="blog-details pt-20">
                            <div className="image-card mb-2">
                                <figure>
                                    <img src={newsData && newsData.image ? process.env.REACT_APP_IMG_FIX+newsData.image : ''} alt="" />
                                </figure>
                            </div>
                            <div className="card card-shadow">
                                <div className="blog-details-content">
                                    <div className="blog-details-header">
                                        <div>
                                            <h2>{title}</h2>

                                            <div className="post-meta">
                                                <a href="#"><i className="fas fa-calendar-alt"></i> Published Date: {pub_date}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-details-body">
                                        <p dangerouslySetInnerHTML={{__html: newsData && newsData.news_content ? newsData.news_content : 'N/A'}} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-3">
                            
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
