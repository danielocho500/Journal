import Swal from 'sweetalert2'


import { authTypes } from "../types/authTypes"
import {firebase, googleAuth} from "../firebase/firebase-config"
import { finishLoading, startLoading } from "./loadingLogin";

export const loginEmail = (email, password) => {
    return(dispatch => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user}) => {
                const {displayName, uid } = user;
            })
            .catch(e => {
                Swal.fire('Error',e.message,'error');
            }).then(() => {
                dispatch(finishLoading())
            })

    })
}

export const loginGoogle = () => {
    return(dispatch => {
        firebase.auth().signInWithPopup(googleAuth)
            .then(({user}) => {
                const {displayName, uid } = user;
                dispatch(login(uid, displayName));
            })
            .catch(e => {
                Swal.fire('Error',e.message,'error');
            })
    }) 
}

export const registerEmail = (email, password, name) => {
    return(dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async ({user}) => {
                await user.updateProfile({
                    displayName: name
                });

                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                Swal.fire('Error',e.message,'error');
            });
    })
}

export const login = (uid, displayName) => {
    return {
        type: authTypes.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return(async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout())
    })
}

const logout = () => ({
    type: authTypes.logout
})