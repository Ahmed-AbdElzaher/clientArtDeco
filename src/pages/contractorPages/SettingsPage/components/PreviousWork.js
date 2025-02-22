import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { axiosInstace } from "./../../../../network/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Grid } from "@mui/material";
import { Button } from "react-bootstrap";

const MySwal = withReactContent(Swal);

function PreviousWork(props) {
  const [formValues, setFormValues] = useState([]);

  const handleFormChange = event => {
    console.log("file2", event.target.files[2]);
    // setFormValues(
    //   event.target.files
    // );
    setFormValues(oldArray => [...oldArray, ...event.target.files]);
  };

  const handleSubmitForm = formValues => {
    console.log("formValues", formValues);
    const formData = new FormData();
    for(const value of formValues){
      formData.append("gallery", value);
      console.log(value);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    // if(formValues.photo){
    axiosInstace
      .patch("contractors/updateMe", formData, config)
      .then(res => {
        console.log(res.data.data.user);
        console.log("formData", formData);
        MySwal.fire(`Data changed Successfully`).then(result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch(err => {
        MySwal.fire(`Error , Try again`).then(result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        console.log(err);
      });
    // }
  };

  return (
    <div className='w-100'>
      <Box className='w-100' sx={{ display: "flex" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            className='imageSettings'
            component='img'
            // height='194'
            image='https://media.istockphoto.com/vectors/dentist-logo-vector-id1168571396?b=1&k=20&m=1168571396&s=612x612&w=0&h=I5Jm19L_NXbZHCbOYBLdMeyAwbR86XTT-L3GIVSdFVM='
            alt='profile image'
          />
          <CardActions disableSpacing>
            <input
              className='form-control file-Attach w-100'
              type='file'
              id='formFileMultiple'
              name='photo'
              multiple
              onChange={e => handleFormChange(e)}
            />
            <br />
          </CardActions>
          <Grid item xs={12} className='text-center p-2'>
            <Button
              onClick={() => handleSubmitForm(formValues)}
              className='site_btn'
            >
              <span className='button_text'>Update Data</span>
            </Button>
          </Grid>
        </Card>
      </Box>
    </div>
  );
}

export default PreviousWork;

// ----------------------------------------------------------------
