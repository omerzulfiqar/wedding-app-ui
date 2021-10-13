/* eslint-disable no-unused-vars */
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

// TODO: Add UI for loading events
// TODO: fix checkbox state after submission
export default class RsvpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      numberOfGuests: '',
      phoneNumber: '',
      eventAttendance: {},
      submitLoading: false,
      submitted: false,
      allowedEvents: null,
    };
  }

  componentDidMount = async () => {
    const { guestCode } = this.props;
    try {
      const response = await axios.get(`${LOCAL_API_URL}/eventsInformation/${guestCode}`);
      const { events } = response.data;
      let { eventAttendance } = this.state;
      events.forEach((event) => {
        eventAttendance[event.name] = false;
      });
      this.setState({ allowedEvents: events, eventAttendance });
    } catch (error) {
      console.log(error);
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

  /*
   * Handles checkboxes for events
   */
  handleEventsChange = (event) => {
    const { checked, name } = event.target;
    let { eventAttendance } = this.state;
    eventAttendance[name] = checked;
    this.setState({ eventAttendance });
  };

  /*
   * Handle RSVP submission
   */
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

    const guestCode = this.props.guestCode;

    const rsvpData = {
      firstName,
      lastName,
      numberOfGuests,
      phoneNumber,
      eventAttendance,
      guestCode,
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

  /*
   * Render event checkboxes based on guestCode
   */
  renderEventsCheckboxes = () => {
    const { eventAttendance, allowedEvents } = this.state;

    return (
      <FormGroup id="events-checkboxes" style={{ marginTop: 10 }}>
        <FormLabel required component="legend">
          Please select the event(s) you and your party will be attending:
        </FormLabel>
        {allowedEvents.map((event) => {
          const { name, timeOfEvent } = event;
          return (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={eventAttendance.name}
                  name={name}
                  onChange={this.handleEventsChange}
                />
              }
              label={`${name} - ${timeOfEvent}`}
            />
          );
        })}
      </FormGroup>
    );
  };

  render() {
    const {
      firstName, //
      lastName,
      numberOfGuests,
      phoneNumber,
      allowedEvents,
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
          {allowedEvents && this.renderEventsCheckboxes()}
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
