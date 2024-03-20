import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import MatchListCard from '../../components/MatchListCard';
import { useNavigate } from 'react-router-dom';
import MobileTabs from '../../components/MobileTabs';

export default function UpcomingMatches() {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
	const [matchLoader, setMatchLoader] = useState(false)
	const navigate = useNavigate();
  const accessToken = localStorage.getItem('client_token');
  const apiConfig = {
    headers: {
    Authorization: "Bearer " + accessToken,
    'Content-Type': 'application/json',
    },
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

  useEffect(() => {
    fetchUpcomingList();
  }, [])
  
  return (
      <>
          <HeaderV2/>
          <main className="cp__list-sec">
				      <MobileTabs/>
              <div className="container">
                  <div className="cp__listing-wrap">
                    {(upcomingMatches && upcomingMatches.length > 0 && !matchLoader) && (
                      <>
                        {upcomingMatches.slice(0, 5).map((m, i) => (
                          <MatchListCard match={m} index={i}/>
                        ))}
                      </>
                    )}
                    
						      {upcomingMatches && upcomingMatches.length == 0 && <h1 className='mt-3'>No Matches</h1>}
                  </div>
              </div>
          </main>
          <FooterV2/>
      </>
  )
}
