import { errorFormTypes } from "../types/errorFormTypes";

const initialState = {
    errorForm: false,
    msg: null
}

export const uiErrorFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case errorFormTypes.errorFormSet:
            return{
                ...state,
                errorForm: true,
                msg: action.payload
            }
        case errorFormTypes.errorFormRemove:
            return{
                ...state,
                errorForm: false,
                msg: null
            }
        default:
            return {
                ...state
            }
    }
};
