/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Container,
  Typography,
  Stack,
  Link,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import { PRODUCT_API_URL } from '../config';
import AddToCalendar from '@culturehq/add-to-calendar';
import '../App.css';
import Loading from '../components/Loading';
import HomeIcon from '@mui/icons-material/Home';
import mehndiImg from '../static/Mehndi.png';
import nikkahImg from '../static/Nikkah.png';
import receptionImg from '../static/Reception.png';

const styles = {
  container: {
    alignItems: 'center',
    margin: '10% auto',
    textAlign: 'center',
    padding: '0 4%',
  },
  card: {
    backgroundColor: '#1D2C4C',
    margin: '0 2%',
    borderRadius: 10,
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
    const heading = allowedEvents && allowedEvents.length > 1 ? 'Events Info' : 'Event Info';
    return (
      <Container id="events-info-container" maxWidth="sm" style={styles.container}>
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
              let img;
              if (event.name === 'Mehndi') {
                name = 'Mehndi Celebration';
                img = mehndiImg;
              } else if (event.name === 'Nikkah') {
                name = 'Nikkah Ceremony';
                img = nikkahImg;
              } else if (event.name === 'Reception') {
                name = 'Wedding Reception';
                img = receptionImg;
              }
              return (
                <div id="event-info" key={event.name} style={styles.eventInfo}>
                  <Card key={event.name} style={styles.card}>
                    <CardContent>
                      <Typography variant="h5">{name}</Typography>
                      <Typography variant="body1">
                        <b>Venue:</b>{' '}
                        <Link color="secondary" href={event.mapsLink}>
                          {event.venue}
                          {event.ballroom && `, ${event.ballroom}`}
                        </Link>{' '}
                      </Typography>
                      <Typography id="event-address" variant="body1">
                        <b>Address:</b> {event.address}
                      </Typography>
                      <Typography id="event-time" variant="body1">
                        <b>Time: </b> {event.timeOfEvent}
                      </Typography>
                    </CardContent>
                    <Link href={event.mapsLink} target="_blank" rel="noopener noreferrer">
                      <CardMedia component="img" height="50%" image={img} />
                    </Link>
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
