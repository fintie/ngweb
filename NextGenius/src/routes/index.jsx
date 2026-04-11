import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ServicePage from "views/ServicePage/ServicePage.jsx";
import UseCasesPage from "views/UseCasesPage/UseCasesPage.jsx";
import ContactPage from "views/ContactPage/ContactPage.jsx";
import WorkshopPage from "views/WorkshopPage/WorkshopPage.jsx";
import AboutPage from "views/AboutPage/AboutPage.jsx";
import BlogIndexPage from "views/BlogPage/BlogIndexPage.jsx";
import BlogPostPage from "views/BlogPage/BlogPostPage.jsx";
import FaqPage from "views/FaqPage/FaqPage.jsx";
import EventsPage from "views/EventsPage/EventsPage.jsx";
import GeoLandingPage from "views/GeoPage/GeoLandingPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/service" component={ServicePage} />
      <Route exact path="/use-cases" component={UseCasesPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/workshop" component={WorkshopPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/blog" component={BlogIndexPage} />
      <Route exact path="/blog/:slug" component={BlogPostPage} />
      <Route exact path="/faq" component={FaqPage} />
      <Route exact path="/events" component={EventsPage} />
      <Route exact path="/ai-meetup-sydney" component={GeoLandingPage} />
      <Route exact path="/ai-events-sydney" component={GeoLandingPage} />
      <Route exact path="/learn-ai-sydney" component={GeoLandingPage} />
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </Router>
);

export default routes;
