import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
// import { AllStudentsApiCall } from '../services/userApis';
import { Link } from "react-router-dom";
import {
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  Card,
  CardContent,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Table,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router";
import { GetAllHotelApiCall, DeleteHotelApiCall } from "./services/hotelApi";
import { toast } from "react-toastify";
// import Navbar from '../components/dashboard/navbar';
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ViewAllhotel() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Allhotel, SetAllhotel] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [deletehotel, SetDeletehotel] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

  const handleOpen = () => setOpen(true);

  const handleChange = (event) => {
    if (event.target.value === deletehotel.hotelId.toString()) {
      SetisDisableDeleteBtn(0);
    } else {
      SetisDisableDeleteBtn(1);
    }
  };

  const DeletehotelIdCall = async (hotels) => {
    console.log("deleted hotel");

    try {
      const res = await DeleteHotelApiCall(hotels.hotelId);

      if (res.status === 200) {
        toast.success(res.data);
        console.log(res.data);
        SetDeletehotel({});
        setOpen(false);
        SetisDisableDeleteBtn(1);
        navigate("../view_delete_hotel");
      }
    } catch (err) {
      console.log(err.res.status);
      toast.error(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    GetAllHotelApiCall()
      .then(async (result) => {
        await SetAllhotel(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* <Navbar  activeLink='View Employee'/> */}
      <br />

      {Allhotel.length === 0 ? (
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
                  <StyledTableCell>hotelId</StyledTableCell>

                  <StyledTableCell align="right">Hotel Name</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>

                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Allhotel.map((hotels) => (
                  <StyledTableRow key={hotels.hotelId}>
                    {/* <StyledTableCell component="th" scope="row"> {hotels.hotelId} </StyledTableCell> */}
                    {/* <StyledTableCell component="th" scope="row">{.eId}</StyledTableCell> */}
                    <StyledTableCell align="right">
                      {hotels.hotelId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {hotels.h_Name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {hotels.location}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {" "}
                      <Button
                        onClick={() => {
                          navigate("/hotel/updatehotel/" + hotels.hotelId);
                        }}
                        variant="contained"
                        sx={{ marginRight: "5px" }}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Button
                        onClick={() => {
                          SetDeletehotel(hotels);
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Drop Payroll
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              To delete the Hotel <b>{deletehotel.hotelId}</b>, type the Hotel
              Id to confirm.
              <br />
              <TextField
                // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                label="Enter HotelId"
                margin="normal"
                name="hotelId"
                onChange={handleChange}
                variant="outlined"
              />
              <br />
              <Button
                onClick={() => {
                  DeletehotelIdCall(deletehotel);
                  navigate("../view_delete_hotel");
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
                  SetDeletehotel({});
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

export default ViewAllhotel;
