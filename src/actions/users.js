

export const RECEIVE_USERS ='RECEIVE_USERS'
export const USER_ANSWER_QUESTION ='USER_ANSWER_QUESTION'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}


export function userAnswerQuestion(user,qid,answer) {
    return {
        type: USER_ANSWER_QUESTION,
        user,
        qid,
        answer
    }
}


export function addUserQuestion(questionID, author ){
    return {
        type: ADD_USER_QUESTION,
        questionID,
        author,
    }
}
