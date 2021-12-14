/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import ModifyRsvpDialog from '../components/ModifyRsvpDialog';
import { GROOM, BRIDE } from '../config';
import MasksIcon from '@mui/icons-material/Masks';
import img from '../static/img.png';

const styles = {
  container: {
    textAlign: 'center',
    alignItems: 'center',
    margin: '10% auto',
    padding: 0,
  },
  subContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    display: 'grid',
  },
  button: {
    width: '45%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Alegreya SC',
    fontWeight: 'bold',
    borderRadius: 20,
    boxShadow: 'none',
    color: '#fff7ee',
  },
  covidButton: {
    width: '10%',
    borderRadius: 20,
    boxShadow: 'none',
    color: '#fff7ee',
  },
  img: {
    maxWidth: '-webkit-fill-available',
    marginTop: 15,
    marginLeft: '2%',
  },
};
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
    const { guestCode } = this.state;
    this.props.history.push(`/${guestCode}/rsvp/${firstName}/${lastName}`);
  };

  onDialogCancel = () => {
    this.setState({ dialogOpen: false });
  };

  onCovidClick = () => {
    const { guestCode } = this.state;
    this.props.history.push(`/${guestCode}/covidGuidelines`);
  };

  render() {
    const { dialogOpen, guestCode } = this.state;

    return (
      <Container id="page-container" style={styles.container}>
        <Typography color="primary" style={styles.title} variant="h3">
          <span>{GROOM}</span>
          <span>and</span>
          <span>{BRIDE}</span>
        </Typography>
        <Container id="actions-container" maxWidth="xs" style={styles.subContainer}>
          <Stack spacing={3}>
            <Button
              style={styles.button}
              variant="contained"
              onClick={() => this.props.history.push(`${guestCode}/rsvp`)}>
              RSVP
            </Button>
            <Button style={styles.button} variant="contained" onClick={this.openDialog}>
              Modify RSVP
            </Button>
            <Button
              style={styles.button}
              variant="contained"
              onClick={() => this.props.history.push(`/${guestCode}/eventsInformation`)}>
              Events Info
            </Button>
            <Button
              style={styles.button}
              variant="contained"
              onClick={() => this.props.history.push(`/${guestCode}/guestList`)}>
              Guest List
            </Button>
          </Stack>
          <Button />
          {dialogOpen && (
            <ModifyRsvpDialog
              dialogOpen={dialogOpen}
              redirect={this.redirectToUpdateRsvpPage}
              onCancel={this.onDialogCancel}
            />
          )}
          <div id="covid-button">
            <Typography color="primary" variant="subtitle2">
              Covid-19 Guidelines. Please read!
            </Typography>
            <Button
              onClick={this.onCovidClick}
              color="primary"
              variant="contained"
              style={styles.covidButton}>
              <MasksIcon fontSize="medium" />
            </Button>
          </div>
          <Typography color="primary" variant="body2" style={{ marginTop: 15 }}>
            {"We don't have a wedding registry. No boxed gifts please. Thank you! 😊"}
          </Typography>
          <img src={img} style={styles.img} />
        </Container>
      </Container>
    );
  }
}
