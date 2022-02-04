import { noteTypes } from "../types/notesTypes";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {

    

    switch (action.type) {
        case noteTypes.addNew:

            const notes_aux = state.notes;
            notes_aux[notes_aux.length] = action.payload

            return{
                ...state,
                active: {
                    ...action.payload
                },
                notes: notes_aux
            }
        case noteTypes.loadNote:
            return {
                ...state,
                notes: [...action.payload]
            }
        case noteTypes.setActive:
            return{
                ...state,
                active: action.payload
            }
        default:
            return state;
    }
}