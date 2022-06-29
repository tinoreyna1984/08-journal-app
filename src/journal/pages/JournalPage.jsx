import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from '../layout/JournalLayout'
import React from 'react'
import { NothingSelectedView } from "../view/NothingSelectedView";
import { NoteView } from "../view/NoteView";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          '&:hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}
