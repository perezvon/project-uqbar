//boilerplate from Auth0 site

import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

        static propTypes = {
            location: T.object,
            auth: T.instanceOf(AuthService)
            }
        
  render() {
    const { auth } = this.props;
    return (
      <div className="login">
        <h2>Login</h2>
          <button className="pu-button" onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}