import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

export default function Reviews() {
	const [reviews, setReviewsData] = useState([]);
	var accessToken = localStorage.getItem('client_token');
    const apiConfig = {
		headers: {
			Authorization: "Bearer " + accessToken,
			'Content-Type': 'application/json',
		}
	};
    const fetchReviewData = () => {
        axios.get(process.env.REACT_APP_DEV === 'true' ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/getAllReviews` : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/getAllReviews`, apiConfig)
        .then((response) => {
            if(response.data.success){
                setReviewsData(response.data.data);
            }
        }).catch((error) => {
            toast.error(error.code);
        });
    }

    useEffect(() => {
        fetchReviewData();
    }, [])

    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i className='fa fa-star star-icon-set'></i>);
        }
        
        return <span>{stars}</span>;
    };
    
    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <h3 class="widget-title">Reviews & Ratings</h3>
                    <OwlCarousel className='owl-theme' autoplay={true} autoplayTimeout={3000} loop={true} dots={true} arrows={false} items={1} margin={10}>
                    {reviews && reviews.length > 0 && reviews.map((review, index) => {
                        return(
                            <div className="card card-shadow text-center custom-review" key={index}>
                                <div className="card-body">
                                    <h3 className="card-title">{review.user_name}</h3>
                                    <p className="card-text">{review.review}</p>
                                    <StarRating rating={review.rating}/>
                                    <h6>Reviewed on: {moment(review.created_at).format('DD-MM-YYYY')}</h6>
                                </div>
                            </div>
                        )}
                    )}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    )
}
