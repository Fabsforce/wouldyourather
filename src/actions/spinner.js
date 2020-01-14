
export const LOADING_SPINNER = 'LOADING_SPINNER'
export const UNLOADING_SPINNER = 'UNLOADING_SPINNER'

export function loadingSpinner(spinner){
    return {
        type: LOADING_SPINNER,
        spinner,
    }
}


export function unloadingSpinner(spinner){
    return {
        type: UNLOADING_SPINNER,
        spinner,
    }
}