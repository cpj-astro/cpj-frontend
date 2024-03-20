import React, { useState } from 'react'

export default function OddHistory({ oddHistoryData }) {
    const [openAccordion, setOpenAccordion] = useState({});

    const groupedByInnings = oddHistoryData.reduce((acc, obj) => {
        // Use the inning as the key
        const key = obj.inning;
        
        // If the key doesn't exist in the accumulator, create it
        if (!acc[key]) {
            acc[key] = [];
        }
    
        // Push the current object into the appropriate array
        acc[key].push(obj);
    
        return acc;
    }, {});

    const toOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
           {Object.entries(groupedByInnings).map(([inning, items]) => {
                const inningTitle = toOrdinal(parseInt(inning));
                return (
                    <div key={inning} className="accordion" id={`accordion${inning}`} onClick={() => toggleAccordion(inning)}>
                        <div className="accordion-item">
                            <h5 className="mb-0" data-toggle="collapse" data-target={`#bd_innings${inning}`} aria-expanded={openAccordion[inning]}>
                                {inningTitle} Inning
                            </h5>
                            {openAccordion[inning] && <hr/>}
                            <div id={`bd_innings${inning}`} className={`collapse${openAccordion[inning] ? ' show' : ''}`} data-bs-parent={`#accordion${inning}`}>
                                <div className="acr-body">
                                    <div className="p-0">
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    {items.map((item, index) => (
                                                        <tr>
                                                            <td className='text-center'>
                                                                <div className='fit-content'>
                                                                    <div><strong>{item.overs}</strong></div>
                                                                    <div className='m-time-set'><strong>{item.time}</strong></div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='fit-content'>
                                                                    <div className='fancy-min'><strong>{item.s_min}</strong></div>
                                                                    <div className='m-time-set fancy-max'><strong>{item.s_max}</strong></div>
                                                                </div>
                                                            </td>
                                                            <td><strong>{item.team}</strong></td>
                                                            <td className='text-center'>
                                                                <div className='m-1 fancy-b-min'>
                                                                    <strong>{item.min_rate}</strong>
                                                                </div>
                                                            </td>
                                                            <td className='text-center'>
                                                                <div className='m-1 fancy-b-max'>
                                                                    <strong>{item.max_rate}</strong>
                                                                </div>
                                                            </td>
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
                )
            })}
        </div>
    )
}
