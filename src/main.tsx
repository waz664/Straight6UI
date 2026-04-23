import React from "react";
import ReactDOM from "react-dom/client";
import { ExampleWebApp } from "./demo/ExampleWebApp";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ExampleWebApp />
  </React.StrictMode>,
);
