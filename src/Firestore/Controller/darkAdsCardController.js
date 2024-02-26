import useService from "../Service/useService";

class DarkAdsCardController {
    colleactionRef;
    constructor() {
        // Initialize the custom hook for the "games" collection
        this.colleactionRef = useService("darkads");
    }

    async addCard(adsData) {
        try {
            const adsdata = {
                owner: adsData.owner,
                message: adsData.message,
                mobileno: adsData.mobileno,
                whatsapp: adsData.whatsapp,
                telegram: adsData.telegram,
                position: adsData.position,
                create: adsData.create,
                expire: adsData.expire,
            }
            return await this.colleactionRef.addDocument(adsdata);
        } catch (error) {
            console.log("Firestore service :: createCard :: error", error);
            throw error;
        }
    }

    async updateCard(documentID, adsData) {
        try {
            const adsdata = {
                owner: adsData.owner,
                message: adsData.message,
                mobileno: adsData.mobileno,
                whatsapp: adsData.whatsapp,
                telegram: adsData.telegram,
                position: adsData.position,
                create: adsData.create,
                expire: adsData.expire
            }
            return await this.colleactionRef.updateDocument(documentID, adsdata);
        } catch (error) {
            console.log("Firestore service :: updateCard :: error", error);
            throw error;
        }
    }

    async deleteCard(documentID) {
        try {
            return await this.colleactionRef.deleteDocument(documentID);
        } catch (error) {
            console.log("Firestore service :: deleteCard :: error", error);
            throw error;
        }
    }

    async getCards(queryOptions= null) {
        try {
            return await this.colleactionRef.getDocuments(queryOptions);
        } catch (error) {
            console.log("Firestore service :: getCards :: error", error);
            return null;
        }
    }

    async getCard(documentID) {
        try {
            return await this.colleactionRef.getDocument(documentID);
        } catch (error) {
            console.log("Firestore service :: getCard :: error", error);
            return null;
        }
    }
}

const darkAdsCardController = new DarkAdsCardController();

export default darkAdsCardController;

