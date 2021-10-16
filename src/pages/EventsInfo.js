/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Stack, Link, Paper, Button } from '@mui/material';
import axios from 'axios';
import { PRODUCT_API_URL } from '../config';
import AddToCalendar from '@culturehq/add-to-calendar';
import '../App.css';
import Loading from '../components/Loading';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: {
    alignItems: 'center',
    margin: '10% auto',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1D2C4C',
    borderRadius: 10,
    padding: '5% 3%',
    color: '#EAD4B7',
  },
  eventInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  homeButton: {
    marginTop: 10,
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

  onHomeClick = () => {
    const { guestCode } = this.props.match.params;
    this.props.history.push(`/${guestCode}`);
  };

  render() {
    const { allowedEvents } = this.state;
    const heading =
      allowedEvents && allowedEvents.length > 1 ? 'Events Information' : 'Event Information';
    return (
      <Container maxWidth="sm" id="events-information-container" style={styles.container}>
        {!allowedEvents && <Loading page={true} />}
        {allowedEvents && (
          <div id="page-title">
            <Typography color="primary" variant="h3">
              {heading}
            </Typography>
            <Button size="small" style={styles.homeButton} onClick={this.onHomeClick}>
              <HomeIcon />
            </Button>
          </div>
        )}
        {allowedEvents && (
          <Stack spacing={4} style={{ marginTop: 10 }}>
            {allowedEvents.map((event) => {
              let name;
              if (event.name === 'Mehndi') name = 'Mehndi Celebration';
              else if (event.name === 'Nikkah') name = 'Nikkah Ceremony & Reception';
              else if (event.name === 'Reception') name = 'Wedding Reception';
              return (
                <div id="event-info" key={event.name} style={styles.eventInfo}>
                  <Paper key={event.name} style={styles.card} elevation={3}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body1">
                      Venue:{' '}
                      <Link color="secondary" href={event.mapsLink}>
                        {event.venue}
                        {event.ballroom && `, ${event.ballroom}`}
                      </Link>{' '}
                    </Typography>
                    <Typography id="event-address" variant="body1">
                      Address: {event.address}
                    </Typography>
                    <Typography id="event-time" variant="body1">
                      Time: {event.timeOfEvent}
                    </Typography>
                  </Paper>
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
