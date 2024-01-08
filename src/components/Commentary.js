import React, { useState } from 'react'

export default function Commentary({ commentaryData }) {
    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <div className='card'>
            {!commentaryData.length && (
                <div>
                    No commentary available.
                </div>
            )}
    
            {(commentaryData && commentaryData.length > 0) && (
                <div>
                    {commentaryData.slice(0, visibleCount).map((item, index) => (
                        <div key={index} className={item.type === 2 && 'c-type-2-set mb-3'}>
                            {item.type === 2 && (
                                <div className="p-3">
                                    <p className="card-title font-weight-bold">{item.data.title} ({item.data.runs} Runs)</p>
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="mb-0"><strong>{item.data.team_score ?? 0}-{item.data.team_wicket ?? 0}</strong></p>
                                            <p className="mb-0">{item.data.team ?? ""}</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="font-weight-bold mb-0">{item.data.batsman_1_name ?? ""}</p>
                                            <p className="mb-0">{item.data.batsman_1_runs ?? 0}({item.data.batsman_1_balls ?? 0})</p>
                                            <p className="font-weight-bold mb-0">{item.data.batsman_2_name ?? ""}</p>
                                            <p className="mb-0">{item.data.batsman_2_runs ?? 0}({item.data.batsman_2_balls ?? 0})</p>
                                            <p className="font-weight-bold mb-0">{item.data.bolwer_name ?? ""}</p>
                                            <p className='mb-0'>{item.data.bolwer_overs ?? 0}-{item.data.bolwer_wickets ?? 0}-{item.data.bolwer_runs ?? 0}-{item.data.bolwer_maidens ?? 0}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {item.type === 1 && (
                                <div className="card">
                                    <div className='d-flex'>
                                        <div className='text-center'>
                                            <div className='mb-2 c-overs-set'>{item.data.overs ?? 0}</div>
                                            <div className={(item.data.runs == 0 || item.data.runs == 1 || item.data.runs == 2 || item.data.runs == 3 || item.data.runs == 5) ? 'c-run-set-1' : 'c-run-set-2'}>{item.data.runs ?? 0}</div>
                                        </div>
                                        <div className='ml-3'>
                                            <div className="font-weight-bold">{item.data.title ?? "-"}</div>
                                            <div>{item.data.description ?? "-"}</div>
                                        </div>
                                    </div>  
                                </div>
                            )}
                        </div>
                    ))}
                    {commentaryData && commentaryData.length > visibleCount && (
                        <div className="text-center mt-15 mb-10">
                            <button className="cricnotch-btn btn-filled loadMore-btn" onClick={loadMore}><i className="fas fa-spinner"></i>&nbsp;&nbsp;&nbsp; Load more</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
