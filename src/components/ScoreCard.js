import React, { useState } from 'react';

const Scorecard = ({ scorecardData }) => {
    const [openAccordion, setOpenAccordion] = useState({});

    let scorecardValues = null;
    if(scorecardData && scorecardData.scorecard) {
        scorecardValues = Object.values(scorecardData.scorecard);
    } else {
        return
    }

    const toggleAccordion = (s_key) => {
        setOpenAccordion((prevState) => {
            // Close all accordions
            const newOpenAccordion = {};
            Object.keys(prevState).forEach(key => {
                newOpenAccordion[key] = false;
            });
            // Open the selected accordion
            newOpenAccordion[s_key] = !prevState[s_key];
            return newOpenAccordion;
        });
    };
    return (
        <div className='playx11'>
            {scorecardValues && scorecardValues.length > 0 && scorecardValues.map((data, index) => (
                <div key={index} className="accordion" id={`accordion${index + 1}`} onClick={() => toggleAccordion(index + 1)}>
                    <div className="accordion-item">
                        <h5 className="mb-0" data-toggle="collapse" data-target={`#bd_innings${index + 1}`} aria-expanded={openAccordion[index + 1]}>
                            {data.team && data.team.name ? (data.team.name + ' Innings') : ("Team " + (index+1))}
                        </h5>
                        {openAccordion[index + 1] && <hr/>}
                        <div id={`bd_innings${index + 1}`} className={`collapse${openAccordion[index + 1] ? ' show' : ''}`} data-bs-parent={`#accordion${index + 1}`}>
                            <div className="acr-body">
                                <div className="p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Batsmen</th>
                                                    <th scope="col">r</th>
                                                    <th scope="col">b</th>
                                                    <th scope="col">4s</th>
                                                    <th scope="col">6s</th>
                                                    <th scope="col">sr</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.batsman && data.batsman.length > 0 && data.batsman.map((batsman, i) => (
                                                    <tr>
                                                        <td>
                                                            <div><strong>{batsman.name}</strong></div>
                                                            <div className='outby-set'>{batsman.out_by}</div>
                                                        </td>
                                                        <td><strong>{batsman.run}</strong></td>
                                                        <td>{batsman.ball}</td>
                                                        <td>{batsman.fours}</td>
                                                        <td>{batsman.sixes}</td>
                                                        <td>{batsman.strike_rate}</td>
                                                    </tr>
                                                ))}
                                                <tr className="score-text-bold">
                                                    <td colSpan={6}>
                                                        <div className='extras-set'>
                                                            Extras : {data.team && data.team.extras ? data.team.extras : ''}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Bowlers</th>
                                                    <th scope="col">o</th>
                                                    <th scope="col">m</th>
                                                    <th scope="col">r</th>
                                                    <th scope="col">w</th>
                                                    <th scope="col">econ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.bolwer && data.bolwer.length > 0 && data.bolwer.map((bowler, i) => (
                                                    <tr>
                                                        <td><strong>{bowler.name}</strong></td>
                                                        <td><strong>{bowler.over}</strong></td>
                                                        <td>{bowler.maiden}</td>
                                                        <td>{bowler.run}</td>
                                                        <td>{bowler.wicket}</td>
                                                        <td>{bowler.economy}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Fall of wickets</th>
                                                    <th scope="col">Score</th>
                                                    <th scope="col">Over</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.fallwicket && data.fallwicket.length > 0 && data.fallwicket.map((fall, i) => (
                                                    <tr>
                                                        <td><strong>{fall.player}</strong></td>
                                                        <td><strong>{fall.score}/{fall.wicket}</strong></td>
                                                        <td>{fall.over}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Partnership</th>
                                                    <th scope="col">Run</th>
                                                    <th scope="col">Ball</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.partnership && data.partnership.length > 0 && data.partnership.map((partnership, i) => (
                                                    <tr>
                                                        <td><strong>{partnership.players_name}</strong></td>
                                                        <td><strong>{partnership.run}</strong></td>
                                                        <td>{partnership.ball}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Scorecard;
