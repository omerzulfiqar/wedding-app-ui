/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, FormGroup, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GUEST_CODES } from '../config';

const styles = {
  container: {
    textAlign: 'center',
    alignItems: 'center',
    margin: '50% auto',
  },
  submitButton: {
    maxWidth: '60%',
    margin: '10px auto',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#FFF7EE',
  },
};
export default class GuestCodeEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCode: '',
      error: false,
    };
  }

  /*
   * Handles form text field changes
   */
  handleInputChange = (event) => {
    const { value, id } = event.target;
    const { error } = this.state;
    error
      ? this.setState({
          [id]: value,
          error: false,
        })
      : this.setState({
          [id]: value,
        });
  };

  handleSubmit = () => {
    const { guestCode } = this.state;
    if (GUEST_CODES.includes(guestCode)) {
      this.props.history.push(`/${this.state.guestCode}`);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { guestCode, error } = this.state;
    const submitDisabled = guestCode.length !== 10;

    return (
      <Container id="page-container" style={styles.container}>
        <Typography color="primary" style={styles.title} variant="h2">
          Welcome
        </Typography>
        <Container id="actions-container" maxWidth="xs">
          <FormGroup id="guest-code-entry">
            <Typography color="primary" variant="body2">
              Please enter your rsvp code* below
            </Typography>
            <TextField
              focused
              label="Rsvp Code"
              size="small"
              id="guestCode"
              color={error ? 'error' : 'primary'}
              style={{ marginTop: 20 }}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button
            disabled={submitDisabled}
            variant="contained"
            size="small"
            color="primary"
            onClick={this.handleSubmit}
            style={styles.submitButton}>
            <CheckCircleIcon fontSize="small" />
            {'   '} Submit
          </Button>
        </Container>
        <Typography style={{ marginTop: '5%' }} color="primary" variant="subtitle2">
          The RSVP code is provided to you on your invitation.
        </Typography>
      </Container>
    );
  }
}
