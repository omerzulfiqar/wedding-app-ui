/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import UpdateRsvpForm from '../components/UpdateRsvpForm';
import { Container, Typography } from '@mui/material';

const styles = {
  container: {
    alignItems: 'center',
    margin: '20px auto',
    textAlign: 'center',
  },
};
export default class UpdateRSVP extends Component {
  redirect = () => {
    const { guestCode } = this.props.match.params;
    this.props.history.push(`/${guestCode}`);
  };

  render() {
    const { firstName, lastName } = this.props.match.params;
    return (
      <Container id="new-rsvp-container">
        <div id="page-title" style={styles.container}>
          <Typography variant="h3">Update Rsvp</Typography>
        </div>
        <UpdateRsvpForm firstName={firstName} lastName={lastName} redirect={this.redirect} />
      </Container>
    );
  }
}
