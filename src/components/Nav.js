import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'

//export default function Nav () {
class Nav extends Component {


handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(logoutUser('none')) 
    // In case user Logout after a Notfound error -> to bring back to Login page (else it keeps the pathname of worng path)
    if (this.props.location.pathname==='/Notfound'){
        this.props.history.replace('/')
    } 
}



render() {
  //const { location } = this.props; // other props are { match, location, history }
  const { user } = this.props

  return (

       <nav className="navbar" role="navigation" aria-label="main navigation" style={{borderBottom: '1px solid #DCDCDC',}}> 
         <div className="navbar-brand">
              <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                Not Mobile Ready Yet
              </div>{/** end of burger */}
          </div>{/** end of navbrand */}
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start" style={{marginLeft:'auto'}}>
                 <NavLink to='/' exact  className="navbar-item" activeClassName='active'> 
                      Home
                  </NavLink>
                  <NavLink to='/add' className="navbar-item" activeClassName='active'> 
                      New Question
                  </NavLink>
                  <NavLink to='/leaderboard' className="navbar-item" activeClassName='active'> 
                    Leader Board
                  </NavLink>
            </div>
        
            <div className="navbar-end" style={{marginRight:'auto'}}>
              <div className="navbar-item">
              {  user &&
                <div className="buttons">
                  <div className="is-white" style={{paddingRight:'15px', paddingBottom:'7px'}}>
                             <img src={user.avatarURL} alt={user.name}/>   Hello {user.name}!
                  </div> 
                  <a className="button is-warning" onClick={this.handleLogout} href="/#">
                    <strong>Log out</strong>
                  </a>
                </div>
              } 
              </div>
            </div>
          </div>
      </nav>
  

    )
  }
}



function mapStateToProps ({authedUser,users}){
  const user = users[authedUser]
  return {
      authedUser,
      user,
  }
}

export default connect(mapStateToProps)(Nav)