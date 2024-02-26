import useService from "../Service/useService";
import gameController from "./gameController";
import { firestore } from "../Config";
import { collection, where, query, orderBy } from "firebase/firestore";
import moment from "moment";
class AddResultInRangeController {
    colleactionRef;
    constructor() {
        this.colleactionRef = useService("resultChart");
    }

    async gamesResultDataGenerator(resultDate, gameId = null) {
        const resultData = await this.colleactionRef.getDocuments(where("currDate", "==", resultDate));
        let documentID = null;
        let gamedata = {
            currDate: resultDate,
            games: null,
        }
        if (resultData.empty) {
            if (gameId) {
                gamedata = {
                    currDate: resultDate,
                    games: {
                        ...gamedata.games,
                        [gameId]: Math.floor(Math.random() * 100),
                    }
                }
            } else {
                const gamesdata = await gameController.getGames();
                gamesdata.forEach((gameData) => {
                    gamedata = {
                        currDate: resultDate,
                        games: {
                            ...gamedata.games,
                            [gameData.id]: Math.floor(Math.random() * 100),
                        }
                    }
                });
            }

            await this.colleactionRef.addDocument(gamedata);
        } else {
            resultData.forEach((resultData) => {
                gamedata = {
                    currDate: resultDate,
                    games: resultData.data().games
                }
                documentID = resultData.id;
            });
            if (gameId) {
                gamedata = {
                    currDate: resultDate,
                    games: {
                        ...gamedata.games,
                        [gameId]: Math.floor(Math.random() * 100),
                    }
                }
            } else {
                const gamesdata = await gameController.getGames();
                gamesdata.forEach((gameData) => {
                    if (gamedata.games[gameData.id] === undefined) {
                        gamedata = {
                            currDate: resultDate,
                            games: {
                                ...gamedata.games,
                                [gameData.id]: Math.floor(Math.random() * 100),
                            }
                        }
                    }
                })
            }
            await this.colleactionRef.updateDocument(documentID, gamedata);
        }
        return gamedata;
    }

    async addResult(startDate, endDate, gameId = null) {
        let currDate = new Date(startDate);
        while (currDate < endDate) {
            const timestamp = new Date(moment(currDate).format("MM-DD-YYYY")).getTime();
            await this.gamesResultDataGenerator(timestamp, gameId);

            currDate.setDate(currDate.getDate() + 1); // Move to the next date
        }
    }
}


const addResultInRangeController = new AddResultInRangeController();
export default addResultInRangeController;
