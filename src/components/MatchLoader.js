import React from 'react'

export default function MatchLoader() {
  return (
    <div className="score-card card-shadow p-0 mt-3">
        <div className="score-card-inner">
            <div className="score-card-header text-center">
                <span class="skeleton-loader-gradient"></span>
                <span class="skeleton-loader-gradient"></span>
            </div>
            <div className="score-card-body mt-2">
                <div className="country-info">
                    <div className="flag-avatar">
                        <figure>
                            <img src={'/assets/images/flags/bangladesh.png'} alt="" />
                        </figure>
                    </div>
                </div>
                <div className='vs-style'>
                    <span>VS</span>
                </div>
                <div className="country-info flex-row-reverse">
                    <div className="flag-avatar ml-05">
                        <figure>
                            <img src={'/assets/images/flags/bangladesh.png'} alt="" />
                        </figure>
                    </div>
                </div>
                <span class="skeleton-loader-gradient mt-2"></span>
            </div>
            <span class="skeleton-loader-gradient mt-2"></span>

            <div className='mt-2' style={{display:'flex', justifyContent: 'space-between', marginLeft: '-15px', marginRight: '-15px'}}>
                <div className="col-md-4">
                    <span class="skeleton-loader-gradient mt-1"></span>
                </div>
                <div className="col-md-4">
                    <span class="skeleton-loader-gradient mt-1"></span>
                </div>
                <div className="col-md-4">
                    <span class="skeleton-loader-gradient mt-1"></span>
                </div>
            </div>
            <div className='mt-1' style={{display:'flex', justifyContent: 'space-between', marginLeft: '-15px', marginRight: '-15px'}}>
                <div className="col-md-6">
                    <span class="skeleton-loader-gradient mt-1"></span>
                </div>
                <div className="col-md-6">
                    <span class="skeleton-loader-gradient mt-1"></span>
                </div>
            </div>
        </div>
    </div>
  )
}
