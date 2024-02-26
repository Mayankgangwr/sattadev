import React, { useEffect, useState } from "react";
import { Button, DarkAdsCard, LightAdsCard, LiveResult, GameChartTable } from "../../Components";
import { resultChartController } from "../../Firestore";
import { useSelector, useDispatch } from "react-redux";
import cssStyle from './GameChart.module.scss';
import { useParams } from "react-router-dom";
import { setFullYearResult } from "../../Store";


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const GameChart = () => {
  const { gamename } = useParams();
  const year = new Date().getFullYear();
  const dispatch = useDispatch();
  const getFullYearRestult = async (year) => {
    try {
      const resultsData = await resultChartController.getAllDataForYear(year);
      dispatch(setFullYearResult(resultsData));
    } catch (error) {
      console.error('Error fetching current month restult data:', error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await getFullYearRestult(year);
    }
    fetchData();
  }, [year]);

  const authStatus = useSelector((state) => state.auth.status);
  const lightCardsData = useSelector((state) => state.lightCards.cardsData);
  const darkCardsData = useSelector((state) => state.darkCards.cardsData);
  const results = useSelector((state) => state.result.fullYearResult);
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
      <LiveResult />
      {results && gamename && <GameChartTable key={0} gamename={gamename} months={months.slice(0, 6)} year={year} results={results} />}
      {results && gamename && <GameChartTable key={1} gamename={gamename} months={months.slice(6)} year={year} results={results} />}
    </>
  );
}

export default GameChart;
