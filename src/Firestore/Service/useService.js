import { firestore } from "../Config";
import { collection, doc, addDoc, setDoc, deleteDoc, getDocs, getDoc, where, query } from "firebase/firestore";

/**
 * Custom hook to manage Firestore operations for collections and documents
 * @param {string} collectionName - Name of the Firestore collection
 * @returns {Object} - Object containing Firestore operations for the specified collection or document
 */
function useService(collectionName) {
    const collectionRef = collection(firestore, collectionName);

    return {
        addDocument: async (data) => {
            try {
                return await addDoc(collectionRef, data);
            } catch (error) {
                console.error(`Error adding document to ${collectionName}:`, error);
                throw error;
            }
        },
        updateDocument: async (documentID, data) => {
            try {
                const documentRef = doc(collectionRef, documentID);
                return await setDoc(documentRef, data);
            } catch (error) {
                console.error(`Error updating document in ${collectionName}:`, error);
                throw error;
            }
        },
        deleteDocument: async (documentID) => {
            try {
                const documentRef = doc(collectionRef, documentID);
                await deleteDoc(documentRef);
                return true;
            } catch (error) {
                console.error(`Error deleting document from ${collectionName}:`, error);
                return false;
            }
        },
        getDocumentsWithMultipleQuery: async (queryOptions = null) => {
            try {
                const q = queryOptions ? queryOptions : collectionRef;
                return await getDocs(q);
            } catch (error) {
                console.error(`Error getting documents from ${collectionName}:`, error);
                return null;
            }
        },
        getDocuments: async (queryOptions = null) => {
            try {
                const q = queryOptions ? query(collectionRef, queryOptions): collectionRef;
                return await getDocs(q);
            } catch (error) {
                console.error(`Error getting documents from ${collectionName}:`, error);
                return null;
            }
        },
        getDocument: async (documentID) => {
            try {
                const documentRef = doc(collectionRef, documentID);
                return await getDoc(documentRef);
            } catch (error) {
                console.error(`Error getting document from ${collectionName}:`, error);
                return null;
            }
        }
    };
}

export default useService;
