import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Buildings from "./components/buildings/Buildings";
import SingleBuilding from "./components/buildings/SingleBuilding";
import PrivateRoute from "./components/routing/PrivateRoute";
import BuildingForm from "./components/buildings/BuildingForm";
import AddTransparentEl from "./components/buildings/AddTransparentEl";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/buildings" component={Buildings} />
              <Route
                exact
                path="/single-building/:_id"
                component={SingleBuilding}
              />
              <PrivateRoute
                exact
                path="/new-building"
                component={BuildingForm}
              />
              <PrivateRoute
                exact
                path="/add-transparent/:_id"
                component={AddTransparentEl}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
