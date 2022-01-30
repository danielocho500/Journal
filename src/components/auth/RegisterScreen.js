import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { registerEmail } from '../../actions/auth';

import { removeError, setError } from '../../actions/errorForm';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {errorForm, msg} = useSelector(state => state.errorForm);

    const [values, handleInputChange] = useForm({
        name: 'daili',
        email: 'correo@correo.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = values

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = isFormValid();

        if (isValid.success){
            dispatch(removeError());
            dispatch(registerEmail(email,password,name));
        }
        else{
            dispatch(setError(isValid.msg))
        }
    }

    const isFormValid = () => {

        if (!validator.isEmail(email))
            return {
                msg: 'Invalid Email',
                success: false
            }
        if (name.trim() === '')
            return {
                msg: 'Please, put a name',
                success: false
            }
        if (password.trim() === '')
            return {
                msg: 'Please, put a password',
                success: false
            }
        if (password2.trim() === '')
            return {
                msg: 'Please, confirm the password',
                success: false
            }
        if (password != password2)
            return {
                msg: 'The passwords are not the same',
                success: false
            } 

        return {
            msg: 'valid',
            success: true
        };
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleSubmit}>

                {
                    errorForm && 
                    <div className='auth__alert-error'> 
                        {msg}
                    </div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
