import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import MatchListCard from '../../components/MatchListCard';
import { useNavigate } from 'react-router-dom';
import MobileTabs from '../../components/MobileTabs';
import Loader from '../../components/Loader';

export default function AstroMatches() {
  const [astroMatches, setAstroMatches] = useState([]);
	const [matchLoader, setMatchLoader] = useState(false)
  const [matchCount, setMatchCount] = useState(10);
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
      ? `${process.env.REACT_APP_DEV_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'astroMatches': 'offlineAstroMatches'}`
      : `${process.env.REACT_APP_LOCAL_CRICKET_PANDIT_JI_API_URL}/${accessToken ? 'astroMatches': 'offlineAstroMatches'}`,
      apiConfig
    )
    .then((response) => {
      setMatchLoader(false); 
      setAstroMatches(response.data.data);
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
  
  const newsloadMore = () => {
    setMatchCount((prevCount) => prevCount + 5);
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
                    {(!matchLoader && astroMatches && astroMatches.length > 0 && !matchLoader) && (
                      <>
                        {astroMatches.slice(0, matchCount).map((m, i) => (
                          <MatchListCard match={m} index={i}/>
                        ))}
                      </>
                    )}
                    
                    {!matchLoader && astroMatches && astroMatches.length == 0 && <h1 className='mt-3'>No Matches</h1>}

                    {matchLoader && <Loader/>}

                    {!matchLoader && astroMatches.length > matchCount && (
                        <div className="text-center mt-3">
                            <span className="cp__fill-btn-profile" onClick={newsloadMore}>
                                <i className='fa fa-spinner'></i> &nbsp; Load More
                            </span>
                        </div>
                    )}
                  </div>
              </div>
          </main>
          <FooterV2/>
      </>
  )
}
