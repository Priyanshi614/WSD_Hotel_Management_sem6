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
import {
  GetAllUserInfoApiCall,
  DeleteUserInfoApiCall,
} from "./services/userinfoApi";
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

function ViewAlluser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Alluser, SetAlluser] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [deleteuser, SetDeleteuser] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

  const handleOpen = () => setOpen(true);

  const handleChange = (event) => {
    if (event.target.value === deleteuser.userinfoId.toString()) {
      SetisDisableDeleteBtn(0);
    } else {
      SetisDisableDeleteBtn(1);
    }
  };

  const DeleteUserInfoIdCall = async (userinfoes) => {
    console.log("deleted user");

    try {
      const res = await DeleteUserInfoApiCall(userinfoes.userinfoId);

      if (res.status === 200) {
        toast.success(res.data);
        console.log(res.data);
        SetDeleteuser({});
        setOpen(false);
        SetisDisableDeleteBtn(1);
        navigate("../view_delete_userinfo");
      }
    } catch (err) {
      console.log(err.res.status);
      toast.error(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    GetAllUserInfoApiCall()
      .then(async (result) => {
        await SetAlluser(result);
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

      {Alluser.length === 0 ? (
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
                  <StyledTableCell>User Id</StyledTableCell>

                  <StyledTableCell align="right">User Name</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Hotel Id</StyledTableCell>
                  <StyledTableCell align="right">Room Id</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Alluser.map((userinfoes) => (
                  <StyledTableRow key={userinfoes.userinfoId}>
                    {/* <StyledTableCell component="th" scope="row"> {hotels.hotelId} </StyledTableCell> */}
                    {/* <StyledTableCell component="th" scope="row">{.eId}</StyledTableCell> */}
                    <StyledTableCell align="right">
                      {userinfoes.userinfoId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {userinfoes.u_Name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {userinfoes.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {userinfoes.hotelId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {userinfoes.roomsId}
                    </StyledTableCell>

                    <StyledTableCell>
                      {" "}
                      <Button
                        onClick={() => {
                          SetDeleteuser(userinfoes);
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
              To delete the User <b>{deleteuser.userinfoId}</b>, type the user
              Id to confirm.
              <br />
              <TextField
                // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                label="Enter User Id"
                margin="normal"
                name="hotelId"
                onChange={handleChange}
                variant="outlined"
              />
              <br />
              <Button
                onClick={() => {
                  DeleteUserInfoIdCall(deleteuser);
                  navigate("../view_delete_userinfo");
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
                  SetDeleteuser({});
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

export default ViewAlluser;
