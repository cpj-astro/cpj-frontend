import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import HeaderV2 from '../../components/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import { db } from '../../authFiles/fbaseconfig';
import MatchListCard from '../../components/MatchListCard';
import MobileTabs from '../../components/MobileTabs';

export default function LiveMatches() {
    let matchDataRef = collection(db, "matchdata");
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [liveMatches, setLiveMatches] = useState([]);
	const [matchPayIds, setMatchPayIds] = useState([]);
	
    useEffect(() => {
		const userId = localStorage.getItem("user_data");
		
		const fetchMatchDataIds = async () => {
			try {
				const userSubscribeMatchRef = doc(db, "user_subscribe_match", userId);
				const userSubscribeMatchDoc = await getDoc(userSubscribeMatchRef);
                if(userSubscribeMatchDoc.exists()) {
                    const matchDataPaymentIds = userSubscribeMatchDoc.data().match_id || [];
                    
                    if (matchDataPaymentIds.length > 0) {
                        setInitialLoadComplete(true);
                        setMatchPayIds(matchPayIds);
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
		const userId = localStorage.getItem("user_data");
		if(userId) {
			onSnapshot(matchDataRef, (snapshot) => {
				const allMatches = [];
				snapshot.forEach((doc) => {
					let data = doc.data();
					if(data && (data.result == "" || data.result == null)) {
						if(matchPayIds.includes(data.match_id)) {
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
			}, (error) => {
				console.error("Error fetching data:", error);
			});
		};
    }, [initialLoadComplete]);

    return (
        <>
            <HeaderV2/>
            <main className="cp__list-sec">
				<MobileTabs/>
                <div className="container">
                    <div className="cp__listing-wrap">
                        {(liveMatches && liveMatches.length > 0) && (
                            <>
                                {liveMatches.map((m, i) => (
                                    <MatchListCard match={m} index={i}/>
                                ))}
                            </>
                        )}
						{liveMatches && liveMatches.length == 0 && <h1 className='mt-3'>No Matches</h1>}
                    </div>
                </div>
            </main>
            <FooterV2/>
        </>
    )
}
