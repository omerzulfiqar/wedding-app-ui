/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Stack, Card, CardContent, Link, Button } from '@mui/material';
import axios from 'axios';
import { PRODUCT_API_URL } from '../config';
import AddToCalendar from '@culturehq/add-to-calendar';
import '../App.css';
import Loading from '../components/Loading';

const styles = {
  container: {
    alignItems: 'center',
    margin: '20px auto',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5ffff',
    borderRadius: 15,
  },
};

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
      const response = await axios.get(`${PRODUCT_API_URL}/eventsInformation/${guestCode}`);
      const { events } = response.data;
      this.setState({ allowedEvents: events });
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Renders button to download calendar event
   */
  renderCalendarEvent = (event) => {
    const calendarEvent = {
      name: `Omer's & Kayanat's ${event.name}`,
      details: `At ${event.address}. ${event.mapsLink}`,
      location: `${event.mapsLink}`,
      startsAt: `${event.startsAt}`,
      endsAt: `${event.endsAt}`,
    };
    return (
      <AddToCalendar event={calendarEvent} filename={`Omer's & Kayanat's ${event.name}`}>
        {(this.children = `Add To Calendar`)}
      </AddToCalendar>
    );
  };

  render() {
    const { allowedEvents } = this.state;
    const heading =
      allowedEvents && allowedEvents.length > 1 ? 'Events Information' : 'Event Information';
    return (
      <Container maxWidth="md" id="events-information-container" style={styles.container}>
        <div id="page-title">
          <Typography variant="h3">{heading}</Typography>
        </div>
        {!allowedEvents && <Loading page={true} />}
        {allowedEvents && (
          <Stack spacing={4} style={{ marginTop: 10 }}>
            {allowedEvents.map((event) => {
              let name;
              if (event.name === 'Mehndi') name = 'Mehndi Celebration';
              else if (event.name === 'Nikkah') name = 'Nikkah Ceremony & Reception';
              else if (event.name === 'Reception') name = 'Wedding Reception';
              return (
                <div id="event-info" key={event.name} style={{ marginTop: 30, marginBottom: 30 }}>
                  <Card variant="outlined" key={event.name} style={styles.card}>
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
