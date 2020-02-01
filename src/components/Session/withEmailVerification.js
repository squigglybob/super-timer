import React, { useState, useContext } from 'react'

import { P, H1 } from 'components/Type'

import { Page, Wrap, Divider } from 'components/Elements/Page'
import Button from 'components/Elements/Button'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'
import { useSnackbar } from 'notistack'

import * as EMAIL from 'constants/emailing'


const withEmailVerification = (Component) => {
  function WithEmailVerification(props) {

    const [ isSent, setIsSent ] = useState(false)

    const authUser = useContext(AuthUserContext)
    const firebase = useContext(FirebaseContext)

    const { enqueueSnackbar } = useSnackbar();

    const onSendEmailVerification = () => {
      const data = {
        emailTo: authUser.email,
        emailFrom: EMAIL.FROM,
        continueUrl: EMAIL.BASE_URL,
        displayName: authUser.username,
        projectName: EMAIL.PROJECT_NAME,
      }

      firebase.doSendEmailVerification(data)
        .then(() => {
          setIsSent(true)
          enqueueSnackbar("Confirmation email sent", {variant: "success"})
        })
    }

    const needsEmailVerification = (authUser) =>
      authUser &&
      !authUser.emailVerified &&
      authUser.providerData
      .map(provider => provider.providerId)
      .includes('password')

    return(
        needsEmailVerification(authUser) ? (
          <Wrap size="small">
            <H1>Verify Email</H1>
            <Page>
              <P>
                Verify your E-Mail: Check your E-Mails
                (Spam folder included) for a confirmation
                E-Mail or send another confirmation E-Mail.
              </P>
              <Divider />
              <Button type="button"
                      onClick={onSendEmailVerification}
                      disabled={isSent}>
                Send confirmation E-Mail
              </Button>
            </Page>
          </Wrap> 
        ) : (
          <Component {...props} />
        )
      )
  }

  return WithEmailVerification
}

export default withEmailVerification
