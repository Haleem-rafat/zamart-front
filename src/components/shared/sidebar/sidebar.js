import React, { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Off } from "../../../redux/sidebare-slice.js";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes.js";
import Home from "../../../page/home.js";
import Login from "../../auth-components/login.js";
import SignUp from "../../auth-components/signup.js";

const AuthSidebar = () => {
  const toggleDeleteStatus = useSelector(
    (state) => state.toggle.enableDeleteButton
  );
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen p-0 m-0 border-none border-0 scrollbar-hide ">
      <Sidebar.Pushable className="p-0 m-0 border-none scrollbar-hide">
        <Sidebar
          className="p-0 m-0 border-none bg-black md:w-[600px] w-10/12 overflow-hidden"
          as={Menu}
          animation="overlay"
          inverted
          onHide={() => dispatch(Off())}
          vertical
          direction="right"
          visible={toggleDeleteStatus}
        >
          <div className="w-full mx-auto bg-black text-white ">
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
            <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
        </Sidebar>

        <Sidebar.Pusher
          className="bg-primary-black-light p-0 m-0 border-none  border-0  "
          dimmed={toggleDeleteStatus}
        >
          <div className="p-0 m-0 border-none ">
            <Segment basic>
              <Switch>
                <Route path={routes.app.home} component={Home} />
              </Switch>
            </Segment>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default AuthSidebar;
