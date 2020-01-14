import { LOADING_SPINNER, UNLOADING_SPINNER} from '../actions/spinner'



export default function spinner(state = {}, action) {

    switch(action.type) {
        case LOADING_SPINNER :
            return true
        case UNLOADING_SPINNER :
            return false
        default :
            return state
    }

}