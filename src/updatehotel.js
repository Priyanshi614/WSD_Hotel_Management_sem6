import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import {
  GetOneHotelApiCall,
  UpdateHotelApiCall,
} from "./services/hotelApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormHelperText,
  Link,
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderTop: "10px solid #000",
  boxShadow: 24,
  p: 4,
};

function Updatehotel(props) {
  let { hotelId } = useParams();
  const navigate = useNavigate();

  console.log(hotelId)
  const [hotels, sethotels] = useState();

  useEffect(() => {
    GetOneHotelApiCall(hotelId)
      .then(async (result) => {
        await sethotels(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validationSchema = Yup.object({
    hotelId: Yup.string().max(255).required("Hotel Id is required"),
    //noOfLeaveInThisMonth: Yup.string().max(255).required("reasone is required"),
    h_Name: Yup.string().required("Hotel Name Is required"),
   location: Yup.string().required("Location is required"),
    //cashInAdvance: Yup.string().max(255).required("reasone is required"),
   
  });

  return (
    <>
      <Navbar />
      <Modal
        open={1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="popup-model">
          <div>{!hotels && "Loding..."}</div>

          {hotels && (
            <>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" className="Header">
                  {" "}
                  hotelId : {hotels.hotelId}{" "}
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {" "}
                  Edit Details{" "}
                </Typography>
              </Box>
              <Formik
                initialValues={
                  hotels && {
                    hotelId: hotels.hotelId,
                    h_Name: hotels.h_Name,
                    location: hotels.location,
                  }
                }
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  console.log("data");
                  console.log(values);

                  values = {
                    hotelId: values.hotelId,
                    h_Name: values.h_Name,
                    location: values.location,
                  };

                  try {
                    const res = await UpdateHotelApiCall(hotelId, values);

                    if (res.status === 204) {
                      toast.success("sucssesfully updated");
                      console.log(res.data);
                      //   navigate("/payroll/viewAllPayroll");
                    }
                  } catch (err) {
                    console.log(err.res.status);
                    toast.error(err.message);
                    console.log(err.message);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                }) => (
                  <div>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          {/* Employee Id*/}
                          <TextField
                            error={Boolean(touched.hotelId && errors.hotelId)}
                            fullWidth
                            helperText={touched.hotelId && errors.hotelId}
                            label="Hotel Id"
                            margin="normal"
                            name="hotelId"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hotelId}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* no Of Leave In This Month*/}
                          <TextField
                            error={Boolean(touched.h_Name && errors.h_Name)}
                            fullWidth
                            helperText={touched.h_Name && errors.h_Name}
                            label="Hotel Name"
                            margin="normal"
                            name="h_Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.h_Name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* Monthly Salary*/}
                          <TextField
                            error={Boolean(touched.location && errors.location)}
                            fullWidth
                            helperText={touched.location && errors.location}
                            label="Location"
                            margin="normal"
                            name="location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Box sx={{ py: 2, marginRight: "5px" }}>
                            {/* Submit btn */}
                            <Button
                              color="primary"
                              disabled={isSubmitting}
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{ marginRight: "5px" }}
                              onClick={() => {
                                navigate("../view_delete_hotel");
                              }}
                            >
                              Save
                            </Button>

                            <Button
                              onClick={() => {
                                navigate("../view_delete_hotel");
                              }}
                              size="large"
                              variant="contained"
                              color="error"
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  </div>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Updatehotel;