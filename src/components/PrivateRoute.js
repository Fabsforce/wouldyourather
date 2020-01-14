import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (

    <Route {...rest}
        render={props => (
          Object.entries(authedUser).length>0
                ? <Component {...props} />
                : <Redirect 
                    to={{
                        pathname: '/Login',
                        state: { from: props.location }
                }}/>
        )}
    />
  )



export default PrivateRoute