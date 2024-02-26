import { useEffect } from "react";
import { DarkAdsCard, LightAdsCard, LiveResult, ResultChart, Button } from '../../Components';
import { resultChartController, gameController } from "../../Firestore";
import { setGames, setFullYearResult } from "../../Store";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import cssStyle from "./YearChart.module.scss";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const YearChart = ({ user }) => {
    const { year } = useParams();
    const dispatch = useDispatch();

    const getFullYearRestult = async (year) => {
        const resultsData = await resultChartController.getAllDataForYear(year);
        dispatch(setFullYearResult(resultsData));
        try {
            const games = await gameController.getGames();
            let gamesData = [];
            games.forEach((game) => {
                gamesData.push({ id: game.id, value: game.data() });
            })
            dispatch(setGames(gamesData));
        } catch (error) {
            console.error('Error fetching current month restult data:', error);
        }
    }
    useEffect(() => {
        async function fetchData() {
            const resultYear = year === undefined ? new Date().getFullYear() : parseInt(year);
            await getFullYearRestult(resultYear);
        }
        fetchData();
    }, [year]);



    const authStatus = useSelector((state) => state.auth.status);
    const lightCardsData = useSelector((state) => state.lightCards.cardsData);
    const darkCardsData = useSelector((state) => state.darkCards.cardsData);
    const resultChartData = useSelector((state) => state.result.fullYearResult);
    const gameData = useSelector((state) => state.games.gamesData);

    const iterations = gameData ? Math.ceil(gameData.length / 5) : 0;

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
            {gameData && resultChartData ?
                months.map((month, index) => (
                    <ResultChart
                        key={`index`}
                        tableData={resultChartData}
                        gamesData={gameData}
                        month={index + 1}
                        year={year ? parseInt(year) : new Date().getFullYear()}
                        forMonth={false} />
                )) :
                null
            }
            {gameData && resultChartData && months.map((month, index) => {
                <ResultChart
                    key={`index`}
                    tableData={resultChartData}
                    gamesData={gameData}
                    month={(index + 1)}
                    year={year ? parseInt(year) : new Date().getFullYear()}
                    forMonth={false} />
                // gameData.length > 5 ? Array.from({ length: iterations }).map((_, Arrindex) => (
                //     <ResultChart key={Arrindex} tableData={resultChartData} gameData={gameData.slice(Arrindex * 5, Arrindex * 5 + 5)} month={(index + 1)} year={year ? parseInt(year) : 2023} forMonth={false} />
                // )) : (
                //     <ResultChart key={1} tableData={resultChartData} gameData={gameData} month={(index + 1)} year={year ? parseInt(year) : new Date().getFullYear()} forMonth={false} />
                // )
            }
            )}
        </>
    );
}
export default YearChart;