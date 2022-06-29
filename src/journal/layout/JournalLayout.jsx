import React from "react";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/Sidebar";

const drawerWidth = 250;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
