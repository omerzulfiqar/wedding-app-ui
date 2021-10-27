/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import { PRODUCT_API_URL } from '../config';
import { Container, Typography, Button, Stack } from '@mui/material';
import Loading from '../components/Loading';
import { style } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: {
    loading: {
      height: '44pc',
      textAlign: 'center',
    },
    loaded: {
      marginTop: 20,
      marginBottom: 20,
      padding: '0 5%',
      textAlign: 'center',
    },
  },
  stack: {
    marginTop: '5%',
  },
  button: {
    marginTop: '3%',
  },
};

export default class GuestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: null,
    };
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}/weddingGuestCount`);
      let guests = response.data;

      guests.sort((a, b) => {
        const name1 = a.firstName.toLowerCase();
        const name2 = b.firstName.toLowerCase();

        if (name1 < name2) {
          return -1;
        }
        if (name1 > name2) {
          return 1;
        }
        return 0;
      });
      this.setState({ guests });
    } catch (error) {
      console.log(error);
    }
  };

  renderGuests = () => {
    const { guests } = this.state;
    return (
      <Stack spacing={2} style={styles.stack}>
        {guests.map((guest) => {
          const key = guest.firstName + guest.lastName;
          return (
            <Typography color="primary" key={key}>
              {guest.firstName + ' ' + guest.lastName}
            </Typography>
          );
        })}
      </Stack>
    );
  };

  onHomeClick = () => {
    const { guestCode } = this.props.match.params;
    this.props.history.push(`/${guestCode}`);
  };

  render() {
    const { guests, nikkah, mehndi, reception, mehndiTable, nikkahTable, recTable } = this.state;
    return (
      <Container style={!guests ? styles.container.loading : styles.container.loaded}>
        {!guests && <Loading page={true} />}
        {guests && (
          <div id="counts">
            <Typography variant="h3" color="primary">
              Guest List
            </Typography>
            <Button size="small" style={styles.button} onClick={this.onHomeClick}>
              <HomeIcon />
            </Button>
            {this.renderGuests()}
          </div>
        )}
      </Container>
    );
  }
}
