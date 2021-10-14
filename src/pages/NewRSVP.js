/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography } from '@mui/material';
import RsvpForm from '../components/RsvpForm';

const styles = {
  container: {
    alignItems: 'center',
    margin: '20px auto',
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
          <Typography variant="h3">Rsvp Form</Typography>
        </div>
        <RsvpForm guestCode={this.props.match.params.guestCode} redirect={this.redirectHome} />
      </Container>
    );
  }
}
