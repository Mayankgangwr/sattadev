import React, { useEffect, useState } from "react";
import cssStyle from './Result.module.scss';
import moment from "moment";
import CountdownTimer from "./CheckRemaning";
import { useSelector } from "react-redux";
import classNames from 'classnames';

const LiveResult = () => {
    const [currentTime, setCurrentTime] = useState(moment());
    const liveResultStatus = useSelector((state) => state.result.liveResult);
    const { waiting, upcoming, lastUpdate } = liveResultStatus;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.format('MMM D, YYYY hh:mm:ss A');

    const renderLastUpdate = (lastUpdate) => (
            <div className={classNames(cssStyle.GameSection)}>
                <span className={`${cssStyle.Game} text-light`}>{lastUpdate.value.name}</span>
                <span className={`${cssStyle.Result} text-warning`}>{lastUpdate.value.newresult}</span>
                <button className={`${cssStyle.Btn} btn btn-danger`}>{`${lastUpdate.value.name} Chart 2023`}</button>
            </div>
    );

    const renderWaitingGames = () => (
        waiting.length > 0 && waiting.map((data) => (
            <div className={classNames(cssStyle.GameSection)} key={data.value.name}>
                <span className={`${cssStyle.Game} text-light`}>{data.value.name}</span>
                <CountdownTimer isWaiting={true} targetDate={data.value.waiting} />
                <button className={`${cssStyle.Btn} btn btn-danger`}>{`${data.value.name} Chart 2023`}</button>
            </div>
        ))
    );

    const renderUpcomingGames = () => (
        upcoming.length > 0 && upcoming.map((data) => (
            <div className={classNames(cssStyle.GameSection)} key={data.value.name}>
                <span className={`${cssStyle.Game} text-light`}>{data.value.name}</span>
                <CountdownTimer isWaiting={false} targetDate={new Date(`${moment().format('MM-DD-YYYY')} ${data.value.time}`).getTime()} />
                <button className={`${cssStyle.Btn} btn btn-danger`}>{`${data.value.name} Chart 2023`}</button>
            </div>
        ))
    );

    const renderButtonSection = () => (
        <div className={`${cssStyle.BtnLast}`}>
            <button className={`btn btn-danger`}>ONLINE सट्टा खेलने के लिए यहाँ CLICK करे📱</button>
        </div>
    );

    return (
        <div className={`${cssStyle.LiveResultSection} card px-4 py-3 bg-dark mt-1`}>
            <span className={`${cssStyle.Title} text-warning`}>सबसे पहले सबसे तेज़ रिजल्ट वाली सट्टा साइट</span>
            <span className={`${cssStyle.Time} text-light`}>{formattedTime}</span>

            {renderLastUpdate(lastUpdate)}
            {waiting.length > 0 && renderWaitingGames()}
            {upcoming.length > 0 && renderUpcomingGames()}
            {renderButtonSection()}
        </div>
    );
};

export default LiveResult;
