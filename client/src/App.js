import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import ContextWrapper from "./Context/ContextWrapper";
import ProtectedRoute from "./Shared/ProtectedRoute/react";
import Header from "./Shared/Header/react";
import SidePanel from "./Shared/SidePanel/react";
import Login from "./Login/react";
import Setup from "./Setup/react";
import PageNotFound from "./PageNotFound/react";
import NoSessionRoute from "./Shared/NoSessionRoute/react";
import Users from "./AdminPages/Users";
import Project from "./AdminPages/Project";
import Leads from "./AdminPages/Leads";
import MainPage from "./MainPage/react";
import Hub from "./Hub/react";

axios.defaults.withCredentials = true;

function App() {
  document.getElementById("favicon").href = process.env.REACT_APP_FAVICON;
  document.getElementById("title").innerHTML = process.env.REACT_APP_TITLE;

  return (
    <Router>
      <ContextWrapper>
        <div className="flex flex-col h-screen w-screen bg-gray-100">
          <Header />
          <div className="h-full flex flex-row w-full ">
            <div className="h-full w-full p-10 bg-gray-100">
              <Switch>
                <NoSessionRoute exact path="/login" component={Login} />
                <NoSessionRoute exact path="/setup/:id" component={Setup} />
                <ProtectedRoute exact path="/dashboard" component={HomePage} />
                <ProtectedRoute exact path="/admin/users" component={Users} />
                <ProtectedRoute
                  exact
                  path="/admin/projects"
                  component={Project}
                />
                <ProtectedRoute exact path="/admin/leads" component={Leads} />
                <ProtectedRoute
                  exact
                  path="/admin/leads/:id"
                  component={Leads}
                />
                <Route exact path="/:id">
                  <MainPage />
                </Route>
                <Route path="/">
                  <Hub />
                </Route>
              </Switch>
            </div>
            <SidePanel />
          </div>
        </div>
      </ContextWrapper>
    </Router>
  );
}

function HomePage() {
  return "This is the home page, but you can only visit this page if you are logged in";
}

export default App;
