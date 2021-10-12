/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export default class UpdateRSVP extends Component {
  render() {
    return (
      <div>
        <h1>Update RSVP for {this.props.match.params.firstName + ' ' + this.props.match.params.lastName}</h1>
      </div>
    );
  }
}
