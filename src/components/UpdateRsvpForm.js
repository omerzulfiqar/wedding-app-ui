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
import { PRODUCT_API_URL } from '../config';
import '../App.css';

/*
 * TODO: Figure out a better way to render the checkboxes without making an api call
 */

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    maxWidth: '60%',
    margin: '10px auto',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fff7ee',
  },
  checkboxLabel: {
    display: 'inline-flex',
    color: '#1D2C4C',
  },
};

export default class UpdateRsvpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpEntry: null,
      submitLoading: false,
      allowedEvents: null,
      error: false,
      guestCode: null,
    };
  }

  componentDidMount = async () => {
    const { firstName, lastName } = this.props;
    const guestId = firstName.charAt(0).toLowerCase() + lastName;
    try {
      const params = { firstName, lastName };
      // Get RSVP record for user
      const getRSVPResponse = await axios.get(`${PRODUCT_API_URL}/rsvp/${guestId}`, {
        params: params,
      });
      const rsvpEntry = getRSVPResponse.data;
      // Using the guestCode, get the allowed events for the user
      const { guestCode } = rsvpEntry;
      const getEventsResponse = await axios.get(
        `${PRODUCT_API_URL}/eventsInformation/${guestCode}`,
      );
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
    const label =
      allowedEvents.length > 1
        ? 'Please select the event(s) you and your party will be attending:'
        : 'Please select the event you and your party will be attending:';
    return (
      <FormGroup id="events-checkboxes" style={{ marginTop: 10 }}>
        <FormLabel component="legend">
          <Typography color="primary" variant="body2">
            {label}
          </Typography>
        </FormLabel>
        {allowedEvents.map((event) => {
          const { name, timeOfEvent } = event;
          return (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  style={{ color: '#1D2C4C' }}
                  checked={eventAttendance[name]}
                  name={name}
                  onChange={this.handleEventsChange}
                />
              }
              label={
                <span style={styles.checkboxLabel}>
                  <Typography variant="body2">{name} </Typography> - {timeOfEvent}
                </span>
              }
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
      const response = await axios.put(
        `${PRODUCT_API_URL}/rsvp/${guestId}/update`,
        updatedRsvpData,
        {
          params: params,
        },
      );
      console.log('Update RSVP response: ', response);
      this.setState({ submitLoading: false });
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
        <Typography color="primary" style={{ textAlign: 'center' }} variant="body2">
          Uh oh! We ran into an error looking for your record 😔 Please make sure your name is
          spelled correctly. If this happens again, please create a new RSVP record. Thank you! 🤗
        </Typography>
        <Button
          style={styles.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={this.props.redirect}>
          Back
        </Button>
      </div>
    );
  };

  render() {
    const { rsvpEntry, submitLoading, allowedEvents, error } = this.state;

    if (!rsvpEntry) return <Loading page={true} />;
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
      <Container maxWidth="sm" style={styles.container}>
        {rsvpEntry && (
          <FormGroup id="new-rsvp-form">
            <Typography color="primary" variant="body2">
              Please update your information below
            </Typography>
            <TextField
              focused
              name="given-name"
              autoComplete="given-name"
              id="firstName"
              margin="normal"
              size="small"
              disabled
              label="First Name"
              value={firstName}
            />
            <TextField
              focused
              name="family-name"
              id="lastName"
              autoComplete="family-name"
              margin="normal"
              size="small"
              disabled
              label="Last Name"
              value={lastName}
            />
            <TextField
              focused
              id="numberOfGuests"
              type="number"
              margin="normal"
              size="small"
              label="Number Of Guests (Including You)"
              value={numberOfGuests}
              onChange={this.handleInputChange}
            />
            <TextField
              focused
              type="tel"
              id="phoneNumber"
              autoComplete="phone"
              margin="normal"
              size="small"
              label="Phone Number"
              value={phoneNumber}
              onChange={this.handleInputChange}
            />
            {allowedEvents && this.renderEventsCheckboxes()}
            <Button
              disabled={updateDisabled || submitLoading}
              variant="contained"
              size="small"
              color="primary"
              onClick={this.handleSubmit}
              style={styles.button}>
              <CheckCircleIcon fontSize="small" style={{ marginRight: 2 }} /> Update
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={this.props.redirect}
              style={styles.button}>
              <CancelIcon fontSize="small" style={{ marginRight: 2 }} /> Cancel
            </Button>
          </FormGroup>
        )}
        {submitLoading && <Loading form={true} />}
      </Container>
    );
  }
}
