import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StorageProvider } from "./context/StorageContext";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <StorageProvider>
    <App />
  </StorageProvider>,
  document.getElementById("root")
);
