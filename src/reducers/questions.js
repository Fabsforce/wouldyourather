import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'



export default function questions(state = {}, action) {

    switch(action.type) {

        case RECEIVE_QUESTIONS :
            return {    
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION :
            return {
                ...state, // we copy the state -> state is coming from above, this is the state of questions (not the whole store state!!)
                [action.qid]: {   // the question that we want to update
                    ...state[action.qid], // state with 
                    [action.answer]: {  // optionOne or optionTwo that we need to update
                        ...state[action.qid][action.answer], // the state of the answer that we invoke from a nested object from level above
                        votes: state[action.qid][action.answer].votes.concat([action.user]) // the updated answer
                      }
                }
            }
        case ADD_QUESTION :
            console.log("action.question.id"+[action.question.id])
            return {
                ...state,
                [action.question.id]: action.question,
            }
        default :
            return state
    }

}