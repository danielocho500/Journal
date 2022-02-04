import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector( state => state.notes );

    const {id, date, url} = note;

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
        dispatch(setNote({
            body,
            title,
            id,
            date
        }));
    },[values, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

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
                    (url)
                    &&
                    <div className="notes__image">
                        <img 
                            src={url}
                            alt="imagen"
                        />
                    </div>
                }


            </div>

            <button
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete    
            </button>   

        </div>
    )
}
