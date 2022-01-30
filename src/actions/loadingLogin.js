import { loadingLoginTypes } from "../types/loadingLoginTypes";

export const startLoading = () => ({
    type: loadingLoginTypes.startLoading
})

export const finishLoading = () => ({
    type: loadingLoginTypes.finishLoading
})