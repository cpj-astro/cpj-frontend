import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterV2 from '../../components/FooterV2';
import HeaderV2 from '../../components/HeaderV2';
import MobileTabs from '../../components/MobileTabs';

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [newsCount, setNewsCount] = useState(6);
    const maxTitleLength = 30;
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('client_token');
    const apiConfig = {
        headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type': 'application/json',
        },
    };
    useEffect(() => {
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
    }, [])

    const newsloadMore = () => {
        setNewsCount((prevCount) => prevCount + 5);
    };
    
    return (
        <>
            <HeaderV2/>
                <main className="cp__list-sec">
                    <MobileTabs/>
                    <div className="container">
                        <div className="cp__listing-wrap">
                            <h1 className='mt-3'>Cricket News</h1>
                            <section className="related-news p-0">
                                {(newsData && newsData.length > 0) && (
                                    <div className="row">
                                        {newsData.slice(0, newsCount).map((news, index) => (
                                            <div className="col-md-6" key={news.news_id}>
                                                <div className="cp__card p-0">
                                                    <div className="news-card">
                                                        <figure>
                                                            <img src={process.env.REACT_APP_IMG_FIX+news.image} alt="" />
                                                        </figure>
                                                        <div className="content-block">
                                                            <h3>
                                                                <a className='news-title' href={`/news-details/${news.news_id}/${news.title.replace(/^"|"$/g, '')}/${news.pub_date}`}>{news.title.replace(/^"|"$/g, '').slice(0, maxTitleLength)}...</a>
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
                                    <div className="text-center mt-3">
                                        <span className="cp__fill-btn-profile" onClick={newsloadMore}>
                                            <i className='fa fa-spinner'></i> &nbsp; Load More
                                        </span>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </main>
            <FooterV2/>
        </>
    )
}
