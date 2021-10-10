import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNote = () => {
  // el segundo argumento sirve para obtener el estado de la aplicacion
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const doc = await addDoc(
      collection(db, `${uid}`, 'journal/notes'),
      newNote
    );

    dispatch(activeNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    // Si no viene el url lo borramos para no grabar datos que no hay
    if (!note.url) {
      delete note.url;
    }

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(db, `${uid}/journal/notes/${note.id}`);
    await updateDoc(docRef, noteToFireStore);

    dispatch(refreshNote(note.id, noteToFireStore));
    Swal.fire('Save', 'Se grabó su nota', 'success');
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const docRef = doc(db, `${uid}/journal/note/${id}`);

    await deleteDoc(docRef);

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});
