/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  FormGroup,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const styles = {
  button: {
    color: '#fff7ee',
  },
  dialog: {
    backgroundColor: '#fff7ee',
    border: 'solid 2px #1D2C4C',
  },
};

export default class ModifyRsvpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.dialogOpen,
      firstName: '',
      lastName: '',
    };
  }

  handleInputChange = (event) => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  onCancel = () => {
    const { open } = this.state;
    this.setState({ open: !open, firstName: '', lastName: '' });
    this.props.onCancel();
  };

  onProceed = () => {
    const { firstName, lastName } = this.state;

    this.props.redirect(firstName.trim(), lastName.trim());
  };

  render() {
    const { open, firstName, lastName } = this.state;
    const proceedDisabled = !firstName || !lastName;
    return (
      <Dialog
        id="modify-rsvp-dialog"
        maxWidth="xs"
        PaperProps={{
          style: styles.dialog,
        }}
        open={open}
        onClose={this.onCancel}>
        <DialogContent>
          <Typography color="primary" variant="body1">
            Please provide your first name and last name
          </Typography>
          <FormGroup>
            <TextField
              focused
              name="given-name"
              autoComplete="given-name"
              id="firstName"
              margin="normal"
              size="small"
              label="First Name"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <TextField
              focused
              name="family-name"
              id="lastName"
              autoComplete="family-name"
              margin="normal"
              size="small"
              label="Last Name"
              value={lastName}
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" style={styles.button} onClick={this.onCancel}>
            <CancelIcon fontsize="medium" />
          </Button>
          <Button
            disabled={proceedDisabled}
            style={styles.button}
            variant="contained"
            color="primary"
            onClick={this.onProceed}>
            <ArrowForwardIcon fontsize="medium" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
