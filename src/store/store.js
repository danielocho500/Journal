import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'

import { authReducer } from '../reducers/authReducer';
import { loadingLoginReducer } from '../reducers/loadingLoginReducer';
import { uiErrorFormReducer } from '../reducers/uiErrorFormReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    errorForm: uiErrorFormReducer,
    loading: loadingLoginReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )   
);
