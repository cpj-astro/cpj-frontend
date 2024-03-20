import React, { useState } from 'react'

export default function Commentary({ commentaryData }) {
    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <div className=''>
            {!commentaryData.length && (
                <div>
                    No commentary available.
                </div>
            )}
    
            {(commentaryData && commentaryData.length > 0) && (
                <div>
                    {commentaryData.slice(0, visibleCount).map((item, index) => (
                        <div key={index} className={item.type === 2 && 'c-type-2-set mb-2'}>
                            {item.type === 2 && (
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className='cp__justify-content'>
                                                <div className='left-col-set'>
                                                    <b>{item.data.title} ({item.data.runs} Runs)</b>
                                                </div>
                                                <div className='right-col-set'>
                                                    <span className='right-odd'>{item.data.team ?? ""}</span>
                                                    <span className='left-odd'>{item.data.team_score ?? 0}/{item.data.team_wicket ?? 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className='cp__justify-content'>
                                                <div>
                                                    <p className="mb-0">{item.data.batsman_1_name ?? ""}</p>
                                                    <p className="mb-0">{item.data.batsman_2_name ?? ""}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">{item.data.batsman_1_runs ?? 0}({item.data.batsman_1_balls ?? 0})</p>
                                                    <p className="mb-0">{item.data.batsman_2_runs ?? 0}({item.data.batsman_2_balls ?? 0})</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">{item.data.bolwer_name ?? ""}</p>
                                                    <p className='mb-0'>{item.data.bolwer_overs ?? 0}-{item.data.bolwer_wickets ?? 0}-{item.data.bolwer_runs ?? 0}-{item.data.bolwer_maidens ?? 0}</p>
                                                </div>
                                            </div>                                           
                                        </div>
                                    </div>
                                </div>
                            )}
                            {item.type === 1 && (
                                <>
                                    <div className='type-1-comment'>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className='cp__justify-content'>
                                                    <div>
                                                        <span className='type-s-1'>
                                                            {item.data.overs ?? 0}
                                                        </span>
                                                        <span className={(item.data.runs == 0 || item.data.runs == 1 || item.data.runs == 2 || item.data.runs == 3 || item.data.runs == 5) ? 'type-s-2-1' : 'type-s-2-2'}>
                                                            {item.data.runs + ' Runs' ?? "0 Runs"}
                                                        </span>
                                                        <span className='type-s-3'>
                                                            {', ' + item.data.title ?? "-"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-12'>
                                                <div className={(item.data.runs == 0 || item.data.runs == 1 || item.data.runs == 2 || item.data.runs == 3 || item.data.runs == 5) ? 'c-run-set-1' : 'c-run-set-2'}>{item.data.runs ?? 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {commentaryData && commentaryData.length > visibleCount && (
                        <div className="text-center mt-3">
                            <span className="cp__fill-btn-profile" onClick={loadMore}>
                                <i className='fa fa-spinner'></i> &nbsp; Load More
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
