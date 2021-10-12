/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import ModifyRsvpDialog from '../components/ModifyRsvpDialog';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCode: '',
      dialogOpen: false,
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.guestCode) {
      this.setState({ guestCode: this.props.match.params.guestCode });
    }
  };

  /*
   * Handles form text field changes
   */
  handleInputChange = (event) => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  redirectToUpdateRsvpPage = (firstName, lastName) => {
    this.setState({ dialogOpen: false });
    this.props.history.push(`/rsvp/${firstName}/${lastName}`);
  }


  render() {
    const { dialogOpen } = this.state;
    const guestCode = '4d4e520d0a';

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
            <Button variant="contained" onClick={this.openDialog}>
              Modify RSVP
            </Button>
            <Button
              variant="contained"
              onClick={() => this.props.history.push(`/${guestCode}/eventsInformation`)}>
              Events Information
            </Button>
          </Stack>
          <Button />
          {dialogOpen && <ModifyRsvpDialog dialogOpen={dialogOpen} redirect={this.redirectToUpdateRsvpPage} />}
        </Container>
      </Container>
    );
  }
}
