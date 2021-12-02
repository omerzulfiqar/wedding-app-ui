/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import { PRODUCT_API_URL } from '../config';
import {
  Container,
  Typography,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Button,
} from '@mui/material';
import Loading from '../components/Loading';
import { style } from '@mui/system';

const styles = {
  container: {
    height: '44pc',
    overflowY: 'scroll',
    textAlign: 'center',
  },
  table: {
    width: 'fit-content',
    backgroundColor: '#c0b6a8',
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#1d2c4c',
    color: '#fff7ee',
  },
  bodyCell: {
    color: '#1d2c4c',
    fontWeight: 'normal',
  },
  footerCell: {
    color: '#1d2c4c',
  },
};

export default class GuestCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: null,
      mehndi: null,
      nikkah: null,
      reception: null,
      mehndiTable: false,
      nikkahTable: false,
      recTable: false,
    };
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}/weddingGuestCount`);
      let guests = response.data;
      guests.sort((a, b) => {
        const name1 = a.firstName.toLowerCase();
        const name2 = b.firstName.toLowerCase();

        if (name1 < name2) {
          return -1;
        }
        if (name1 > name2) {
          return 1;
        }
        return 0;
      });

      let mehndi = [];
      let nikkah = [];
      let reception = [];

      guests.forEach((guest) => {
        if (guest.eventAttendance.Mehndi) {
          const dup = { ...guest };
          if (dup.firstName === 'Gulnar' || dup.firstName === 'Aaliya') {
            dup.numberOfGuests = 2;
            mehndi.push(dup);
          } else if (dup.firstName === 'Pushpaul') {
            dup.numberOfGuests = 3;
            mehndi.push(dup);
          } else if (dup.firstName === 'Rehan' || dup.firstName === 'Shah') {
            dup.numberOfGuests = 1;
            mehndi.push(dup);
          } else mehndi.push(guest);
        }
        if (guest.eventAttendance.Nikkah) {
          const dup = { ...guest };
          if (
            dup.firstName === 'Komal' ||
            dup.firstName === 'Rehan' ||
            dup.firstName === 'Shah' ||
            dup.firstName === 'Ana' ||
            dup.firstName === 'Zehra' ||
            dup.firstName === 'Noor' ||
            dup.firstName === 'Cindy'
          ) {
            dup.numberOfGuests = 1;
            nikkah.push(dup);
          } else if (dup.firstName === 'Rubina') {
            dup.numberOfGuests = 2;
            nikkah.push(dup);
          } else {
            nikkah.push(guest);
          }
        }
        if (guest.eventAttendance.Reception) {
          const dup = { ...guest };
          if (dup.firstName === 'Pushpaul') {
            dup.numberOfGuests = 2;
            reception.push(dup);
          } else {
            reception.push(guest);
          }
        }
      });

      this.setState({ guests, mehndi, nikkah, reception });
    } catch (error) {
      console.log(error);
    }
  };

  formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match && str.length === 10) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }

    return str;
  };

  renderEventTable = (eventArr, name) => {
    let totalGuests = 0;
    eventArr.forEach((guest) => {
      totalGuests += parseInt(guest.numberOfGuests);
    });
    return (
      <TableContainer style={{ marginTop: 20, textAlign: '-webkit-center' }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h6">Total: {totalGuests} </Typography>
        <Table stickyHeader size="small" style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" variant="head" style={styles.headerCell}>
                Name
              </TableCell>
              <TableCell align="center" variant="head" style={styles.headerCell}>
                Guests
              </TableCell>
              <TableCell align="center" variant="head" style={styles.headerCell}>
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventArr.map((guest) => {
              let phone = guest.phoneNumber;
              phone = this.formatPhoneNumber(phone);
              return (
                <TableRow key={guest.firstName + guest.lastName}>
                  <TableCell align="center" variant="body" style={styles.bodyCell}>
                    <b>{guest.firstName}</b>
                    {' ' + guest.lastName}
                  </TableCell>
                  <TableCell align="center" variant="body" style={styles.bodyCell}>
                    {guest.numberOfGuests}
                  </TableCell>
                  <TableCell align="center" variant="body" style={styles.bodyCell}>
                    {phone}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  render() {
    const { guests, nikkah, mehndi, reception, mehndiTable, nikkahTable, recTable } = this.state;
    return (
      <Container style={styles.container}>
        {!guests && <Loading page={true} />}
        {guests && (
          <div id="counts">
            <Typography variant="h5" style={{ marginBottom: 10 }}>
              Attending Guest Count
            </Typography>
            <Button
              style={{ margin: 5 }}
              color="primary"
              size="medium"
              variant="contained"
              onClick={() =>
                this.setState({ mehndiTable: !mehndiTable, nikkahTable: false, recTable: false })
              }>
              Mehndi Table
            </Button>
            <Button
              style={{ margin: 5 }}
              color="primary"
              size="medium"
              variant="contained"
              onClick={() =>
                this.setState({ nikkahTable: !nikkahTable, mehndiTable: false, recTable: false })
              }>
              Nikkah Table
            </Button>
            <Button
              style={{ margin: 5 }}
              color="primary"
              size="medium"
              variant="contained"
              onClick={() =>
                this.setState({ recTable: !recTable, mehndiTable: false, nikkahTable: false })
              }>
              Reception Table
            </Button>
            {mehndiTable && this.renderEventTable(mehndi, 'Mehndi')}
            {nikkahTable && this.renderEventTable(nikkah, 'Nikkah')}
            {recTable && this.renderEventTable(reception, 'Reception')}
          </div>
        )}
      </Container>
    );
  }
}
