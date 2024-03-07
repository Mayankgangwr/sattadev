import React from 'react';
import { useSelector } from 'react-redux';
import { Footer, LiveChart } from '../../Components';
import cssStyle from "./Games.module.scss"

const Games = () => {
    const authStatus = useSelector((state) => state.auth.status);
    return (
        <>
            <div className={cssStyle.container}>
                <div className={cssStyle.gamesHeader}>
                    <button className={`btn btn-primary ${cssStyle.btn}`}>New Game</button>
                </div>
                <LiveChart authStatus={authStatus} />
            </div>
            <Footer />
        </>
    );
};
export default Games;
