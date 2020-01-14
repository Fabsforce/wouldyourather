import React, { Component } from 'react'
import QuestionIntro from './QuestionIntro'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom'




class DashBoard extends Component {


    state = {
        unansweredTab: true,
        answeredTab: false,
      }
  

    handleQuestionsTab = (e) => {
        e.preventDefault()
        this.setState({ 
            unansweredTab: !this.state.unansweredTab,
            answeredTab: !this.state.answeredTab
          })
    }




    render() {
    
        return(
        <div className="container" style={{maxWidth:'760px', marginTop:'50px',}}>
            <div className="tabs is-toggle is-fullwidth">
                    <ul>
                        <li className={this.state.unansweredTab? 'is-active' : null}>
                        <a onClick={this.handleQuestionsTab} href="/#">
                            <span name="unanswered">Unanswered Questions</span>
                        </a>
                        </li>
                        <li className={this.state.answeredTab? 'is-active' : null}>
                        <a onClick={this.handleQuestionsTab} href="/#">
                            <span name="answered">Answered Questions</span>
                        </a>
                        </li>
                    </ul>
            </div>

            { this.props.authedUser && 
              this.props.questionIds.map( (id) => {
                    if (this.state.answeredTab) {
                        if ( Object.keys(this.props.user.answers).includes(id) ){
                                return  <QuestionIntro  id={id} key={id}  />
                        } 
                    } 
                    if (this.state.unansweredTab) {
                        if ( !Object.keys(this.props.user.answers).includes(id) ){
                                return  <QuestionIntro  id={id} key={id}  />
                        }
                    } 
                    return null
              }) 
            }
            {// In case every questions have been answered by the user
             (this.props.answeredAllQuestions === true)&&
                    <center><h3 className="subtitle is-4">Well done, you have answered every question!</h3></center>
            }
            { // In case no question have been answered by the user
             (this.props.noAnswered === true)&&
                    <center><h3 className="subtitle is-4">You don't have answered any question yet!</h3></center>
                           
            }

        </div> 
        )
    }
}



DashBoard.propTypes = {
    questionIds: PropTypes.array.isRequired,
    //authedUser: PropTypes.string.isRequired,
    answeredAllQuestions: PropTypes.bool.isRequired,
    noAnswered: PropTypes.bool.isRequired,

}



function mapStateToProps ({questions,users,authedUser}) {
    // All the question sorted
    const questionIds =   Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    // test if  user has answered every question
    const answeredAllQuestions = Object.values(users)
                                .some((user) =>  user.id ===authedUser && Object.values(user.answers).length===questionIds.length )                      
    // test if  user has any unAnswered question
    const noAnswered = Object.values(users)
                                .some((user) =>  user.id ===authedUser && Object.values(user.answers).length===0 )
    // Authed User
    const user = users[authedUser]


    return {
        questionIds: questionIds,
        authedUser,
        answeredAllQuestions,
        noAnswered,
        user,
    }

}


export default withRouter(connect(mapStateToProps)(DashBoard))