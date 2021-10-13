/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Stack, Card, CardContent, Link } from '@mui/material';
import axios from 'axios';
import { LOCAL_API_URL } from '../config';

export default class EventsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allowedEvents: [
        {
          name: 'Mehndi',
          eventId: 0,
          venue: 'Cherry Blossom Banquet Hall',
          address: '46110 Lake Center Plaza, Sterling, VA 20165',
          mapsLink: 'https://goo.gl/maps/MVdQSYb4nuX2bFSY8',
          timeOfEvent: 'December 23rd, 2021 at 6:00 PM',
        },
        {
          name: 'Nikkah',
          eventId: 1,
          venue: 'Tanveer Residence',
          address: '6231 Lawson Drive, Haymarket, VA 20169',
          mapsLink: 'https://goo.gl/maps/uNbai5Rmo1Ds2pK1A',
          timeOfEvent: 'December 24th, 2021 at 3:00 PM',
        },
        {
          eventId: 2,
          venue: 'Hilton Washington Dulles',
          address: '13869 Park Center Rd, Herndon, VA 20171',
          mapsLink: 'https://goo.gl/maps/aepo2fcdLhURLrUW9',
          name: 'Reception',
          ballroom: 'Belmont Ballroom',
          timeOfEvent: 'December 26th, 2021 at 6:00 PM',
        },
      ],
    };
  }

  // componentDidMount = async () => {
  //   const { guestCode } = this.props.match.params;
  //   try {
  //     const response = await axios.get(`${LOCAL_API_URL}/eventsInformation/${guestCode}`);
  //     const { events } = response.data;
  //     this.setState({ allowedEvents: events });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                <Card
                  variant="outlined"
                  key={event.name}
                  style={{ marginTop: 30, marginBottom: 30 }}>
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
                    {this.renderCalendarEvent(event)}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Container>
    );
  }
}
