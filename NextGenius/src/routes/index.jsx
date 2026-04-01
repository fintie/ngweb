import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ServicePage from "views/ServicePage/ServicePage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import NewsPage from "views/NewsPage/NewsPage.jsx";
// import TeamPage from "views/TeamPage/TeamPage.jsx";
import ContactPage from "views/ContactPage/ContactPage.jsx";

const paths = [
  { path: "/service", name: "ServicePage", component: ServicePage },
  { path: "/news", name: "NewsPage", component: NewsPage },
  // { path: "/team", name: "TeamPage", component: TeamPage },
  // { path: "/tron", name: "TronPage", component: TronPage },
  { path: "/contact", name: "ContactPage", component: ContactPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

const routes = () => {
  return (
      <Router>
        <Switch>
          {paths.map((prop, key) => {
            return <Route path={prop.path} key={key} component={prop.component}/>;
          })}
        </Switch>
      </Router>
  )
};

export default routes;
