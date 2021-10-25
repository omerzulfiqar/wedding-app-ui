import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventsInfo from './pages/EventsInfo';
import NewRSVP from './pages/NewRSVP';
import UpdateRSVP from './pages/UpdateRSVP';
import GuestCodeEntry from './pages/GuestCodeEntry';
import CovidNotice from './pages/CovidNotice';
import GuestCount from './pages/GuestCount';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={GuestCodeEntry} />
          <Route exact path="/WeddingGuestCount" component={GuestCount} />
          <Route exact path="/:guestCode" component={Home} />
          <Route exact path="/:guestCode/covidGuidelines" component={CovidNotice} />
          <Route exact path="/:guestCode/rsvp" component={NewRSVP} />
          <Route exact path="/:guestCode/eventsInformation/" component={EventsInfo} />
          <Route exact path="/:guestCode/rsvp/:firstName/:lastName" component={UpdateRSVP} />
        </Switch>
      </Router>
    );
  }
}
