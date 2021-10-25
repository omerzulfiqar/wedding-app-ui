/* eslint-disable react/prop-types */
import { Typography, Container, Button, Link, Stack } from '@mui/material';
import React, { Component } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: {
    paddingBottom: '20%',
    textAlign: 'center',
  },
  links: {
    marginTop: '10%',
    display: 'grid',
  },
  button: {
    textAlign: 'center',
    marginTop: '5%',
  },
};

export default class CovidNotice extends Component {
  redirectHome = () => {
    this.props.history.push(`/${this.props.match.params.guestCode}`);
  };
  render() {
    return (
      <Container id="covid-info-container" style={styles.container}>
        <Typography color="primary" variant="h3" align="center">
          Covid-19 Info
        </Typography>
        <div id="home-button" style={styles.button}>
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
          respect it, as we look to prioritze the safety of everyone attending.
        </Typography>
        <Typography
          style={{ marginTop: 20 }}
          color="primary"
          variant="body1"
          align="center"
          paragraph={true}>
          Jazakallah Khair! 🤗
        </Typography>
        <div id="health-links" style={styles.links}>
          <Stack spacing={2}>
            <Link
              id="cdc-link"
              variant="body2"
              target="_blank"
              rel="noreferrer"
              href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/gatherings.html">
              CDC Covid Guidelines
            </Link>
            <Link
              id="vdh-link"
              variant="body2"
              target="_blank"
              rel="noreferrer"
              href="https://www.vdh.virginia.gov/coronavirus/get-the-latest-guidence/social-gatherings/">
              Virginia Covid Guidelines
            </Link>
          </Stack>
        </div>
      </Container>
    );
  }
}
