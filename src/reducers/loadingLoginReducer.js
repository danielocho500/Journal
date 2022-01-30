import { loadingLoginTypes } from "../types/loadingLoginTypes";

const initialState = {
    loading: false
}

export const loadingLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadingLoginTypes.finishLoading:
            return{
                loading: false
            }
        case loadingLoginTypes.startLoading:
            return{
                loading: true
            }
        default:
            return {
                ...state
            }
    }
};
