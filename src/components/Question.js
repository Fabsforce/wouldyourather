import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import { handleSubmittingVote } from '../actions/shared'
import PropTypes from 'prop-types'
import {  Redirect, } from 'react-router-dom'


class Question extends Component {

    state = {
        answer: 'optionOne', // default
    }


    //componentDidMount() {
        //console.log(this.props.location.pathname)
    //}


    handleChange = (e) => {
        //e.preventDefault() // to control the click on the label near the radio input
        const optionChosen = e.target.value
        this.setState(() => ({
            answer : optionChosen
        })
        )
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, authedUser, question_id} = this.props
        dispatch(handleSubmittingVote(authedUser, question_id, this.state.answer ))
    }




    render() {

        if (!this.props.question){
            //return (<p>This page does not exist</p>)
            return <Redirect  to='/Notfound'  />
        }

        const {question, question_id, users, authedUser} = this.props
        const author = users[question.author]
        const {name, avatarURL} = author
        const user = users[authedUser]


        return(


            <Fragment>

               { !Object.keys(user.answers).includes(question_id) ?
                    <div className="container" style={{maxWidth:'760px', marginTop:'50px',}}>
                        <div className="card">
                            <div className="card-header has-background-info" style={{padding:'10px'}}>
                            <h3 className="subtitle is-4 has-text-white">{ name } asks :</h3>
                            </div>
                            <div className="card-content">
                                <div className="media" >
                                    <div className="media-left" style={{width:'30%', marginRight:'50px', }}>
                                        <figure className="image  is-center" style={{marginTop:'0%' }}>
                                                <img src={avatarURL} alt={user.name}/>
                                        </figure>
                                    </div>
                                    <div className="media-content " style={{marginTop:'0%', height:'200px'}}>
                                        <p className="title is-3">Would you rather?</p>
                                        <form onSubmit={this.handleSubmit} > 
                                            <div style={{paddingTop:'10px',paddingBottom:'10px'}} >
                                                <label >
                                                    <input type="radio" name="optionOne" value="optionOne"
                                                        checked={this.state.answer === 'optionOne'}
                                                        onChange={this.handleChange}
                                                        style={{marginRight:'15px'}}
                                                    />
                                                        {question.optionOne.text}
                                                </label>
                                            </div>
                                            <div style={{paddingTop:'10px',paddingBottom:'10px'}} >
                                                <label>
                                                    <input type="radio" name="optionTwo" value="optionTwo" 
                                                            checked={this.state.answer === 'optionTwo'}
                                                            onChange={this.handleChange} 
                                                            style={{marginRight:'15px'}}
                                                    />
                                                    {question.optionTwo.text}
                                                </label>
                                            </div>
                                            <button className="button is-medium is-fullwidth is-info is-outlined" style={{marginTop:'20px'}}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                :
                 <QuestionResult question_id={question_id}/>
               }
            </Fragment>
        )
    }
}


Question.propTypes = {
    users: PropTypes.object.isRequired,
    /*authedUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    question_id: PropTypes.string,
    question: PropTypes.object,*/
}


function mapStateToProps ({questions, users, authedUser}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id]
    return {
        authedUser,
        question_id,
        question,
        users,
    }
  }

export default connect(mapStateToProps)(Question)
