/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Container,
  TextField,
  FormGroup,
  Checkbox,
  FormLabel,
  FormControlLabel,
  Button,
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LOCAL_API_URL } from '../config';

/* 
* TODO: Add eventAttendance condition based on guestCode
*/
export default class RsvpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      numberOfGuests: '',
      phoneNumber: '',
      eventAttendance: {
        mehndi: false,
        nikkah: false,
        reception: false,
      },
      submitLoading: false,
      submitted: false,
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

  /*
   * Handles checkboxes for events
   */
  handleEventsChange = (event) => {
    const { checked, name } = event.target;
    let { eventAttendance } = this.state;
    eventAttendance[name] = checked;
    this.setState({ eventAttendance });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitLoading: true });

    const {
      firstName, //
      lastName,
      numberOfGuests,
      phoneNumber,
      eventAttendance,
    } = this.state;

    const rsvpData = {
      firstName,
      lastName,
      numberOfGuests,
      phoneNumber,
      eventAttendance,
    };

    try {
      const response = await axios.post(`${LOCAL_API_URL}/rsvp`, rsvpData);
      console.log('Create RSVP response: ', response);

      //   Reset initial states
      this.setState({
        firstName: '',
        lastName: '',
        numberOfGuests: '',
        phoneNumber: '',
        eventAttendance: {
          mehndi: false,
          nikkah: false,
          reception: false,
        },
        submitted: true,
      });
    } catch (error) {
      console.log('Error creating rsvp');
      console.log(error);
    }

    this.setState({ submitLoading: false });
  };

  render() {
    const {
      firstName, //
      lastName,
      numberOfGuests,
      phoneNumber,
      eventAttendance,
      submitLoading,
    } = this.state;

    const submitDisabled = !firstName || !lastName || !numberOfGuests || !phoneNumber;

    return (
      <Container maxWidth="sm">
        <FormGroup id="new-rsvp-form">
          <FormLabel>Please enter your information below</FormLabel>
          <TextField
            name="given-name"
            autoComplete="given-name"
            id="firstName"
            margin="normal"
            required
            label="First Name"
            value={firstName}
            onChange={this.handleInputChange}
          />
          <TextField
            name="family-name"
            id="lastName"
            autoComplete="family-name"
            margin="normal"
            required
            label="Last Name"
            value={lastName}
            onChange={this.handleInputChange}
          />
          <TextField
            id="numberOfGuests"
            type="number"
            margin="normal"
            required
            label="Number Of Guests (Including You)"
            value={numberOfGuests}
            onChange={this.handleInputChange}
          />
          <TextField
            type="tel"
            id="phoneNumber"
            autoComplete="phone"
            margin="normal"
            required
            label="Phone Number"
            value={phoneNumber}
            onChange={this.handleInputChange}
          />
          <FormGroup id="events-checkboxes" style={{ marginTop: 10 }}>
            <FormLabel required component="legend">
              Please select the events you and your party will be attending:
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventAttendance.mehndi}
                  name="mehndi"
                  onChange={this.handleEventsChange}
                />
              }
              label="Mehndi - December 23rd, 2021"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventAttendance.nikkah}
                  name="nikkah"
                  onChange={this.handleEventsChange}
                />
              }
              label="Nikkah - December 24th, 2021"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventAttendance.reception}
                  name="reception"
                  onChange={this.handleEventsChange}
                />
              }
              label="Reception - December 26th, 2021"
            />
          </FormGroup>
          <Button
            disabled={submitDisabled || submitLoading}
            variant="contained"
            color="success"
            onClick={this.handleSubmit}
            style={{ marginTop: 10 }}>
            <CheckCircleIcon /> Submit
          </Button>
        </FormGroup>
      </Container>
    );
  }
}
