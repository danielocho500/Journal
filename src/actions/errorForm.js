import { errorFormTypes } from "../types/errorFormTypes";

export const setError = (msg) => ({
    type: errorFormTypes.errorFormSet,
    payload: msg
})

export const removeError = () => ({
    type: errorFormTypes.errorFormRemove
})