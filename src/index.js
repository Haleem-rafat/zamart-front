import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { LanguageProvider } from "./context/language-context";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/auth-context";
import ScrollToTop from "../src/hooks/scrool-top.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
