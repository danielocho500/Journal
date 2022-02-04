import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

// body, date, id, title, url = note;
export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector( state => state.notes );
    

    const [values, handleInputChange, reset] = useForm({
        body: note.body,
        title: note.title
    });

    const {body,title} = values;

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id
        }

    }, [note,reset])

    useEffect(() => {
        dispatch(setNote(values));
    },[values, dispatch]);

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                    name='title'
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    name='body'
                ></textarea>

                {
                    (note.url)
                    &&
                    <div className="notes__image">
                        <img 
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                            alt="imagen"
                        />
                    </div>
                }


            </div>

        </div>
    )
}
