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
      <Dialog id="modify-rsvp-dialog" maxWidth="xs" open={open} onClose={this.onCancel}>
        <DialogContent>
          <Typography variant="body2">Please provide your first name and last name</Typography>
          <FormGroup>
            <TextField
              name="given-name"
              autoComplete="given-name"
              id="firstName"
              margin="normal"
              size="small"
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
              size="small"
              required
              label="Last Name"
              value={lastName}
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={proceedDisabled}
            variant="contained"
            color="info"
            onClick={this.onProceed}>
            <Typography variant="body2">Proceed</Typography>
          </Button>
          <Button variant="contained" color="warning" onClick={this.onCancel}>
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
