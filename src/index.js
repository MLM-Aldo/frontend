import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

axios.interceptors.request.use(
  (config) => {
    // if content-type is not set, set it to application/json
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers["authorization"] = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
