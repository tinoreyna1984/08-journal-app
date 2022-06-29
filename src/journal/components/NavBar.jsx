import React from "react";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../redux/slices/auth/authSlices";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {" "}
            JournalApp{" "}
          </Typography>
          <IconButton onClick={onLogout}>
            <LogoutOutlined htmlColor="white" />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
