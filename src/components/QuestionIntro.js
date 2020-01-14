import React, { Component} from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter  } from 'react-router-dom'
import PropTypes from 'prop-types'




class QuestionIntro extends Component {


    toQuestion = (e, question_id) => {
        e.preventDefault()
        //this.props.history.push(`/questions/${question_id}`)
        //console.log(this.props.location.state)
    }



    render() {
        const {question} = this.props
        const{user} = this.props

        if (question === null){
            return <p>This Question doesn't exist</p>
        }
        const {  id,  optionOne, } = question
        const {  name, avatarURL} = user

        return(
                <div className="container" style={{maxWidth:'100%', marginTop:'50px',}}>
                    <div className="card">
                        <div className="card-header has-background-info" style={{padding:'10px'}}>
                            <h3 className="subtitle is-4 has-text-white">{name}  asks :</h3>
                        </div>
                        <div className="card-content">
                            <div className="media" >
                                <div className="media-left" style={{width:'30%', marginRight:'50px', }}>
                                    <figure className="image  is-center" style={{marginTop:'0%' }}>
                                           <img src={avatarURL} alt={user.name}/>
                                    </figure>
                                </div>                  
                                <div className="media-content " style={{marginTop:'0%', height:'200px'}}>
                                    <p className="title is-3">Would you rather...</p>
                                    <p className="is-medium" style={{marginBottom:'25px',marginTop:'25px'}}>---{optionOne.text }---</p>
                                    <NavLink to={`/questions/${id}`} exact  className="navbar-item" activeClassName='active'>
                                        <button className="button is-medium is-fullwidth is-info is-outlined" 
                                                 style={{marginBottom:'0px'}}
                                                 /*onClick={(e) => this.toQuestion(e, id)}*/
                                                 >View Poll</button>
                                    </NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> 
        )
    }
}



QuestionIntro.propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

function mapStateToProps ({questions, users}, { id }) {
    const question = questions[id]
    const user = users[question.author]

    return {
        question,
        user,
    }
  }


export default withRouter(connect(mapStateToProps)(QuestionIntro))