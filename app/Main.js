import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateContext from "./StateContext";
import DoActionContext from "./DoActionContext";
import Axios from "axios";

// My Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeGuest from "./components/HomeGuest";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePosts from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import Notification from "./components/Notification";
import UserDashboard from "./components/UserDashboard";

Axios.defaults.baseURL = "http://localhost:8080";

function AppMain() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("_appToken")),
    flashNotification: [],
    user: {
      token: localStorage.getItem("_appToken"),
      username: localStorage.getItem("_appUsername"),
      avatar: localStorage.getItem("_appAvatar")
    }
  };

  function appReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        break;
      case "logout":
        draft.loggedIn = false;
        break;
      case "flashNotification":
        draft.flashNotification.push(action.value);
        break;
    }
  }
  const [state, doAction] = useImmerReducer(appReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("_appToken", state.user.token);
      localStorage.setItem("_appUsername", state.user.username);
      localStorage.setItem("_appAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("_appToken");
      localStorage.removeItem("_appUsername");
      localStorage.removeItem("_appAvatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DoActionContext.Provider value={doAction}>
        <BrowserRouter>
          <Notification flashNotification={state.flashNotification} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/create-post" element={<CreatePosts />} />
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard/:userName/" element={<UserDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DoActionContext.Provider>
    </StateContext.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AppMain />);
