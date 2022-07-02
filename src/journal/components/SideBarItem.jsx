import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../redux/slices/journal/journalSlice";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 20 ? `${title.substring(0, 20)}...` : title;
    }, [title]);

    const onClick = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle || 'Sin título'} />
          <ListItemText secondary={body || 'No se ha escrito nada aún.'} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
