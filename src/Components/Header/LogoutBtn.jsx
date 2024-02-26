import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store"
import {authService} from "../../Firestore";
import { Link } from "react-router-dom";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((err) => {
            console.log("Firestore authService :: logout :: errr", err);
        });
    }

    return (
        <Link className="dropdown-item" to="#" onClick={() => logoutHandler()}>
            Logout
        </Link>
    )
};

export default LogoutBtn;