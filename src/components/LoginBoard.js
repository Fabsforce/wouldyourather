import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  withRouter, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { loadingSpinner, unloadingSpinner } from '../actions/spinner'
import PropTypes from 'prop-types'

class LoginBoard extends Component {


    

    handleChange = (e) => {
        e.preventDefault()
        const selectUser = e.target.value
        if (selectUser !== 'none'){
            this.props.dispatch(loadingSpinner(true))
            this.props.dispatch(setAuthedUser(selectUser))
            this.props.dispatch(unloadingSpinner(false))
        }

    }


    render() {
        const {authedUser} = this.props
        const noLoggedUser = Object.entries(authedUser).length===0

        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (!noLoggedUser) { // there's a logged user
            if (this.props.location.state.from.pathname.includes('questions')){ // we redirect to questions/... only if a detail question was last screen before logout
                return <Redirect to={from} />
            } else {
                return <Redirect to="/" />
            }
        }

        return(
            <div className="container" style={{maxWidth:'760px', marginTop:'50px',marginBottom:'150px', textAlign:'center'}}>
                <article className="panel is-danger">
                    <p className="panel-heading">
                        Welcome to the Would Rather App!
                    </p>
                    <div className="panel-block" >
                    <p className="subtitle is-6 has-text-grey" style={{marginLeft:'auto', marginRight:'auto',width:'100%' }}>Please sign in to continue:</p>
                    </div>
                    <div className="panel-block">
                        <figure className="image  is-center" style={{marginLeft:'auto', marginRight:'auto',width:'30%' }}>
                            <img src='../images/user-block-svgrepo-com.svg' alt={authedUser}/>
                        </figure>
                    </div>
                    <div className="panel-block">
                            <div className="select is-rounded is-fullwidth">
                                <select onChange={this.handleChange} value={ noLoggedUser? 'none' : authedUser} >
                                    <option value="none" >Select User</option>
                                    <option value="johndoe">John Doe</option>
                                    <option value="sarahedo">Sarah Edo</option>
                                    <option value="tylermcginnis">Tyler McGinnis</option>
                                </select>
                            </div>
                    </div>
            </article>
          </div>
        )
    }
}



LoginBoard.propTypes = {
    authedUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }

function mapStateToProps ({authedUser}){
    return {
        authedUser,
    }
  }

export default withRouter(connect(mapStateToProps)(LoginBoard))