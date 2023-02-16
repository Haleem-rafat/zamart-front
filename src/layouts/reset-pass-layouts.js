import { Route, Switch } from "react-router-dom";
import ResetPasswordPage from "../page/auth/reset-password-page";
import routes from "../routes";

const ResetPassLayouts = () => {
  return (
    <div className="">
      <Switch>
        <Route
          path={routes.auth.resetpass.reset}
          component={ResetPasswordPage}
        />
      </Switch>
    </div>
  );
};

export default ResetPassLayouts;
