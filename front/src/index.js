import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "jquery/src/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import App from "./components/main/App";
import "./static/css/styles.css";
import Favicon from "react-favicon";
import Logo from "./static/images/logo_dicem.png";

ReactDOM.render(
  <HashRouter>
    <div>
      <Favicon url={Logo} />
      <App />
    </div>
  </HashRouter>,
  document.getElementById("react")
);
