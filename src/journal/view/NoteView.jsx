import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { ImageGallery } from "../components/ImageGallery";

export const NoteView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          29/07/2022
        </Typography>
      </Grid>
      <Grid item>
        <Button>
          <SaveOutlined sx={{ fontSize: "30", mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingresa tu nota"
          multiline
          minRows={10}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
