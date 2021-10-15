import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventsInfo from './pages/EventsInfo';
import NewRSVP from './pages/NewRSVP';
import UpdateRSVP from './pages/UpdateRSVP';
import GuestCodeEntry from './pages/GuestCodeEntry';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={GuestCodeEntry} />
          <Route exact path="/:guestCode" component={Home} />
          <Route exact path="/:guestCode/rsvp" component={NewRSVP} />
          <Route exact path="/:guestCode/eventsInformation/" component={EventsInfo} />
          <Route exact path="/:guestCode/rsvp/:firstName/:lastName" component={UpdateRSVP} />
        </Switch>
      </Router>
    );
  }
}
