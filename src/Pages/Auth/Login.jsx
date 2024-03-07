import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cssStyle from "./Auth.module.scss";
import { authService } from "../../Firestore";
import { login, logout } from "../../Store";
import { useSelector, useDispatch } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const [email, setEmail] = useState('iammayankgangwarbly@gmail.com');
    const [password, setPassword] = useState('Prince@99');
    useEffect(() => {
        authStatus && navigate('/');
    }, [authStatus]);

    const fetchUserData = async () => {
        try {

            const userData = await authService.getCurrentUser();
            if (userData) {
                const {
                    uid,
                    email,
                    displayName,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    metadata: { creationTime, lastSignInTime },
                    providerData,
                    accessToken,
                    refreshToken
                } = userData;

                const formattedUserData = {
                    uid,
                    email,
                    displayName,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    metadata: { createdAt: creationTime, lastLoginAt: lastSignInTime },
                    providerData: providerData.map(({ providerId, email, displayName, phoneNumber }) => ({
                        providerId,
                        email,
                        displayName,
                        phoneNumber
                    })),
                    accessToken,
                    refreshToken
                };

                dispatch(login({ userdata: formattedUserData }));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            dispatch(logout());
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const response = await authService.updateUserProfile("Prince Kurmi");
            const response = await authService.login({ email, password });
            if (response) {
                await fetchUserData();
            }
        } catch (error) {
            console.log(" Login error:" + error);

        }
    };


    return (
        <div className={`container-fluid mx-auto ${cssStyle.mainContainer}`}>
            <div className='row'>
                <div className='col-xl-3 col-md-4 col-10 mx-auto mt-5'>
                    <p className={`text-center ${cssStyle.FormHeader}`}>Welcome Back!</p>
                    <p className={`text-center text-muted ${cssStyle.FormDescription}`}>Simplify your workflow and boost your productivity with <Link to="/">SattaKing App. </Link> Get started for free</p>
                    <form className={cssStyle.authForm} onSubmit={handleSubmit}>
                        <div className={cssStyle.formGroup}>
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cssStyle.formGroup}>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={` text-end ${cssStyle.forgotPassword}`}>
                            <span className={`form-text text-dark`}>
                                Forgot Password?
                            </span>
                        </div>
                        <div className={cssStyle.formGroup}>
                            <button className={`btn btn-dark`}>Login</button>
                        </div>
                    </form>
                    <div className={`${cssStyle.authLogin}`}>
                        <div className={cssStyle.Headeing}>
                            <hr className={cssStyle.Hr}></hr>
                            <span className={`text-muted ${cssStyle.Hr}`}>or continue with</span>
                            <hr className={cssStyle.Hr}></hr>
                        </div>
                        <div className={cssStyle.thirdPartyLogin}>
                            <i className="fa-brands fa-google"></i>
                            <i style={{ fontSize: "18px" }} className="fa-brands fa-apple"></i>
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                    </div>
                    <div className={`${cssStyle.authFooter} fixed-bottom w-100 text-center mb-4`}>
                        <span>Not a member? <Link to="/signup">Register now</Link></span>
                    </div>

                </div>
            </div>
        </div>
    );

}
export default Login;