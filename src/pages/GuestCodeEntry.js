/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, FormGroup, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  },
};
export default class GuestCodeEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCode: '',
    };
  }

  /*
   * Handles form text field changes
   */
  handleInputChange = (event) => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = () => {
    this.props.history.push(`/${this.state.guestCode}`);
  };

  render() {
    const { guestCode } = this.state;
    const submitDisabled = guestCode.length !== 10;

    return (
      <Container id="page-container" style={styles.container}>
        <Typography style={styles.title} variant="h2">
          Welcome
        </Typography>
        <Container id="actions-container" maxWidth="xs">
          <FormGroup id="guest-code-entry">
            <Typography variant="body2">Please enter your rsvp code below</Typography>
            <TextField
              focused
              label="Rsvp Code"
              size="small"
              id="guestCode"
              style={{ marginTop: 20 }}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button
            disabled={submitDisabled}
            variant="contained"
            size="small"
            color="success"
            onClick={this.handleSubmit}
            style={styles.submitButton}>
            <CheckCircleIcon fontSize="small" />
            {'   '} Submit
          </Button>
        </Container>
      </Container>
    );
  }
}
