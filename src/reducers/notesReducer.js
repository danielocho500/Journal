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
                active:{ 
                    ...state.active,
                    ...action.payload
                }
            }
        case noteTypes.updateNote:
            return{
                ...state,
                notes: state.notes.map(note => {

                    return (note.id === action.payload.id
                    ?{
                        ...note,
                        title: action.payload.title,
                        body: action.payload.body,        
                    } 
                    : note)
                })
            }
        case noteTypes.updateImage:

            return{
                ...state,
                active:{
                    ...state.active,
                    url: action.payload.url
                },
                notes: state.notes.map(note => {
                    return (
                        (note.id === action.payload.idNote)
                        ? {
                            ...note,
                            url: action.payload.url
                        }
                        : note
                    )
                })
            }
        default:
            return state;
    }
}