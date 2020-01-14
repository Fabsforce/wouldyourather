import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/authedUser'



export default function authedUser(state = {}, action) {
    switch(action.type) {
        case SET_AUTHED_USER :
            return action.id
        case LOGOUT_USER :
            return {}
        default :
            return state
    }
}

