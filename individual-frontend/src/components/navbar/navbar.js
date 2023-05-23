import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import '../sass/_navbar.css';
import { useTranslation } from "react-i18next";
import Flags from 'country-flag-icons/react/3x2'
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../images/full.jpg";


function Topnav() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    console.log(user)
    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin,
        });

    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    return (
        <Navbar className="navbarTop" collapseOnSelect expand="md" bg="white" variant="light">
            <Navbar.Brand href="/">
                <img
                    alt="logo"
                    src={logo}
                    width="auto"
                    height="40"
                    className="d-inline-block align-center"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <input type="text" className="search-click" name="" placeholder={t("navbar.search")} />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <div className="buttons"><a><Icon.HouseFill className="IconSelectedButton" />{t("navbar.button1")}</a></div>
                    <a className="buttons" ><Icon.CompassFill className="IconSelectedButton" />{t("navbar.button3")}</a>

                    {isAuthenticated && (
                        <a className="buttons"><Icon.PersonFill className="IconSelectedButton" />{t("navbar.button2")}</a>
                    )}
                </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                <Nav.Link className="navbar-title" href="#"><Icon.Bell /></Nav.Link>
                {/* show if NOT authenticated */}
                {!isAuthenticated && (
                    < Nav.Link className="navbar-title" onClick={() => loginWithRedirect()}><Icon.PersonCircle className="profile" /></Nav.Link>
                )}

                {/* Fullsize dropdown: show if authenticated */}
                {isAuthenticated && (
                    <NavDropdown title={
                            <img src={user.picture}
                                alt="Profile"
                                className="nav-user-profile rounded-circle"
                                width="30"
                            />
                    }
                        show={show}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                        align="end"
                    >

                        <NavDropdown.Header>
                            {user.name}
                        </NavDropdown.Header>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/Profile">{t("profile.profile")}</NavDropdown.Item>
                        <Flags.GB className="navbar-flag" onClick={() => changeLanguage("en")} />
                        <Flags.NL className="navbar-flag" onClick={() => changeLanguage("nl")} />
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="logout" onClick={() => logoutWithRedirect()}>{t("profile.logout")}</NavDropdown.Item>
                    </NavDropdown>
                )}
            </Navbar.Collapse>
        </Navbar >
    );
}

export default Topnav;
