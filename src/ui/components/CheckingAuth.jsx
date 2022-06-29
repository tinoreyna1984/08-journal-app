import { SpinnerRoundOutlined } from 'spinners-react'
import React from 'react'
import { Grid } from '@mui/material'

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        sx={{ width: {sm: 450}, }}
      >
        <SpinnerRoundOutlined color='white' size="75%" />
      </Grid>
    </Grid>
  )
}
