/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Circles, ThreeDots } from '@agney/react-loading';
import { Container } from '@mui/material';

export default class Loading extends Component {
  render() {
    return (
      <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: 30 }}>
        {this.props.page && <Circles width="20%" style={{ color: '#1D2C4C' }} />}
        {this.props.form && <ThreeDots width="20%" style={{ color: '#1D2C4C' }} />}
      </Container>
    );
  }
}
