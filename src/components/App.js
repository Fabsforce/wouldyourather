import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, withRouter, Switch, } from 'react-router-dom'
import Question from './Question'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import LoginBoard from './LoginBoard'
import NotFound from './NotFound'
import Nav from './Nav'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Loader from 'react-loader-spinner'
import PrivateRoute from './PrivateRoute'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import PropTypes from 'prop-types'

const NavWithRouter = withRouter(Nav);





class App extends Component {


  componentDidMount() {
    this.props.dispatch(handleInitialData())  // the data is initiate here, before login so that user can reconnect directly to a question id (and immediately see the change)
  }


  render() {

    const { authedUser } = this.props


    return (
      <div>
          <BrowserRouter>
            <NavWithRouter />

            { this.props.spinner&&
              <div style={styles.spinnerStyles} >
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={0} //no timeout

                />
              </div>
            }

              <Fragment>
                <Switch>
                  <Route  exact path='/login'  component={LoginBoard} />
                  <PrivateRoute exact  path='/' authedUser={authedUser} component={DashBoard}  />
                  <PrivateRoute path='/questions/:question_id'  authedUser={authedUser} component={Question} />
                  <PrivateRoute exact  path='/add' authedUser={authedUser} component={NewQuestion} />
                  <PrivateRoute exact  path='/leaderboard' authedUser={authedUser} component={LeaderBoard} />
                  <Route  component={NotFound} />
                </Switch>
              </Fragment>

          </BrowserRouter>

      </div>
    )
  }
}



// Component Styles
const styles = {
  spinnerStyles : {
    position:'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '99'
  }
}


App.propTypes = {
  //authedUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  spinner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
}


function mapStateToProps ({authedUser,spinner}){
    return {
        authedUser,
        spinner,
    }
}


export default connect(mapStateToProps)(App)