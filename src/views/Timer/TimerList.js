import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from 'constants/routes'

function TimerList(props) {

  return (
    <div>
      <h1>Timers</h1>
			<ul>
        <li><Link to={`${ROUTES.TIMER_LIST}/stretch`}>Stretch</Link></li>
        <li><Link to={`${ROUTES.TIMER_LIST}/workout`}>Workout</Link></li>
      </ul>
    </div>
  )
}

export default TimerList

