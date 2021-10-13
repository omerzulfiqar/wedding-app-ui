/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Stack, Card, CardContent, Link } from '@mui/material';
import axios from 'axios';
import { LOCAL_API_URL } from '../config';
import AddToCalendar from '@culturehq/add-to-calendar';
import '../App.css';

export default class EventsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allowedEvents: null,
    };
  }

  componentDidMount = async () => {
    const { guestCode } = this.props.match.params;
    try {
      const response = await axios.get(`${LOCAL_API_URL}/eventsInformation/${guestCode}`);
      const { events } = response.data;
      this.setState({ allowedEvents: events });
    } catch (error) {
      console.log(error);
    }
  };

  renderCalendarEvent = (event) => {
    const calendarEvent = {
      name: `Omer's & Kayanat's ${event.name}`,
      details: `At ${event.address}. ${event.mapsLink}`,
      location: `${event.mapsLink}`,
      startsAt: `${event.startsAt}`,
      endsAt: `${event.endsAt}`,
    };
    return <AddToCalendar event={calendarEvent} filename={`Omer's & Kayanat's ${event.name}`} />;
  };
  render() {
    const { allowedEvents } = this.state;
    return (
      <Container maxWidth="sm" id="events-information-container" style={{ textAlign: 'center' }}>
        <div id="page-title">
          <Typography variant="h2">Event(s) Information</Typography>
        </div>
        {allowedEvents && (
          <Stack spacing={4} style={{ marginTop: 10 }}>
            {allowedEvents.map((event) => {
              let name;
              if (event.name === 'Mehndi') name = 'Mehndi Celebration';
              else if (event.name === 'Nikkah') name = 'Nikkah Ceremony & Reception';
              else if (event.name === 'Reception') name = 'Wedding Reception';
              return (
                <div key={event.name} style={{ marginTop: 30, marginBottom: 30 }}>
                  <Card variant="outlined" key={event.name}>
                    <CardContent>
                      <Typography variant="h5">{name}</Typography>
                      <div id="location" style={{ display: 'inline-flex' }}>
                        <Typography variant="body1">
                          Venue:{' '}
                          <Link href={event.mapsLink}>
                            {event.venue}
                            {event.ballroom && `, ${event.ballroom}`}
                          </Link>{' '}
                        </Typography>
                      </div>
                      <div id="address">
                        <Typography variant="body1">Address: {event.address}</Typography>
                      </div>
                      <div id="time">
                        <Typography variant="body1">Time: {event.timeOfEvent}</Typography>
                      </div>
                    </CardContent>
                  </Card>
                  {this.renderCalendarEvent(event)}
                </div>
              );
            })}
          </Stack>
        )}
      </Container>
    );
  }
}
