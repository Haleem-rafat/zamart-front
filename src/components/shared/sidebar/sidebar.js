import React, { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Off, On } from "../../../redux/sidebare-slice.js";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes.js";
import Home from "../../../page/app/home-page/home.js";
import Login from "../../auth-components/login.js";
import SignUp from "../../auth-components/signup.js";
import ReserPassComponents from "../../reset-pass-components/reser-pass-components.js";
import AddAds from "../../../page/app/add-ads/add-ads-old.js";
import Footer from "../../home-components/footer.js";
import HeaderHome from "../../home-components/header.js";
import MyProfile from "../../../page/app/profile-page/my-profile.js";

const AuthSidebar = ({ isreset }) => {
  const toggleDeleteStatus = useSelector(
    (state) => state.toggle.enableDeleteButton
  );
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  if (isreset === "reset") {
    dispatch(On());
  }

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
          <div className="w-full mx-auto ">
            {isreset === "reset" ? (
              <div className="">
                <ReserPassComponents />
              </div>
            ) : (
              <>
                <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
              </>
            )}
          </div>
        </Sidebar>

        <Sidebar.Pusher
          className="bg-primary-black-light p-0 m-0 border-none  border-0  "
          dimmed={toggleDeleteStatus}
        >
          <div className="p-0 m-0 border-none ">
            <Segment basic>
              <HeaderHome />
              <Switch>
                <Route path={routes.app.home} component={Home} />
                <Route path={routes.app.ceratitems} component={AddAds} />
                <Route path={routes.app.myProfile} component={MyProfile} />
              </Switch>
              <Footer />
            </Segment>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default AuthSidebar;
