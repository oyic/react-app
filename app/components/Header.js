import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderPublic from "./HeaderPublic";
import HeaderPrivate from "./HeaderPrivate";
import StateContext from "../StateContext";

function Header(props) {
  const appState = useContext(StateContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(appState.loggedIn);
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {appState.loggedIn ? <HeaderPrivate /> : <HeaderPublic />}
      </div>
    </header>
  );
}
export default Header;
