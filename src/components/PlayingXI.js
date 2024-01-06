import React from 'react'

export default function PlayingXI({ playingXIData }) {
    console.log(playingXIData);
    return (
        <div>
            {Object.keys(playingXIData).map((teamKey, index) => (
                <div key={teamKey} className="accordion" id={`accordion${teamKey}`}>
                <div className="accordion-item">
                    <h5 className="" data-toggle="collapse" data-target={`#bd_innings${teamKey}`} aria-expanded={index === 0}>
                        {playingXIData[teamKey].short_name} PlayingXI
                    </h5>
                    <div id={`bd_innings${teamKey}`} className={`collapse${index === 0 ? ' show' : ''}`} data-parent={`#accordion${teamKey}`}>
                    <div className="acr-body">
                        {playingXIData[teamKey].player.map((player, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginTop: '3px', marginBottom: '3px', padding: '0px 10px'}}>
                            <img src={player.image} alt={player.name} style={{ width: '35px', height: '35px', marginRight: '10px', borderRadius: '100%', border:"2px solid #d5d5d5" }} />
                            <div>
                            <div><strong>{player.name}</strong></div>
                            <div className='outby-set'>{player.play_role}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}
