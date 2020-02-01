import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

//import HeaderBar from 'components/Common/HeaderBar'
import Main from 'views/Main/Main'
import Content from 'components/Common/Content'
import { makeStyles, MuiThemeProvider } from '@material-ui/core';


import { theme } from "constants/theme";
/*
colour palette

const purple = {
  "deepViolet": #3A015C,
  "tyrianPurple": #4F0147,
  "lightTyrian": #8F5D89
  "darkPurple": #35012C,
  "middleRedPurple": #290025,
  "smokyBlack": #290025,
  "lightSmoky": #BEB9C1
}

*/
const useStyles = makeStyles({
  root: {
    backgroundColor: '#290025',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
})

function App() {

  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          {/*           <HeaderBar/> */}
          <Content>
            <Main />
          </Content>
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

export default App;
