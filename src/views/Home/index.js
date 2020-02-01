import React from 'react'

import TimerList from 'views/Timer/TimerList'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#8F5D89',
    border: 'none',
    color: '#BEB9C1',
    padding: '15px 25px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    borderRadius: '5px',
    display: 'inline-block',
    font: 'inherit',
    fontWeight: '600',
  }
})

function Home(props) {

  const classes = useStyles()
  return (
    <div>
      <button className={classes.button} >Add new timer</button>
      <TimerList />
    </div>
  )
}

export default Home
