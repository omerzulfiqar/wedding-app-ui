/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import ModifyRsvpDialog from '../components/ModifyRsvpDialog';

const styles = {
  container: {
    textAlign: 'center',
    alignItems: 'center',
    margin: '50% auto',
  },
  subContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    margin: 10,
    display: 'grid',
  },
  button: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Alegreya SC',
    fontWeight: 'bold',
    borderRadius: 20,
    boxShadow: 'none',
    color: '#EAD4B7',
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

  render() {
    const { dialogOpen, guestCode } = this.state;

    return (
      <Container id="page-container" style={styles.container}>
        <Typography color="primary" style={styles.title} variant="h3">
          <span>Omer Zulfiqar</span>
          <span>and</span>
          <span>Kayanat Tanveer</span>
        </Typography>
        <Container id="actions-container" maxWidth="xs" style={styles.subContainer}>
          <Stack spacing={2}>
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
          </Stack>
          <Button />
          {dialogOpen && (
            <ModifyRsvpDialog
              dialogOpen={dialogOpen}
              redirect={this.redirectToUpdateRsvpPage}
              onCancel={this.onDialogCancel}
            />
          )}
        </Container>
      </Container>
    );
  }
}
