import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'

import NeedAuth from 'views/Main/NeedAuth'

import { withFirebase } from 'components/Firebase'
import * as ROUTES from 'constants/routes'
import * as AUTH_LEVELS from 'constants/authLevels'

const withAuthorisation = (condition) => (Component) => {
  class WithAuthorisation extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) =>  {
          if (!condition(authUser)) {
            // is this push necessary? if we push to a page
            // then when the user presses back they will be redirected
            // back to needauth again.

            // commented out for now, and displaying NeedAuth component on page below instead
//            this.props.history.push(ROUTES.NEEDAUTH)
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
           condition(authUser)
           ? <Component {...this.props} />
           : ( authUser ? <NeedAuth /> : null )
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorisation)
}

const hasAuth = (authLevel) => (authUser) => {
  
  return authUser &&
    authUser.authLevel &&
    authUser.authLevel >= AUTH_LEVELS[authLevel]
}

export default withAuthorisation
export { hasAuth }
