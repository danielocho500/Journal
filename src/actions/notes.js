import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
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

