import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "../store";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";
import { setToken, removeError, addError, setCurrentUser } from "../store/actions";
import RouteViews from "../containers/RouteViews";
import NavBar from "../containers/NavBar";
import SideBar from "../containers/SideBar";
import Footer from "./Footer";

if (localStorage.ACCESS_TOKEN) {
  try {
    setToken(localStorage.ACCESS_TOKEN);
    store.dispatch(setCurrentUser(decode(localStorage.ACCESS_TOKEN)));
    store.dispatch(removeError());
  } catch (error) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(error));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>

        <div className="main-wrapper">

          <NavBar />

          <div className="wrapper clearfix">
            <div className="main">
              <div className="main-content clearfix">
                <div className="content">
                  <RouteViews />
                </div>
                
                <div className="main-sidebar">
                  <SideBar />
                  <SideBar />
                  <SideBar />
                </div>

              </div>
            </div>
          </div>

          <Footer />

        </div>

      </Fragment>
    </Router>
  </Provider>
);

export default App;
