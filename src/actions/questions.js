


export const RECEIVE_QUESTIONS ='RECEIVE_QUESTIONS'
export const ANSWER_QUESTION ='ANSWER_QUESTION'
export const ADD_QUESTION ='ADD_QUESTION'


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}



export function answerQuestion(user,qid,answer) {
    return {
        type: ANSWER_QUESTION,
        user,
        qid,
        answer
    }
}



export function addQuestion(question ){
    return {
        type: ADD_QUESTION,
        question,
    }
}



