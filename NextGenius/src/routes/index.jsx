import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ServicePage from "views/ServicePage/ServicePage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ContactPage from "views/ContactPage/ContactPage.jsx";

const paths = [
  { path: "/service", name: "ServicePage", component: ServicePage },
  { path: "/contact", name: "ContactPage", component: ContactPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

const routes = () => (
  <Router>
    <Switch>
      {paths.map((prop, key) => (
        <Route exact path={prop.path} key={key} component={prop.component} />
      ))}
    </Switch>
  </Router>
);

export default routes;
