/* eslint-disable react/prop-types */
import { Container, Stack, Typography, Link } from '@mui/material';
import React, { Component } from 'react';
import img from '../static/img.png';

const styles = {
  container: {
    alignItems: 'center',
    margin: '10% auto',
    textAlign: 'center',
    padding: '0 4%',
  },
  stack: {
    marginTop: '10%',
  },
  img: {
    maxWidth: '-webkit-fill-available',
    marginTop: 15,
    marginLeft: '2%',
  },
};

export default class EventSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltip: true,
    };
  }

  reception = () => {
    return (
      <Stack spacing={3} style={styles.stack}>
        <div>
          <Typography color="primary" variant="body2">
            <Link
              href="https://goo.gl/maps/aepo2fcdLhURLrUW9"
              target="_blank"
              rel="noopener noreferrer">
              Hilton Washington Dulles, Herndon, VA
            </Link>
          </Typography>
          <Typography color="primary" variant="body2">
            Belmont Ballroom
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            6:00 PM
          </Typography>
          <Typography color="primary">Guests Enter Reception</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            6:30 PM
          </Typography>
          <Typography color="primary">Appetizers</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            7:00 PM
          </Typography>
          <Typography color="primary">{'Bride and Groom Entrances'}</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            7:30 PM
          </Typography>
          <Typography color="primary">Cake Cutting</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            7:45 PM
          </Typography>
          <Typography color="primary">Speeches</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            8:15 PM
          </Typography>
          <Typography color="primary">Dinner Is Served</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            9:00 PM
          </Typography>
          <Typography color="primary">Pictures</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            9:30 PM
          </Typography>
          <Typography color="primary">Open Floor</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            10:45 PM
          </Typography>
          <Typography color="primary">Bride and Groom Depart</Typography>
        </div>
      </Stack>
    );
  };

  mehndi = () => {
    return (
      <Stack spacing={3} style={styles.stack}>
        <div>
          <Typography color="primary" variant="body2">
            <Link
              href="https://goo.gl/maps/MVdQSYb4nuX2bFSY8"
              target="_blank"
              rel="noopener noreferrer">
              Cherry Blossom Banquet Hall, Sterling, VA
            </Link>
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            6:00 PM
          </Typography>
          <Typography color="primary">Guests Arrive</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            6:30 PM
          </Typography>
          <Typography color="primary">Appetizers</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            7:00 PM
          </Typography>
          <Typography color="primary">{'Bride and Groom Entrances'}</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            7:30 PM
          </Typography>
          <Typography color="primary">Dance Performances</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            8:00 PM
          </Typography>
          <Typography color="primary">{'Dinner & Pictures'}</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            9:30 PM
          </Typography>
          <Typography color="primary">Open Floor</Typography>
        </div>
      </Stack>
    );
  };

  render() {
    const { event } = this.props.match.params;
    return (
      <Container style={styles.container}>
        <Typography variant="h4" color="primary">
          {event === 'mehndi' && "Kayanat and Omer's Mehndi"}
          {event === 'reception' && "Omer and Kayanat's Wedding Reception"}
        </Typography>
        {event === 'mehndi' && this.mehndi()}
        {event === 'reception' && this.reception()}
        <img src={img} style={styles.img} />
      </Container>
    );
  }
}
