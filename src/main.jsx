import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";
import "./styles/abstracts/_variables.scss";
import "./styles/abstracts/_mixins.scss";
import "./styles/base/_reset.scss";
import "./styles/main.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
