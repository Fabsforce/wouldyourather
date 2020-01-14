import React, { Component } from 'react'



class NotFound extends Component {
    render() {
        return(
        <section className="hero is-medium is-danger is-bold" >
            <div className="hero-body">
              <div className="container" style={{width:'960px'}}>
                <h1 className="title">
                  This page does not exist (404)
                </h1>
                <h2 className="subtitle">
                  Please use the navigation menu at the top of the page
                </h2>
              </div>
            </div>
        </section>
        )
    }
}

export default NotFound