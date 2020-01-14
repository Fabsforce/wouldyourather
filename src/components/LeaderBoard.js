import React, { Component, } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';




class LeaderBoard extends Component {
  

    render() {

        const {sortedLeaders}  = this.props

        return (

            sortedLeaders.map(user => (

                    <div className="container" style={{maxWidth:'760px',marginTop:'50px',}} key={user.id}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="columns">
                                        <div className="column is-one-quarter">
                                            <figure className="image  is-center" >
                                                    <img src={user.avatarURL}  alt={user.name}/>
                                            </figure>
                                        </div>
                                        <div className="column">
                                        <p className="title is-3" >{user.name}</p>
                                            <nav className="level">
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                    <p className="heading">Answered Questions</p>
                                                    <p className="title">{Object.keys(user.answers).length}</p>
                                                    </div>
                                                </div>
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                    <p className="heading">Created Questions</p>
                                                    <p className="title">{user.questions.length}</p>
                                                    </div>
                                                </div>
                                            </nav>
                                        </div>
                                        <div className="column  is-one-quarter">
                                            <div className="notification is-info" style={{height:'100%',textAlign:'center',padding:'0px',paddingTop:'22%'}}>
                                            <p className="subtitle is-4">Score</p>
                                            <p className="title is-1">{Object.keys(user.answers).length + user.questions.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
            )
          )
        )
    }
}



LeaderBoard.propTypes = {
    sortedLeaders: PropTypes.array.isRequired
}


function mapStateToProps ({users}) {

    const sortedLeaders = Object.values(users).sort(function (a, b) {
        const totalPointsA = Object.keys(a.answers).length + a.questions.length
        const totalPointsB = Object.keys(b.answers).length + b.questions.length
        return totalPointsB - totalPointsA;
      });   

    return {
        sortedLeaders
    }
}


export default connect(mapStateToProps)(LeaderBoard)