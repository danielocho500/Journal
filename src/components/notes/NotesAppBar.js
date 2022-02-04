import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector( state => state.notes );

    const date = moment(active.date).format("DD/MM/YYYY");

    const handleSave = (e) => {
        e.preventDefault();

        dispatch(startUpdateNote(active));
    }

    const handlePictureClick = (e) => {
        e.preventDefault();

        document.querySelector('#fileSelector').click();
    }

    const handleUploadFile = (e) => {

        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>{date}</span>

            <div>
                <input
                    type='file'
                    style={{display: 'none'}}
                    name='file'
                    id='fileSelector'
                    onChange={handleUploadFile}
                    accept="image/png, image/gif, image/jpeg, image/jpg" 
                />

                <button 
                    className="btn"
                    onClick={handlePictureClick}    
                >
                    Picture
                </button>

                <button className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
