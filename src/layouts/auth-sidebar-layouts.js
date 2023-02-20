import React, { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Off, On } from "../redux/sidebare-slice.js";
import Login from "../components/auth-components/login.js";
import SignUp from "../components/auth-components/signup.js";
import HeaderHome from "../components/home-components/header.js";
import { Route, Switch } from "react-router-dom";
import routes from "../routes.js";
import Footer from "../components/home-components/footer.js";
import Home from "../page/app/home-page/home.js";
import MyProfile from "../page/app/profile-page/my-profile.js";
import SelectCategories from "../page/app/add-ads/select-categories.js";
import SelectSubCategories from "../page/app/add-ads/select-sub-category.js";
import SelectComplementCategory from "../page/app/add-ads/select-complement-category.js";
import AddDescription from "../page/app/add-ads/add-description.js";
import UploadImage from "../page/app/add-ads/upload-Image.js";

const AuthSidebarLayouts = ({ isreset }) => {
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
            <>
              <Login isLogin={isLogin} setIsLogin={setIsLogin} />
              <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
            </>
          </div>
        </Sidebar>

        <Sidebar.Pusher
          className="bg-primary-black-light p-0 m-0 border-none  border-0  "
          dimmed={toggleDeleteStatus}
        >
          <div className="p-0 m-0 border-none  ">
            <Segment basic>
              <HeaderHome />
              <Switch>
                <Route path={routes.app.home} component={Home} />
                <Route path={routes.app.myProfile} component={MyProfile} />
                <Route
                  path={routes.app.ceratitems.selectCategory}
                  component={SelectCategories}
                />
                <Route
                  path={routes.app.ceratitems.selectSubCategory()}
                  component={SelectSubCategories}
                />
                <Route
                  path={routes.app.ceratitems.selectComplementCategory()}
                  component={SelectComplementCategory}
                />
                <Route
                  path={routes.app.ceratitems.addDescription}
                  component={AddDescription}
                />
                <Route
                  path={routes.app.ceratitems.uploadImage}
                  component={UploadImage}
                />
              </Switch>
              <Footer />
            </Segment>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default AuthSidebarLayouts;