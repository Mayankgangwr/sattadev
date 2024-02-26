import moment from 'moment';
import cssStyle from './Result.module.scss';
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, isWaiting }) => {
    const calculateTimeRemaining = () => {
        const now = moment();
        const targetDateTime = moment(targetDate);
        const duration = moment.duration(targetDateTime.diff(now));
        return {
            hours: duration.hours(),
            minutes: duration.minutes(),
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {isWaiting ?
                (
                    <span className={`${cssStyle.Late} text-danger`}>{`Result is late by Company Wait: ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes`}</span>
                ) : (
                    <span className={`${cssStyle.Waiting}`}>{`Remaining Time For Result Update: ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes`}</span>
                )
            }
        </>
    );
};

export default CountdownTimer;
