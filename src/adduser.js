import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./navbar";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
 import { toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { CreateUserInfoApiCall } from './services/userinfoApi';
 import { useSelector } from 'react-redux';



const Adduser = () => {
  const navigate = useNavigate();

//   const user = useSelector(state => state.user);
//   console.log(user.user.eId);

  // form controller
  const formik = useFormik({
    // intial values
    initialValues: {
      // hotelId: "",
      u_Name: "",
     address: "",
     hotelId: "",
     roomsId: "",
      
    },

    // To check enter value is vaild or not
    validationSchema: Yup.object({
      // hotelId: Yup.string().max(255).required("Hotel Id is required"),
    //   noOfLeaveInThisMonth: Yup.string().max(255).required("reasone is required"),
      u_Name: Yup.string().required("User Name Is required"),
      address: Yup.string().max(255).required("Address is required"),
      hotelId: Yup.string().max(255).required("Hotel Id is required"),
      roomsId: Yup.string().max(255).required("Room Id is required"),
      
    //   cashInAdvance: Yup.string().max(255).required("reasone is required"),
    
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      // set object to pass request of Backend url
      // console.log(user.eId);
      const requestBody = {
        // hotelId: values.hotelId,
        u_Name: values.u_Name,
        address: values.address,
        hotelId: values.hotelId,
        roomsId: values.roomsId,
       
      };

      console.log(requestBody);

      try {
          // call to backend url
          const response = await CreateUserInfoApiCall(requestBody);

          //  status of respose
          if (response.status === 201) {
                  toast.success("User added Successfully");
                  console.log(response.data.userinfoId);
                  navigate('../view_delete_userinfo');
          }

      } catch (err) {
          if (err.response.status === 401) {
              toast.error("Unauthorized");
              return;
          } else if (err.response.status === 404) {
              toast.error("Not Found");
              return;
          } if (err.response.status === 403) {
              toast.error("Forbidden");
              return;
          } else {
              toast.error("Some Thing Goes Wrong Try Again ");
              console.log(err);
          }
      }
    },
  });

  return (
    <>
      <Navbar />
      <Box
        component="main"
        md={{ Width: "100%" }}
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                {" "}
                Add User Information{" "}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {" "}
                {/* Use your email to create a new account{" "} */}
              </Typography>
            </Box>

            <Grid container spacing={1}>
              {/* <Grid item xs={12} md={4}>
               
                <TextField
                  error={Boolean(
                    formik.touched.hotelId && formik.errors.hotelId
                  )}
                  fullWidth
                  helperText={formik.touched.hotelId && formik.errors.hotelId}
                  label="Hotel Id"
                  margin="normal"
                  name="hotelId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.hotelId}
                  variant="outlined"
                />
              </Grid> */}

              <Grid item xs={12} md={4}>
                {/* Hotel Name*/}
                <TextField
                  error={Boolean(formik.touched.u_Name && formik.errors.u_Name)}
                  fullWidth
                  helperText={formik.touched.u_Name && formik.errors.u_Name}
                  label="User Name"
                  margin="normal"
                  name="u_Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.u_Name}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Location*/}
                <TextField
                  error={Boolean(
                    formik.touched.address && formik.errors.address
                  )}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="address"
                  margin="normal"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Location*/}
                <TextField
                  error={Boolean(
                    formik.touched.hotelId && formik.errors.hotelId
                  )}
                  fullWidth
                  helperText={formik.touched.hotelId && formik.errors.hotelId}
                  label="hotelId"
                  margin="normal"
                  name="hotelId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.hotelId}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Location*/}
                <TextField
                  error={Boolean(
                    formik.touched.roomsId && formik.errors.roomsId
                  )}
                  fullWidth
                  helperText={formik.touched.roomsId && formik.errors.roomsId}
                  label="roomsId"
                  margin="normal"
                  name="roomsId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.roomsId}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box sx={{ py: 2 }}>
              {/* Submit btn */}
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Generate
              </Button>
            </Box>
          </form>
        </Container>
      </Box>

      {/* for expanding length */}
      <Box
        component="main"
        md={{ Width: "100%", height: "50px" }}
        sx={{ height: "100px" }}
      ></Box>
    </>
  );
};

export default Adduser;