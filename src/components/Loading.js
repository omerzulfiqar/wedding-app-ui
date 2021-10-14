import React, { Component } from 'react';
import { Circles } from '@agney/react-loading';
import { Container } from '@mui/material';

export default class Loading extends Component {
  render() {
    return (
      <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: 30 }}>
        <Circles width="20%" />
      </Container>
    );
  }
}
