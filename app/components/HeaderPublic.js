import React, { useState, useContext } from "react";
import Axios from "axios";
import DoActionContext from "../DoActionContext";

function HeaderPublic(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const appDoAction = useContext(DoActionContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", {
        username,
        password
      });
      if (response.data) {
        appDoAction({ type: "login", data: response.data });
        appDoAction({
          type: "flashNotification",
          value: "You have been logged in."
        });
      } else {
        console.log("Incorrect username / password.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => setUsername(e.target.value)}
            id="username"
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => setPassword(e.target.value)}
            id="password"
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderPublic;
