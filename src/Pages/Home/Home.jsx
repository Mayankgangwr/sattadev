import React from 'react';
import { useSelector } from 'react-redux';
import { DarkAdsCard, LightAdsCard, Button, Disclaimer, Footer, LiveResult, LiveChart, ResultChart, HistoryChart } from '../../Components';
import cssStyle from "./Home.module.scss";
import moment from 'moment';

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const lightCardsData = useSelector((state) => state.lightCards.cardsData);
  const darkCardsData = useSelector((state) => state.darkCards.cardsData);
  const currMonthResult = useSelector((state) => state.result.currMonth);
  const gamesData = useSelector((state) => state.games.gamesData);
  const iterations = gamesData ? Math.ceil(gamesData.length / 5) : 0;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  return (
    <>
      <div className={cssStyle.container}>
        <div className={cssStyle.scrollingText}>
          DISAWAR SATTA KING, SATTA KING UP, SATTA KING, SATTA KING DISAWAR, SATTA KING 786, SATTA KING GALI, SATTA KING FAST, SATTA KING RESULT, BLACK SATTA KING, SATTA KING CHART, DELHI SATTA KING
        </div>
      </div>
      <Button text="सट्टा-लीक जोड़ी CLICK" btnClass="btn-warning" />
      <DarkAdsCard authStatus={authStatus} position={0} adsData={darkCardsData[0]} />
      <LightAdsCard authStatus={authStatus} position={0} adsData={lightCardsData[0]} />
      <LightAdsCard authStatus={authStatus} position={1} adsData={lightCardsData[1]} />
      <DarkAdsCard authStatus={authStatus} position={1} adsData={darkCardsData[1]} />
      <LiveResult />
      <LightAdsCard authStatus={authStatus} position={2} adsData={lightCardsData[2]} />
      <Button text="🤩 WWW.SATTA-PLAYER.IN🤩 फ्री गेम पोस्ट वेबसाइट" btnClass="btn-info" />
      <LightAdsCard authStatus={authStatus} position={3} adsData={lightCardsData[3]} />
      <LiveChart />
      <DarkAdsCard authStatus={authStatus} position={2} adsData={darkCardsData[2]} />
      <LightAdsCard authStatus={authStatus} position={4} adsData={lightCardsData[4]} />
      <LightAdsCard authStatus={authStatus} position={5} adsData={lightCardsData[5]} />
      <LightAdsCard authStatus={authStatus} position={6} adsData={lightCardsData[6]} />
      {currMonthResult && gamesData && gamesData.length > 5 ?
        Array.from({ length: iterations }).map((_, index) => (
          <ResultChart key={index} tableData={currMonthResult} gamesData={gamesData.slice(index * 5, index * 5 + 5)} month={(month + 1)} year={year} forMonth={true} />
        )) :
        <ResultChart key={`index`} tableData={currMonthResult} gamesData={gamesData} month={(month + 1)} year={year} forMonth={true} />
      }
      <HistoryChart />
      <LightAdsCard authStatus={authStatus} position={7} adsData={lightCardsData[7]} />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default Home;
