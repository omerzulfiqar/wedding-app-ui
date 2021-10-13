/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography } from '@mui/material';
import RsvpForm from '../components/RsvpForm';

export default class NewRSVP extends Component {
  redirectHome = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <Container id="new-rsvp-container">
        <div id="page-title" style={{ textAlign: 'center' }}>
          <Typography variant="h2">New RSVP</Typography>
        </div>
        <RsvpForm guestCode={this.props.match.params.guestCode} redirect={this.redirectHome} />
      </Container>
    );
  }
}
