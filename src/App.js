import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch } from "react-router-dom";
import { useLanguage } from "./context/language-context";
import AuthSidebarLayouts from "./layouts/auth-sidebar-layouts";
import ResetPassLayouts from "./layouts/reset-pass-layouts";
import Home from "./page/app/home-page/home";
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="">
      <Switch>
        <Route path={routes.app.default} component={AuthSidebarLayouts} />
        <Route
          path={routes.auth.resetpass.default}
          component={ResetPassLayouts}
        />
        <Redirect to={routes.app.home} component={Home} />
      </Switch>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "text-xl p-4",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
