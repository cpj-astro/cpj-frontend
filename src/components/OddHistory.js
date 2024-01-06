import React from 'react'

export default function OddHistory({ oddHistoryData }) {
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
    console.log("SS", groupedByInnings);
    return (
        <>
           {Object.entries(groupedByInnings).map(([inning, items]) => {
                const inningTitle = toOrdinal(parseInt(inning));
                return (
                    <div key={inning} className="accordion" id={`accordion${inning}`}>
                        <div className="accordion-item">
                            <h5 className="" data-toggle="collapse" data-target={`#bd_innings${inning}`} aria-expanded="true">
                                {inningTitle} Inning
                            </h5>
                            <div id={`bd_innings${inning}`} className={`collapse${inning == 1 ? ' show' : ''}`} data-parent={`#accordion${inning}`}>
                                <div className="acr-body">
                                    <div className="card card-shadow p-0">
                                        <div className="table-responsive">
                                            <table className="widget-table table table-striped table-medium no-border">
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
        </>
    )
}
