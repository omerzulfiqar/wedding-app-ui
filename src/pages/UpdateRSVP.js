/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import UpdateRsvpForm from '../components/UpdateRsvpForm';
import { Container, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: {
    alignItems: 'center',
    margin: '20px auto',
  },
};
export default class UpdateRSVP extends Component {
  redirectHome = () => {
    const { guestCode } = this.props.match.params;
    this.props.history.push(`/${guestCode}`);
  };

  render() {
    const { firstName, lastName } = this.props.match.params;
    return (
      <Container id="new-rsvp-container" style={styles.container}>
        <div id="page-title" style={{ textAlign: 'center' }}>
          <Typography color="primary" variant="h3">
            Update Rsvp
          </Typography>
          <Button size="small"onClick={this.redirectHome}>
            <HomeIcon />
          </Button>
        </div>
        <UpdateRsvpForm firstName={firstName} lastName={lastName} redirect={this.redirectHome} />
      </Container>
    );
  }
}
