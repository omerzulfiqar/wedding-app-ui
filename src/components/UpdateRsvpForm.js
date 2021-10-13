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
  Typography,
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Loading from './Loading';
import { LOCAL_API_URL } from '../config';

/*
 * TODO: Figure out a better way to render the checkboxes without making an api call
 */

export default class UpdateRsvpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpEntry: null,
      submitLoading: false,
      allowedEvents: null,
      error: false,
    };
  }

  componentDidMount = async () => {
    const { firstName, lastName } = this.props;
    const guestId = firstName.charAt(0).toLowerCase() + lastName;
    try {
      const params = { firstName, lastName };
      // Get RSVP record for user
      const getRSVPResponse = await axios.get(`${LOCAL_API_URL}/rsvp/${guestId}`, {
        params: params,
      });
      const rsvpEntry = getRSVPResponse.data;
      // Using the guestCode, get the allowed events for the user
      const { guestCode } = rsvpEntry;
      const getEventsResponse = await axios.get(`${LOCAL_API_URL}/eventsInformation/${guestCode}`);
      const { events } = getEventsResponse.data;
      this.setState({ rsvpEntry, allowedEvents: events });
    } catch (error) {
      this.setState({ error: true, rsvpEntry: {} });
      console.log(error);
    }
  };

  /*
   * Render event checkboxes based on allowed events
   */
  renderEventsCheckboxes = () => {
    const { eventAttendance } = this.state.rsvpEntry;
    const { allowedEvents } = this.state;
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
                  checked={eventAttendance[name]}
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

  /* 
  * 404 render error
  */
  renderError = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <Typography style={{ textAlign: 'center' }} variant="h6">
          Uh oh! We ran into an error looking for your record 😔  Please make sure your name is spelled
          correctly. If this happens again, please create a new RSVP record. Thank you! 🤗
        </Typography>
        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="info"
          onClick={this.props.redirect}>
          Back
        </Button>
      </div>
    );
  };

  render() {
    const { rsvpEntry, submitLoading, allowedEvents, error } = this.state;

    if (!rsvpEntry) return <Loading />;
    else if (error) {
      return this.renderError();
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
        {rsvpEntry && (
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
            {allowedEvents && this.renderEventsCheckboxes()}
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
        )}
      </Container>
    );
  }
}
