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
import CancelIcon from '@mui/icons-material/Cancel';

import { LOCAL_API_URL } from '../config';

/* 
* TODO: Add eventAttendance condition based on guestCode
* TODO: Add UI for record not found
* TODO: Add UI for loading
*/

export default class UpdateRsvpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpEntry: null,
      submitLoading: false,
    };
  }

  componentDidMount = async () => {
    const { firstName, lastName } = this.props;
    const guestId = firstName.charAt(0).toLowerCase() + lastName;
    try {
      const params = { firstName, lastName };
      const response = await axios.get(`${LOCAL_API_URL}/rsvp/${guestId}`, { params: params });
      const rsvpEntry = response.data;
      this.setState({ rsvpEntry });
    } catch (error) {
      console.log(error);
    }
  };

  renderEventsCheckboxes = () => {
    const { eventAttendance } = this.state.rsvpEntry;
    return (
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
    );
  };

  /*
   * Handles form text field changes
   */
  handleInputChange = (event) => {
    const { value, id } = event.target;
    let { rsvpEntry } = this.state;
    rsvpEntry[id] = value;
    this.setState({ rsvpEntry });
  };

  /*
   * Handles checkboxes for events
   */
  handleEventsChange = (event) => {
    const { checked, name } = event.target;
    let { rsvpEntry } = this.state;
    rsvpEntry.eventAttendance[name] = checked;
    this.setState({ rsvpEntry });
  };

  /*
   * Handle update submit
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitLoading: true });

    const { rsvpEntry } = this.state;

    const updatedRsvpData = rsvpEntry;
    const { guestId, firstName, lastName } = rsvpEntry;
    const params = { firstName, lastName };

    try {
      const response = await axios.put(`${LOCAL_API_URL}/rsvp/${guestId}/update`, updatedRsvpData, {
        params: params,
      });
      console.log('Update RSVP response: ', response);

      //   Redirect Home
      this.props.redirect();
    } catch (error) {
      console.log('Error creating rsvp');
      console.log(error);
    }
  };

  render() {
    const { rsvpEntry, submitLoading } = this.state;

    if (!rsvpEntry) {
      return <div>Loading</div>;
    }

    const {
      firstName, //
      lastName,
      numberOfGuests,
      phoneNumber,
    } = rsvpEntry;

    const updateDisabled = !firstName || !lastName || !numberOfGuests || !phoneNumber;

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
            disabled
            label="First Name"
            value={firstName}
          />
          <TextField
            name="family-name"
            id="lastName"
            autoComplete="family-name"
            margin="normal"
            disabled
            required
            label="Last Name"
            value={lastName}
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
          {this.renderEventsCheckboxes()}
          <Button
            disabled={updateDisabled || submitLoading}
            variant="contained"
            color="success"
            onClick={this.handleSubmit}
            style={{ marginTop: 10 }}>
            <CheckCircleIcon /> Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={this.props.redirect}
            style={{ marginTop: 10 }}>
            <CancelIcon /> Cancel
          </Button>
        </FormGroup>
      </Container>
    );
  }
}
