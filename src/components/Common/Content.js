import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        minWidth: '60%',
        padding: '50px',
        backgroundColor: '#11001C',
        boxShadow: '0 0 10px 15px rgba(255, 255, 255, 31%)',
    },
    title: {
        color: '#BEB9C1',
    }
})

function Content(props) {

    const classes = useStyles()
    return (
        <div className={classes.root} >
            <h1 className={classes.title}>Super Timer</h1>
            {props.children}
        </div>
    )
}

export default Content