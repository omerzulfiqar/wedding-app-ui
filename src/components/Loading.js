/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Circles, Rings } from '@agney/react-loading';
import { Container } from '@mui/material';

export default class Loading extends Component {
  render() {
    return (
      <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: 30 }}>
        {this.props.page && <Circles width="20%" style={{ color: '#8B008B' }} />}
        {this.props.form && <Rings width="20%" style={{ color: '#20B2AA' }} />}
      </Container>
    );
  }
}
