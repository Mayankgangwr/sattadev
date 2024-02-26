import useService from "../Service/useService";
import gameController from "./gameController";
import { firestore } from "../Config";
import { collection, where, query, orderBy } from "firebase/firestore";
import moment from "moment";
class ResultChartController {
    colleactionRef;
    constructor() {
        this.colleactionRef = useService("resultChart");
    }
    //Add and Update both operations will work on the same function
    async addResult(gameData) {
        try {
            const { gameId, result } = gameData;
            const currDateTime = new Date(moment().format('MM-DD-YYYY hh:mm A')).getTime();
            const currDate = new Date(moment().format('MM-DD-YYYY')).getTime();
            const gamedata = await gameController.getGame(gameId);
            const game = gamedata.data();
            await gameController.updateGame(gameId, { ...game, newresult: result, oldresult: game.newresult, updateat: currDateTime, waiting: 0 });
            const data = await this.colleactionRef.getDocuments(where("currDate", "==", currDate));
            if (data.empty) {
                const gamedata = {
                    currDate: currDate,
                    games: {
                        [gameId]: result,
                    }
                }
                await this.colleactionRef.addDocument(gamedata);
            } else {
                let games = null;
                let documentID = null;
                data.forEach((el) => {
                    games = el.data().games;
                    documentID = el.id;
                })
                const gamedata = {
                    currDate: currDate,
                    games: {
                        ...games,
                        [gameId]: result,
                    }
                }
                await this.colleactionRef.updateDocument(documentID, gamedata);
                return true;
            }
        } catch (error) {
            console.log("Firestore service :: AddResult :: error", error);
            throw false;
        }
    }

    async getResults(queryOptions = null) {
        try {
            const data = await this.colleactionRef.getDocumentsWithMultipleQuery(queryOptions);
        } catch (err) {
            console.log("Firestore service :: getResult :: errr", err);
            return null;
        }
    }

    async liveGamesStatus() {
        try {
            const gamesData = await gameController.getGames();
            let allGamesData = [];
            gamesData.forEach((gamesData) => {
                allGamesData.push({ id: gamesData.id, value: gamesData.data() });
            });
            const lastUpdate = await allGamesData.sort((gameData1, gameData2) => gameData2.value.updateat - gameData1.value.updateat)[0];

            const upcoming = await allGamesData.filter((gameData) => {
                const currTime = new Date().getTime();
                const gameTime = new Date(`${moment().format('MM-DD-YYYY')} ${gameData.value.time}`).getTime();
                return gameTime > currTime;
            }).sort((gameData1, gameData2) => gameData1.value.time - gameData2.value.time)
                .slice(0, 3);

            const waiting = await allGamesData.filter((gameData) => {
                const currTime = new Date().getTime();
                const gameTime = new Date(`${moment().format('MM-DD-YYYY')} ${gameData.value.time}`).getTime();
                const hasWaitingTime = gameData.value.waiting != 0;
                return gameTime < currTime && !hasWaitingTime;
            }).sort((gameData1, gameData2) => gameData1.value.time - gameData2.value.time)
                .slice(0, 3);
            return { lastUpdate, upcoming, waiting };

        } catch (err) {
            console.log("Firestore service :: liveGamesStatus :: errr", err);
            return null;
        }
    }

    async getAllDataForYear(year, month) {
        let startDate = new Date(`${year}-01-01`).getTime();
        let endDate = new Date(`${year + 1}-01-01`).getTime();
        let queryOptions;
        if (month !== undefined) {
            startDate = new Date(year, month, 1).getTime();
            endDate = new Date(year, month + 1, 1).getTime();
        }
        queryOptions = query(collection(firestore, "resultChart"), where("currDate", ">=", startDate), where("currDate", "<=", endDate), orderBy("currDate", "asc"));
        try {
            const resultsData = await this.colleactionRef.getDocumentsWithMultipleQuery(queryOptions);
            if (!resultsData.empty) {
                const data = {};
                resultsData.forEach((resultData) => {
                    const entry = resultData.data();
                    data[moment(entry.currDate).format("DD-MM-YYYY")] = entry.games;
                });
                return data;
            } else {
                console.log(`No data found for the year ${year}`);
                return {};
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    };

  

}
const resultChartController = new ResultChartController();
export default resultChartController;