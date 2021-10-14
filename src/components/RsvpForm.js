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
  Typography,
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PRODUCT_API_URL } from '../config';
import Loading from '../components/Loading';

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  submitButton: {
    maxWidth: '60%',
    margin: '10px auto',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkboxText: { fontWeight: 'bold' },
};

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
      const response = await axios.get(`${PRODUCT_API_URL}/eventsInformation/${guestCode}`);
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
      const response = await axios.post(`${PRODUCT_API_URL}/rsvp`, rsvpData);
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
    this.props.redirect();
  };

  /*
   * Render event checkboxes based on guestCode
   */
  renderEventsCheckboxes = () => {
    const { eventAttendance, allowedEvents } = this.state;
    const label =
      allowedEvents.length > 1
        ? 'Please select the event(s) you and your party will be attending:'
        : 'Please select the event you and your party will be attending:';

    return (
      <FormGroup id="events-checkboxes" style={{ marginTop: 10 }}>
        <FormLabel component="legend" style={{ marginBottom: 5 }}>
          <Typography style={{ fontWeight: 'bold' }}>{label}</Typography>
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
              label={
                <span style={{ display: 'inline-flex' }}>
                  <Typography style={{ fontWeight: 'bold' }}>{name} </Typography> - {timeOfEvent}
                </span>
              }
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
      <Container maxWidth="sm" style={styles.container}>
        <FormGroup id="new-rsvp-form">
          <FormLabel>
            <Typography style={{ fontWeight: 'bold' }}>
              Please enter your information below
            </Typography>
            <Typography variant="subtitle2">(All fields are required)</Typography>
          </FormLabel>
          <TextField
            name="given-name"
            autoComplete="given-name"
            id="firstName"
            margin="normal"
            label="First Name"
            size="small"
            value={firstName}
            style={styles.textField}
            onChange={this.handleInputChange}
          />
          <TextField
            name="family-name"
            id="lastName"
            autoComplete="family-name"
            margin="normal"
            label="Last Name"
            size="small"
            value={lastName}
            style={styles.textField}
            onChange={this.handleInputChange}
          />
          <TextField
            id="numberOfGuests"
            type="number"
            margin="normal"
            label="Number Of Guests (Including You)"
            size="small"
            value={numberOfGuests}
            style={styles.textField}
            onChange={this.handleInputChange}
          />
          <TextField
            type="tel"
            id="phoneNumber"
            autoComplete="phone"
            margin="normal"
            label="Phone Number"
            size="small"
            value={phoneNumber}
            style={styles.textField}
            onChange={this.handleInputChange}
          />
          {allowedEvents && this.renderEventsCheckboxes()}
          {!allowedEvents && <Loading page={true} />}
          <Button
            disabled={submitDisabled || submitLoading}
            variant="contained"
            size="small"
            color="success"
            onClick={this.handleSubmit}
            style={styles.submitButton}>
            <CheckCircleIcon />
            {'   '} Submit
          </Button>
        </FormGroup>
        {submitLoading && <Loading form={true} />}
      </Container>
    );
  }
}
