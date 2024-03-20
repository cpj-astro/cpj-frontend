import React, { useState } from 'react';

export default function PlayingXI({ playingXIData }) {
    const [openAccordion, setOpenAccordion] = useState({});

    const toggleAccordion = (teamKey) => {
        setOpenAccordion((prevState) => {
            // Close all accordions
            const newOpenAccordion = {};
            Object.keys(prevState).forEach(key => {
                newOpenAccordion[key] = false;
            });
            // Open the selected accordion
            newOpenAccordion[teamKey] = !prevState[teamKey];
            return newOpenAccordion;
        });
    };

    return (
        <div className='playx11'>
            {Object.keys(playingXIData).map((teamKey, index) => (
                <div key={teamKey} className="accordion" id={`accordion${teamKey}`} onClick={() => toggleAccordion(teamKey)}>
                    <div className="accordion-item">
                        <h5 className="mb-0" aria-expanded={openAccordion[teamKey]}>
                            {playingXIData[teamKey].short_name} PlayingXI
                        </h5>

                        {openAccordion[teamKey] && <hr/>}
                        <div className={`collapse${openAccordion[teamKey] ? ' show' : ''}`} id={`bd_innings${teamKey}`} data-bs-parent={`#accordion${teamKey}`}>
                            <div className="acr-body">
                                {playingXIData[teamKey].player.map((player, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px', padding: '0px 10px'}}>
                                        <img src={process.env.REACT_APP_IMG_FIX + player.image} alt={player.name} style={{ width: '35px', height: '35px', marginRight: '10px', borderRadius: '100%', border:"2px solid #d5d5d5" }} />
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
