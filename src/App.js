import { useEffect, useState } from "react";
import Axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ReactComponent as SpruceLogo } from "./assets/spruce-logo.svg";
import "./App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: "200px",
  maxWidth: "700px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 1,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D8D8D8",
    color: "#404040",
    fontSize: "0.950rem",
    fontWeight: 500,
    textAlign: "left",
    padding: "4px 12px",
    "&:last-of-type": {
      textAlign: "right",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#F5F5F5",
    color: "#404040",
    fontWeight: 500,
    textAlign: "left",
    padding: "4px 12px 14px",
    "&:last-of-type": {
      textAlign: "right",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [customerName, setCustomerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    Axios.get("https://spruce-booking.herokuapp.com/https://spruce-booking.netlify.app/api/getBookings").then((response) => {
      setBookings(response.data);
    })
  }, [bookings])

  const submitBooking = () => {
    Axios.post("https://spruce-booking.herokuapp.com/https://spruce-booking.netlify.app/api/createBooking", {
      customerName: customerName,
      emailAddress: emailAddress,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipCode: zipCode,
      bookingType: bookingType,
      bookingDate: bookingDate,
      bookingTime: bookingTime,
    }).then(() => {
      handleClose();
    });
  };

  return (
    <div className="App">
      <Box id="headerContainer">
        <Box>
          <AppBar position="static" elevation={0} id="topAppBar">
            <Toolbar id="topToolBar">
              <SpruceLogo />
            </Toolbar>
          </AppBar>
        </Box>
        <Box>
          <AppBar position="static" elevation={0} id="bottomAppBar">
            <Toolbar id="bottomToolBar">
              <Typography variant="h5" id="bottomToolBarTitle">
                Bookings
              </Typography>
              <Button variant="contained" id="createBookingBtnHeader" onClick={handleOpen}>
                Create booking
              </Button>
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Card sx={style}>
                  <CardHeader title="Create Booking" sx={{ color: "#404040" }}></CardHeader>
                  <Box className="form">
                    <CardContent>
                      <Grid item container spacing={2} justify="center">
                        <Grid item xs={12} sm={12} md={6}>
                        <TextField fullWidth id="outlined-name" label="Name" variant="outlined" onChange={(e) => { setCustomerName(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel id="outlined-booking-type-label"> Booking Type </InputLabel>
                            <Select labelId="outlined-booking-type-label" id="outlined-booking-type" value={bookingType} label="Booking Type" onChange={(e) => { setBookingType(e.target.value); }}>
                              <MenuItem value={"Housekeeping"}> Housekeeping </MenuItem>
                              <MenuItem value={"Dog Walk"}>Dog Walk</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField fullWidth id="outlined-email" label="Email" variant="outlined" onChange={(e) => { setEmailAddress(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField fullWidth id="outlined-booking-date" label="Booking Date" variant="outlined" onChange={(e) => { setBookingDate(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField fullWidth id="outlined-street-address" label="Street Address" variant="outlined" onChange={(e) => { setStreetAddress(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField fullWidth id="outlined-booking-time" label="Booking Time" variant="outlined" onChange={(e) => { setBookingTime(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField fullWidth id="outlined-city" label="City" variant="outlined" onChange={(e) => { setCity(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}></Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <TextField fullWidth id="outlined-state" label="State" variant="outlined" type="text" maxLength={2} onChange={(e) => { setState(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <TextField fullWidth id="outlined-zip-code" label="Zip Code" variant="outlined" type="number" onChange={(e) => { setZipCode(e.target.value); }} InputProps={{ startAdornment: <InputAdornment position="start">&nbsp;</InputAdornment> }} />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ padding: "8px 16px", justifyContent: "end" }}>
                      <Button id="createBookingBtnForm" onClick={submitBooking}>
                        Create Booking
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Modal>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
      <Box id="tableContainer">
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: "100%" }} aria-label="bookings table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">
                  Booking&nbsp;Type
                </StyledTableCell>
                <StyledTableCell align="right">
                  Booking&nbsp;Date/Time
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <StyledTableRow key={booking.name}>
                  <StyledTableCell>{booking.name}</StyledTableCell>
                  <StyledTableCell>{booking.email_address}</StyledTableCell>
                  <StyledTableCell>{booking.street_address} <br/> {booking.city} {booking.state} {booking.zip_code}</StyledTableCell>
                  <StyledTableCell>{booking.booking_type}</StyledTableCell>
                  <StyledTableCell>{booking.booking_date} at {booking.booking_time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default App;
