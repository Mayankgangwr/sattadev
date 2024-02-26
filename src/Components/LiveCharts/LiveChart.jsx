import { Link } from 'react-router-dom';
import cssStyle from './LiveChart.module.scss';
import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

const LiveChart = () => {
    const liveChartData = useSelector((state) => state.games.gamesData); 
    return (
        <div className={cssStyle.LiveChart}>
            <h1 className={`${cssStyle.Heading} bg-info text-light`}>ONLINE SATTA LIVE RESULT</h1>
            <table className={`${cssStyle.Table} table table-striped`}>
                <colgroup>
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th className={`bg-primary`} scope="col">Game</th>
                        <th className={`bg-primary`} scope="col">Yesterday</th>
                        <th className={`bg-primary`} scope="col">Today</th>
                        <th className={`bg-primary`} scope="col">Chart</th>
                    </tr>
                </thead>
                <tbody>
                    {liveChartData.length>0 && liveChartData.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td className={cssStyle.Game}>
                                    <span className={cssStyle.GameName}>{data.value.name}</span>
                                    <span className={cssStyle.GameTime}>
                                        {data.value.time}
                                    </span>
                                </td>
                                <td className={`text-danger`}>
                                    {data.value.oldresult !== null ? data.value.oldresult : "--"}
                                </td>
                                <td className={`text-warning`}>
                                    {data.value.newresult !== null ? data.value.newresult  : "--"}
                                </td>
                                <td>
                                    <Link className={`btn btn-danger fw-bold`} to={`/gamechart/${data.id}`}>Chart</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LiveChart;
