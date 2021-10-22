/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button } from '@mui/material';
import RsvpForm from '../components/RsvpForm';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: {
    alignItems: 'center',
    margin: '5% auto',
    padding: '0 1%',
  },
  homeButton: {
    marginTop: 10,
  },
};

export default class NewRSVP extends Component {
  redirectHome = () => {
    this.props.history.push(`/${this.props.match.params.guestCode}`);
  };
  render() {
    return (
      <Container id="new-rsvp-container" style={styles.container}>
        <div id="page-title" style={{ textAlign: 'center' }}>
          <Typography color="primary" variant="h3">
            Rsvp Form
          </Typography>
          <Button
            id="home-button"
            size="small"
            onClick={this.redirectHome}
            style={styles.homeButton}>
            <HomeIcon />
          </Button>
        </div>
        <RsvpForm guestCode={this.props.match.params.guestCode} redirect={this.redirectHome} />
      </Container>
    );
  }
}
