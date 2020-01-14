        <div className="tabs " style={{textAlign:'center',marginTop:'25px', width:'100%', marginRight:'0',marginLeft:'0', margin:'auto'}}>
          <ul >
              {/*<li className="location.pathname==='/'? 'is-active' : '' >*/}
              <li>
                <NavLink to='/' exact activeClassName='active'> {/** We don't need this anymore because we're updatding the <li> class above  */}
                  Home
                </NavLink>
              </li>
              {/*<li className="{location.pathname==='/new'? 'is-active' : '' >*/}
              <li>
                <NavLink to='/new' activeClassName='active'>
                  New Question
                </NavLink>
              </li>
              <li>
                <NavLink to='/new' activeClassName='active'>
                  Leader Board
                </NavLink>
              </li>
            <li style={{paddingLeft:'300px'}}>
                  {  user&& <i>Hello {user.name} </i>   }
            </li>
            <li style={{paddingLeft:'10px'}}>
              {  user&& <a className="button is-warning">
                    Log out
                </a>
                }
            </li>
          </ul>



           <Route
          {...rest}
          render={({ location }) =>
          Object.entries(authedUser).length>0 ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />






<DashBoard userId={authedUser}/>          