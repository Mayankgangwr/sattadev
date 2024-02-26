import cssStyle from './HistoryChart.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

const HistoryChart = () => {
    const years = [2019, 2020, 2021, 2022, 2023, 2024];
    return (
        <div className={`${cssStyle.HistoryChart}`}>
            <h1 className={`${cssStyle.Heading} bg-info text-light`}>ONLINE SATTA LIVE RESULT</h1>
            <div className={`container-fluid bg-light py-2`}>
                <div className={`row border-bottom-1`}>
                    {years && years.map((year, index) => (
                        <div key={index} className={`${cssStyle.Column} col-6 border-bottom border-1`}>
                            <span className={`${cssStyle.GameName}`}>{`Satta king`}</span>
                            <Link className={`nav-link`} to={`/yearchart/${year}`}><span className={`${cssStyle.GameChart} text-danger`}>{`Satta king charts ${year}`}</span></Link>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};
export default HistoryChart;

