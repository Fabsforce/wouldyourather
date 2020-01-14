import { RECEIVE_USERS, USER_ANSWER_QUESTION, ADD_USER_QUESTION } from '../actions/users'



export default function users(state = {}, action) {

    switch(action.type) {
        case RECEIVE_USERS :
            return {    
                ...state,
                ...action.users
            }
        case USER_ANSWER_QUESTION :
            //console.log(state[action.user])
            return {
                ...state, // we copy the state -> state is coming from above, this is the state of questions (not the whole store state!!)
                // the user that we want to update
                [action.user]: { 
                    ...state[action.user], // user's state
                    answers: {
                        ...state[action.user].answers,
                        [action.qid] : action.answer
                }
              }
            }
        case ADD_USER_QUESTION :
            return {
                ...state,
                [action.author]:{
                    ...state[action.author],
                    questions : state[action.author].questions.concat([action.questionID])  
                }
            }
        default :
            return state
    }

}