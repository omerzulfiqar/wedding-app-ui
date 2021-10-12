/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCode: '',
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.guestCode) {
      this.setState({ guestCode: this.props.match.params.guestCode });
    }
  };

  render() {
    const { guestCode } = this.state;

    return (
      <Container id="page-container" style={{ textAlign: 'center' }}>
        <Typography variant="h1">Home</Typography>
        <Container id="actions-container" maxWidth="xs">
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => this.props.history.push(`${guestCode}/rsvp`)}>
              RSVP
            </Button>
            <Button variant="contained" onClick={() => this.props.history.push(`/rsvp/1232423`)}>
              Modify RSVP
            </Button>
            <Button
              variant="contained"
              onClick={() => this.props.history.push(`/${guestCode}/eventsInformation`)}>
              Events Information
            </Button>
          </Stack>
          <Button />
        </Container>
      </Container>
    );
  }
}
