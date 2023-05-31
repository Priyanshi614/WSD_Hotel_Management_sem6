import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
// import { AllStudentsApiCall } from '../services/userApis';
import { Link } from 'react-router-dom';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router";
import { GetAllRoomApiCall , DeleteRoomApiCall } from './services/roomApi';
import { toast } from 'react-toastify';
// import Navbar from '../components/dashboard/navbar';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ViewAllroom() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Allroom, SetAllroom] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deleteroom, SetDeleteroom] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

    const handleOpen = () => setOpen(true);

    const handleChange = (event) => {
        if (event.target.value === deleteroom.roomId.toString()) {
            SetisDisableDeleteBtn(0);
        } else {
            SetisDisableDeleteBtn(1);
        }
    }

    const DeleteroomIdCall = async (rooms) => {
        console.log('deleted room');

        try {
            const res = await DeleteRoomApiCall(rooms.roomsId);

            if (res.status === 200) {
                toast.success(res.data);
                console.log(res.data);
                SetDeleteroom({});
                setOpen(false);
                SetisDisableDeleteBtn(1);
               navigate('../view_delete_room');
            }
        } catch (err) {

            console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }


    }

    useEffect(() => {
        GetAllRoomApiCall().then(async (result) => { await SetAllroom(result); }).catch((err) => { console.log(err) });
      },[]);

    

    return (
      <>
        <Navbar />
        {/* <Navbar  activeLink='View Employee'/> */}
        <br />

        {Allroom.length === 0 ? (
          <>
            <Box sx={{ display: "flex", marginLeft: "50%" }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{ margin: "20px", width: "97%" }}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">hotel Id</StyledTableCell>

                    <StyledTableCell align="right">room Id</StyledTableCell>
                    <StyledTableCell align="left">Delete</StyledTableCell>

                    {/* <StyledTableCell align="right">Location</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Allroom.map((rooms) => (
                    <StyledTableRow key={rooms.roomsId}>
                      {/* <StyledTableCell component="th" scope="row"> {hotels.hotelId} </StyledTableCell> */}
                      {/* <StyledTableCell component="th" scope="row">{.eId}</StyledTableCell> */}
                      <StyledTableCell align="right">
                        {rooms.hotelId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {rooms.roomsId}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">{hotels.location}</StyledTableCell> */}

                      <StyledTableCell>
                        {" "}
                        <Button
                          onClick={() => {
                            SetDeleteroom(rooms);
                            handleOpen();
                          }}
                          variant="contained"
                          color="error"
                          sx={{ marginRight: "5px" }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <br />

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Drop Payroll
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                To delete the Room <b>{deleteroom.roomId}</b>, type the Room Id
                to confirm.
                <br />
                <TextField
                  // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  label="Enter RoomId"
                  margin="normal"
                  name="hotelId"
                  onChange={handleChange}
                  variant="outlined"
                />
                <br />
                <Button
                  onClick={() => {
                    DeleteroomIdCall(deleteroom);
                    navigate("../view_delete_room");
                  }}
                  variant="contained"
                  color="error"
                  disabled={isDisableDeleteBtn}
                  sx={{ marginRight: "5px" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    SetDeleteroom({});
                    setOpen(false);
                    SetisDisableDeleteBtn(1);
                  }}
                  variant="contained"
                  sx={{ color: "#fafafa" }}
                >
                  Cancle
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </>
    );
}

export default ViewAllroom;