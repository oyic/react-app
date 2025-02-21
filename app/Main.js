import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeGuest from "./components/HomeGuest";

function AppMain() {
  return (
    <>
    <Header />

    <HomeGuest />

    <Footer />
   
   </>
  )
}
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AppMain />);


