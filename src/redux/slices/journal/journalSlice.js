import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../firebase/config";
import { loadNotes } from "../../../helpers/loadNotes";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    // del action estoy sacando directamente el payload
    addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSaved = '';
    },
    setNotes: (state, action) => {
        state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `La nota titulada "${action.payload.title}" se actualizó correctamente`;
    },
    deleteNoteById: (state, action) => {},
    savingNewNote: (state, action) => {
        state.isSaving = true;
    }
  },
});

// thunks - ini

export const startNewNote = () => {
  return async (dispatch, getState) => {
    
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    // la nueva nota
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    // crear un documento (el cual contiene diversas colecciones)
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id; // crea ID de nota

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        //console.log(uid);
        if(!uid) throw new Error('El uid es requerido');
        
        const notes = await loadNotes(uid);
        //console.log(notes)
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const {active: note} = getState().journal;

    const noteToFirestore = {...note};
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, {merge: true});

    dispatch(updateNote(note));
  }
}

// thunks - fin

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
} = journalSlice.actions;
