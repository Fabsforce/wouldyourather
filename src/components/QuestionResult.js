import React, { Component, } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'




class QuestionResult extends Component {



  render() {

    const {user, question_id, question, numberVotes, author} = this.props
    const numberVotesOptionOne = question.optionOne.votes.length 
    const numberVotesOptionTwo = question.optionTwo.votes.length 
    const percentageVotesOptionOne = new Intl.NumberFormat('fr-FR', { style : 'decimal',  maximumFractionDigits:'0' }).format( numberVotesOptionOne/numberVotes*100 )
    const percentageVotesOptionTwo = new Intl.NumberFormat('fr-FR', { style : 'decimal',  maximumFractionDigits:'0' }).format(  numberVotesOptionTwo/numberVotes*100 )




    return (
     <div className="container" style={{maxWidth:'760px',marginTop:'50px',}}>
            <div className="card">
                <div className="card-header has-background-info" style={{padding:'10px'}}>
                    <h3 className="subtitle is-4 has-text-white">{author.name} asks :</h3>
                </div>
                <div className="card-content">
                    <div className="media" >
                        <div className="media-left" style={{width:'30%', marginRight:'50px', }}>
                            <figure className="image  is-center" style={{marginTop:'20%' }}>
                                    <img src={author.avatarURL} alt={author.name}/>
                            </figure>
                        </div>
                        <div className="media-content " style={{marginTop:'0%'}}>
                            <p className="title is-3">Results :</p>
                            <div className="columns" style={{marginTop:'3%'}}>
                                <div className="column  has-background-light">
                                { user.answers[question_id] === 'optionOne'&&
                                    <span className="tag is-danger is-medium" style={{marginLeft:'10px',float:'right'}}>Your Vote</span>
                                }
                                <div className="title is-6">Would you rather {question.optionOne.text}? </div>
                                <div className="progress-wrapper">
                                    <progress className="progress is-warning is-large" value={percentageVotesOptionOne} max="100">{percentageVotesOptionOne}%</progress>
                                    <p className="progress-value has-text-black">{percentageVotesOptionOne}%</p>
                                    <p>{numberVotesOptionOne} of {numberVotes} votes</p>
                                </div>
                                </div>
                            </div>
                            <div className="columns" style={{marginTop:'3%'}}>
                                <div className="column  has-background-light">
                                { user.answers[question_id] === 'optionTwo'&&
                                    <span className="tag is-danger is-medium" style={{marginLeft:'10px', float:'right'}}>Your Vote</span>
                                }
                                    <div className="title is-6">Would you rather {question.optionTwo.text}?</div>
                                <div className="progress-wrapper">
                                    <progress className="progress is-warning is-large" value={percentageVotesOptionTwo} max="100">{percentageVotesOptionTwo}%</progress>
                                    <p className="progress-value has-text-black">{percentageVotesOptionTwo}%</p>
                                    <p>{numberVotesOptionTwo} of {numberVotes} votes</p>
                                </div>
                                </div>
                            </div>
                    </div>
                    </div>

                </div>
            </div>
        </div> 

    )
  }
}


QuestionResult.propTypes = {
    user: PropTypes.object.isRequired,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    question_id: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    numberVotes: PropTypes.number.isRequired,
}



function mapStateToProps ({questions, users, authedUser}, {question_id}) {
    const question = questions[question_id]
    const numberVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const user = users[authedUser]
    const author = users[question.author]
    return {
        user,
        author,
        question_id,
        question,
        numberVotes,
    }
  }

export default connect(mapStateToProps)(QuestionResult)