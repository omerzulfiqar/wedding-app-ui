/* eslint-disable react/prop-types */
import { Typography, Container, Button } from '@mui/material';
import React, { Component } from 'react';
import HomeIcon from '@mui/icons-material/Home';

export default class CovidNotice extends Component {
  redirectHome = () => {
    this.props.history.push(`/${this.props.match.params.guestCode}`);
  };
  render() {
    return (
      <Container>
        <Typography color="primary" variant="h3" align="center">
          Covid-19 Info
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <Button size="small" onClick={this.redirectHome}>
            <HomeIcon />
          </Button>
        </div>
        <Typography
          style={{ marginTop: 20 }}
          color="primary"
          variant="body1"
          align="justify"
          paragraph={true}>
          We are so grateful to have the opportunity to celebrate this occasion with our loved ones,
          and we want to provide a safe and comfortable atmosphere in accordance with all covid
          health and safety guidelines.
        </Typography>
        <Typography
          style={{ marginTop: 20 }}
          color="primary"
          variant="body1"
          align="justify"
          paragraph={true}>
          Therefore, we request that all attending guests be fully vaccinated or be cognizant of
          social distancing and follow local guidelines regarding masking in indoor spaces if you
          are not vaccinated.
        </Typography>
        <Typography
          style={{ marginTop: 20 }}
          color="primary"
          variant="body1"
          align="justify"
          paragraph={true}>
          We understand if you aren’t in full agreement with our decision, but we only ask that you
          respect it, as we look to prioritze the safety of everyone attending. Please submit your
          RSVP accordingly.
        </Typography>
        <Typography
          style={{ marginTop: 20 }}
          color="primary"
          variant="body1"
          align="center"
          paragraph={true}>
          Jazakallah Khair! 🤗
        </Typography>
      </Container>
    );
  }
}
