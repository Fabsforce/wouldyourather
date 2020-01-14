import React, { Component,} from 'react'
import { connect } from 'react-redux'
import {handleNewQuestion} from '../actions/shared'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'


class NewQuestion extends Component {


    state = {
        optionOne: '', 
        optionTwo: '',
        enableSubmitButton: false,
        redirect: false,
    }



    handleChange = (e) => {
        const text = e.target.value
        this.setState({
            [e.target.name] : text
        })
        if ( (text.length>0 & this.state.optionOne.length > 0) || (text.length>0 & this.state.optionTwo.length > 0)) {
            this.setState({ enableSubmitButton : true })
        } else {
            this.setState({ enableSubmitButton : false })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { authedUser, dispatch } = this.props
        dispatch(handleNewQuestion( optionOne, optionTwo, authedUser ))
        this.setState({ redirect : true })
    }




    render() {


        if (this.state.redirect) {
            return <Redirect to="/" />
        }


        return(
        <div className="container" style={{maxWidth:'760px', marginTop:'50px',}}>
            <div className="card">
                <div className="card-header has-background-info" style={{padding:'10px'}}>
                    <h3 className="subtitle is-4 has-text-white">Create New Question :</h3>
                </div>
                <div className="card-content">
                    <div className="content" >                        
                        <div className="content " style={{marginTop:'0%'}}>
                            <h6 className="subtitle is-6">Complete the question:</h6>
                            <form onSubmit={this.handleSubmit}>
                                <p className="title is-3" style={{marginBottom:'20px'}}>Would you rather...</p>
                                <div style={{paddingBottom:'10px'}}>
                                    <input className="input is-info"  onChange={this.handleChange} type="text" name="optionOne"  placeholder="Enter option one here" />
                                </div>
                                <p className="title is-4" style={{marginBottom:'20px',textAlign:'center'}}>OR</p>
                                <div style={{paddingBottom:'10px'}}>
                                    <input className="input is-info"   onChange={this.handleChange}  type="text" name="optionTwo" placeholder="Enter option two here"  />
                                </div>
                                
                                <button className="button is-medium is-fullwidth is-info is-outlined" disabled={ !this.state.enableSubmitButton } style={{marginTop:'20px'}}> Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div> 
        )
    }
}



NewQuestion.propTypes = {
    authedUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}



function mapStateToProps ({authedUser}) {
    return {
        authedUser,
    }
  }



export default connect(mapStateToProps)(NewQuestion)