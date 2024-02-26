import { auth } from "./Config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

/**
 * @class AuthService
 * @description Authenticate user with Firebase
 */
class AuthService {
    /**
     * @function createAccount
     * @description Create a new user account
     * @param {object} userData - user data
     * @param {string} userData.email - user email
     * @param {string} userData.password - user password
     * @returns {Promise<UserCredential | null>}
     */
    async createAccount(userData) {
        try {
            const { email, password } = userData;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                console.log("User account created:", userCredential.user.email);
                await this.login(userData);
                return userCredential;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error creating user account:", error.message);
            throw error;
        }
    }

    /**
     * @function login
     * @description Login user with Firebase
     * @param {object} userData - user data
     * @param {string} userData.email - user email
     * @param {string} userData.password - user password
     * @returns {Promise<UserCredential | null>}
     */
    async login(userData) {
        try {
            const { email, password } = userData;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user.email);
            return userCredential;
        } catch (error) {
            console.error("Error logging in:", error.message);
            throw error;
        }
    }

    /**
     * @function getCurrentUser
     * @description Get the current user
     * @returns {Promise<User | null>}
     */
    async getCurrentUser() {
        try {
            return new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe(); // Unsubscribe after getting the user once
                    resolve(user);
                }, reject);
            });
        } catch (error) {
            console.error("Error getting current user:", error.message);
            throw error;
        }
    }

    /**
     * @function logout
     * @description Logout the current user
     * @returns {Promise<void>}
     */
    async logout() {
        try {
            await signOut(auth);
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out:", error.message);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
