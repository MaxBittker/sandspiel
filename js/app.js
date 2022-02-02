import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Info from "./components/info";
import { Index } from "./components/ui";
import Browse from "./components/browse";
import Admin from "./components/admin";
import Menu from "./components/menu";
import SignInScreen from "./components/signin";
import BenchmarkRunner from "./components/benchmarkRunner";

let sizeMap = [2, 5, 10, 18, 30, 45];

function BrowseRouter({ match, location }) {
  return (
    <Menu>
      <Browse location={location} />
    </Menu>
  );
}

function AdminRouter({ match, location }) {
  return (
    <Menu>
      <Admin location={location} />
    </Menu>
  );
}

function SigninRouter({ match, location }) {
  return (
    <Menu>
      <SignInScreen location={location} />
    </Menu>
  );
}

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route
        exact
        path="/info/"
        component={() => (
          <Menu>
            <Info />
          </Menu>
        )}
      />
      <Route exact path="/bench" component={BenchmarkRunner} />
      <Route path="/browse" component={BrowseRouter} />
      <Route path="/admin" component={AdminRouter} />
      <Route path="/login" component={SigninRouter} />
      <Route path="/__/auth/handler" component={SigninRouter} />
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById("ui"));

export { sizeMap };
