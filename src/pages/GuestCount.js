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
  Paper,
  TableFooter,
} from '@mui/material';
import Loading from '../components/Loading';
import { style } from '@mui/system';

const styles = {
  container: {
    height: '44pc',
    overflowY: 'scroll',
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
          mehndi.push(guest);
        }
        if (guest.eventAttendance.Nikkah) {
          nikkah.push(guest);
        }
        if (guest.eventAttendance.Reception) {
          reception.push(guest);
        }
      });

      this.setState({ guests, mehndi, nikkah, reception });
    } catch (error) {
      console.log(error);
    }
  };

  renderEventTable = (eventArr, name) => {
    return (
      <TableContainer style={{ marginTop: 20, textAlign: '-webkit-center' }}>
        <Typography variant="h6">{name} Attending Guests</Typography>
        <Table stickyHeader size="small" component={Paper} style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" variant="head" style={styles.headerCell}>
                Name
              </TableCell>
              <TableCell align="center" variant="head" style={styles.headerCell}>
                Guests
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventArr.map((guest) => (
              <TableRow key={guest.guestId}>
                <TableCell align="center" variant="body" style={styles.bodyCell}>
                  <b>{guest.firstName}</b>
                  {' ' + guest.lastName}
                </TableCell>
                <TableCell align="center" variant="body" style={styles.bodyCell}>
                  {guest.numberOfGuests}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="center" variant="footer">
                <Typography style={styles.footerCell} variant="body2">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center" style={styles.footerCell} variant="footer">
                <Typography variant="body2">{eventArr.length}</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  };

  render() {
    const { guests, nikkah, mehndi, reception } = this.state;
    return (
      <Container style={styles.container}>
        {!guests && <Loading page={true} />}
        {guests && (
          <div id="counts">
            {/* <Typography variant="h6">
              Mehndi: {mehndi.length}, Nikkah: {nikkah.length}, Reception: {reception.length}
            </Typography> */}
            {this.renderEventTable(mehndi, 'Mehndi')}
            {this.renderEventTable(nikkah, 'Nikkah')}
            {this.renderEventTable(reception, 'Reception')}
          </div>
        )}
      </Container>
    );
  }
}
