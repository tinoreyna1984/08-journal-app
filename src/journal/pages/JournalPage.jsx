import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import React from "react";
import { NothingSelectedView } from "../view/NothingSelectedView";
import { NoteView } from "../view/NoteView";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../redux/slices/journal/journalSlice";

export const JournalPage = () => {
  const state = useSelector((state) => state.journal);
  const { isSaving, active } = state;

  /* console.log(state);
  console.log(!!active); */
  //console.log(notes)

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {/* Si la nota está activa, muestra la nota. */}
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          "&:hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
