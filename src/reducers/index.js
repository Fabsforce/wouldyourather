import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './questions'
import  spinner  from './spinner'
//import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers ({
    authedUser,
    users,
    questions,
    spinner,
    //loadingBar: loadingBarReducer
})