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
import { CreateRoomApiCall } from './services/roomApi';
 import { useSelector } from 'react-redux';



const Addroom = () => {
  const navigate = useNavigate();

//   const user = useSelector(state => state.user);
//   console.log(user.user.eId);

  // form controller
  const formik = useFormik({
    // intial values
    initialValues: {
      // hotelId: "",
      hotelId: "",
      
      
    },

    // To check enter value is vaild or not
    validationSchema: Yup.object({
      // hotelId: Yup.string().max(255).required("Hotel Id is required"),
    //   noOfLeaveInThisMonth: Yup.string().max(255).required("reasone is required"),
      hotelId: Yup.string().required("hotel Id Is required"),
      // Location: Yup.string().max(255).required("Location is required"),
    //   cashInAdvance: Yup.string().max(255).required("reasone is required"),
    
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      // set object to pass request of Backend url
      // console.log(user.eId);
      const requestBody = {
        // hotelId: values.hotelId,
        hotelId: values.hotelId,
        // location: values.Location,
       
      };

      console.log(requestBody);

      try {
          // call to backend url
          const response = await CreateRoomApiCall(requestBody);

          //  status of respose
          if (response.status === 201) {
             
                  toast.success("Room added Successfully");
                  console.log(response.data.userId);
                  navigate('../view_delete_room');
              
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
                Add Room{" "}
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

export default Addroom;