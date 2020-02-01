import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TimerDetails from 'views/Timer/TimerDetails'
import Home from 'views/Home'

import * as ROUTES from 'constants/routes'

function Main(props) {


  return (
    <Switch>
          <Route exact path={ROUTES.HOME} component={Home}/>
          <Route exact path={ROUTES.TIMER_DETAILS} component={TimerDetails}/>
    </Switch>
  )
}

export default Main