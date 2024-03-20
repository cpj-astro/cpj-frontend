import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import MobileTabs from '../../components/MobileTabs';

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
                localStorage.removeItem('user_data');
                
                navigate('/');
            } else {
                console.log(error);
            }
        });
    }, [id]);

    return (
        <>
        <HeaderV2/>
        <main className="cp__list-sec">
            <MobileTabs/>
            <div className="container">
                <div className="cp__listing-wrap">
                    <h1 className='mt-3'>News Detail</h1>
                    <div className="row">
                        <div className="col-md-9">
                            <section className="blog-details pt-20">
                                <div className="image-card mb-2">
                                    <figure>
                                        <img src={newsData && newsData.image ? process.env.REACT_APP_IMG_FIX+newsData.image : ''} alt="" />
                                    </figure>
                                </div>
                                <div className="blog-details-content">
                                    <div className="blog-details-header">
                                        <div>
                                            <h2>{title.replace(/^"|"$/g, '')}</h2>

                                            <div className="post-meta">
                                                <a href="#"><i className="fas fa-calendar-alt"></i> &nbsp;Published Date: {pub_date}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-details-body">
                                        <p dangerouslySetInnerHTML={{__html: newsData && newsData.news_content ? newsData.news_content : 'N/A'}} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <FooterV2/>
        </>
    )
}
