import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import DoActionContext from "../DoActionContext";
import StateContext from "../StateContext";

function HeaderPrivate(props) {
  const appDoAction = useContext(DoActionContext);
  const appState = useContext(StateContext);
  function handleLogout() {
    appDoAction({ type: "logout" });
    appDoAction({
      type: "flashNotification",
      value: "You have been logged out."
    });
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/dashboard/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderPrivate;
