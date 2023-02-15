import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { On, Off } from "../../redux/sidebare-slice.js";
import { Route, Switch } from "react-router-dom";
import routes from "../../routes.js";
import Home from "../../page/home.js";

const AuthSidebar = () => {
  const toggleDeleteStatus = useSelector(
    (state) => state.toggle.enableDeleteButton
  );
  const dispatch = useDispatch();

  return (
    <div className="relative  h-screen p-0 m-0 border-none ">
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          className="p-0 m-0 border-none bg-black"
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => dispatch(Off())}
          vertical
          direction="right"
          visible={toggleDeleteStatus}
        >
          <div className="w-[600px] bg-black"></div>
        </Sidebar>

        <Sidebar.Pusher
          className="bg-black p-0 m-0 border-none "
          dimmed={toggleDeleteStatus}
        >
          <div className="p-0 m-0 border-none">
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
