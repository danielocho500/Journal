import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { uploadFile } from "../helpers/uploadFile";
import { noteTypes } from "../types/notesTypes";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        
        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);
        
        dispatch(activeNote(doc.id,newNote));
    }
}

export const startUpdateNote = (note) => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        if(!note.url)
            delete note.url;

        const noteToUpdate = {
            body: note.body,
            title: note.title
        }

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToUpdate);
        Swal.fire('Saved','The Note has been Updated','success');

        dispatch(updateNote(note.id, noteToUpdate))
    }
}

export const updateNote = (id, note) => ({
    type: noteTypes.updateNote,
    payload: {
        id,
        ...note
    }
})

export const activeNote = (id, note) => ({
    type: noteTypes.addNew,
    payload: {
        id,
        ...note
    }
})

export const startLodingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: noteTypes.loadNote,
    payload: notes
})

export const setNote = (note) => ({
    type: noteTypes.setActive,
    payload: note
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const {active: activeNote} = getState().notes
        const {uid} = getState().auth;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await uploadFile(file);

        dispatch(updateImage(activeNote.id,fileUrl.url));

        Swal.close();

        await db.doc(`${uid}/journal/notes/${activeNote.id}`).update({url: fileUrl.url});

    }
}

export const updateImage = (idNote, url) => ({
    type: noteTypes.updateImage,
    payload: {
        idNote,
        url
    }
})

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: noteTypes.deleteNote,
    payload: id
})

export const notesClean = () => ({
    type: noteTypes.logoutCleaning
}) 