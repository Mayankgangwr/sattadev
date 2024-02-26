import useService from "../Service/useService";

class GameController {
    colleactionRef;
    constructor() {
        // Initialize the custom hook for the "games" collection
        this.colleactionRef = useService("games");
    }
    async addGame(gameData) {
        try {
            const gamedata = {
                name: gameData.gameName,
                time: gameData.gametime,
                newresult: "",
                oldresult: "",
                waiting: 0,
                updateat: gameData.gametime,
            }
            return await this.colleactionRef.addDocument(gamedata);
        } catch (err) {
            console.log("Firestore service :: createGame :: errr", err);
        }
    }

    async updateGame(documentID, gameData) {
        try {
            const gamedata = {
                name: gameData.name,
                time: gameData.time,
                newresult: gameData.newresult,
                oldresult: gameData.oldresult,
                waiting: gameData.waiting,
                updateat: gameData.updateat,
            };
            return await this.colleactionRef.updateDocument(documentID, gamedata);
        } catch (err) {
            console.log("Firestore service :: updateGame :: errr", err);
        }
    }

    async deleteGame(documentID) {
        try {
            await this.colleactionRef.deleteDocument(documentID);
            return true;
        } catch (err) {
            console.log("Firestore service :: deleteGame :: errr", err);
            return false;
        }
    }

    async getGames(queryOptions = null) {
        try {
            return await this.colleactionRef.getDocuments(queryOptions);
        } catch (err) {
            console.log("Firestore service :: getGames :: errr", err);
            return null;
        }
    }
    
    async getGame(documentID) {
        try {
            return await this.colleactionRef.getDocument(documentID);
        } catch (err) {
            console.log("Firestore service :: getGame :: errr", err);
            return null;
        }
    }
}
const gameController = new GameController();
export default gameController;