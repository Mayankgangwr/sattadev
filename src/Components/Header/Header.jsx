import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
const Header = (logo) => {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const auth = useSelector((state) => state.auth);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary py-0">
                <div className="container-fluid my-0 py-0">
                    <Link className="navbar-brand py-0" to="/">
                        <img src="/logo.png" alt="logo" style={{ height: '55px', width: "100px" }} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        onClick={() => setNavbarToggle(!navbarToggle)}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{ display: navbarToggle ? 'block' : 'none' }} id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chart">
                                    Chart
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    onClick={() => setDropdownToggle(!dropdownToggle)}
                                    to="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {auth.status ? auth.userData.displayName : "Login"}
                                </Link>
                                <ul
                                    style={{ display: dropdownToggle ? 'block' : 'none' }}
                                    className="dropdown-menu bg-secondary"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    {auth.status ?
                                        <>
                                            <li>
                                                <Link className="dropdown-item" to="/games">
                                                    Games
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/results">
                                                    Result
                                                </Link>
                                            </li>
                                            <li>
                                                <LogoutBtn />
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li>
                                                <Link className="dropdown-item" to="/login">
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/signup">
                                                    Sign Up
                                                </Link>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Header;
