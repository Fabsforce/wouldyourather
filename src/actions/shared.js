import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, userAnswerQuestion, addUserQuestion } from '../actions/users'
import { receiveQuestions, answerQuestion, addQuestion } from '../actions/questions'
import { loadingSpinner, unloadingSpinner } from '../actions/spinner'


// Initial data of the App
export function handleInitialData(selectUser) {
    return (dispatch) => {
        dispatch(loadingSpinner(true))
        return getInitialData()
            .then(({users, questions}) => {
                 dispatch(receiveUsers(users))
                 dispatch(receiveQuestions(questions))
                 dispatch(unloadingSpinner(false))
            })                 
    }
}


/** Voting for a question : this is a shared actions because we need to update
 *  both the slice state of question and the slice state of user */ 
export function handleSubmittingVote(user,qid,answer) {
    
    return (dispatch) => {
        dispatch(loadingSpinner(true))
        return saveQuestionAnswer({  
                        authedUser: user, 
                        qid,  
                        answer })
            .then(() => { 
                    dispatch(answerQuestion(user,qid,answer))
                    dispatch(userAnswerQuestion(user,qid,answer))
                    dispatch(unloadingSpinner(false))
            })
            .catch((e) => { // error 
                console.warn('Error in handleSubmittingVote :', e)
                dispatch(answerQuestion(user,qid,answer)) // reset to what it was initially
                alert('There was an error saving your result. Try again.')
            })

    }

}


/** Add new question to app : this is a shared actions because we need to update
 *  both the slice state of question and the slice state of user */
export function handleNewQuestion(optionOneText,optionTwoText,author) {
    
    return (dispatch) => {
            dispatch(loadingSpinner(true))
            return saveQuestion({optionOneText, optionTwoText, author})
                .then((newQuestion) => {  // now newQuestion has been created thanks to saveQuestion api call
                        dispatch(addQuestion(newQuestion))
                        dispatch(addUserQuestion(newQuestion.id, newQuestion.author)) // we now have the id and author of the question
                        dispatch(unloadingSpinner(false))
                }) 
                .catch((e) => { // error 
                    console.warn('Error in handleNewQuestion :', e)
                    alert('There was an error saving your result. Try again.')
                })
            
            
    }

}
