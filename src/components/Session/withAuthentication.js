import React from 'react'

import { withFirebase } from '../Firebase'
import { AuthUserContext } from '../Session'
import { withTranslation } from 'react-i18next';


const withAuthentication = (Component) => {
  class withAuthentication extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      }
    }

    componentDidMount() {
      const { i18n } = this.props;
      const changeLanguage = lng => {
        i18n.changeLanguage(lng);
      };
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          if ( !localStorage.getItem('lastLang') || localStorage.getItem('lastLang') !== authUser.language ){
            localStorage.setItem('lastLang', authUser.language)
            changeLanguage(authUser.language)
          }
          this.setState({ authUser })

          console.log( '*** with Auth: authUser: ', authUser );

          this.props.firebase.userConnected().on('value', (snapshot) => {
            if (snapshot.val() === true) {
              // We're connected
              var con = this.props.firebase.userConnections(authUser.uid).push()
              // When I disconnect, remove this device
              con.onDisconnect().remove()

              // Add this device to my connections list
              // TODO add device info to this value
              con.set(true)

              // When I disconnect, update the last time seen online
              this.props.firebase.userLastOnline(authUser.uid)
                .onDisconnect().set(this.props.firebase.serverValue.TIMESTAMP)
            }
          })
        },
        () => {
          localStorage.removeItem('authUser')
          this.setState({ authUser: null })
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }


    render() {
      return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Component {...this.props} />
      </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(withTranslation()(withAuthentication));
}

export default withAuthentication
