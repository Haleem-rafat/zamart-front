import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthSidebar from "./components/sidebar/sidebar";
import { useLanguage } from "./context/language-context";
import AppLayouts from "./layouts/app-layouts";
import Home from "./page/home";
import routes from "./routes";

function App() {
  const [lang] = useLanguage();
  useEffect(() => {
    const directionTag = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const style = document.getElementById("semanticStyle");
    if (directionTag === "ltr") {
      style.href = "/assets/css/semantic.min.css";
    } else {
      style.href = "/assets/css/semantic.rtl.min.css";
    }
  }, [lang]);

  return (
    <div className="">
      <Switch>
        <Route path={routes.app.default} component={AppLayouts} />
        <Redirect to={routes.app.home} component={Home} />
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
    </div>
  );
}

export default App;
