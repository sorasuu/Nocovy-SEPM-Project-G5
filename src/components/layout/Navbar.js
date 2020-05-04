import React from 'react'
import { Link } from 'react-router-dom'

import SignedInLinks from './SignedInLinks'

import { connect } from 'react-redux'
import {
  makeStyles, useTheme, AppBar, Toolbar,
  Typography
} from '@material-ui/core'
import SignedOutLinks from './SignedOutLinks'


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
    color: "black"
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  console.log('navbar',props)
  const { auth } = props;
  const classes = useStyles();
  const links = auth.uid ? <SignedInLinks props={props} /> : <SignedOutLinks/>;


  return (
    <div >
      <AppBar position="static"
        style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Link to="/">
       <img src="https://firebasestorage.googleapis.com/v0/b/sepm-nocovy.appspot.com/o/LogoNocovy.png?alt=media&token=d9ea6b4b-27c5-4bb6-83b0-06d9dc1d38e1" style={{width:"120px"}} alt='Nocovy Logo'></img>
       </Link>
          <div className={classes.root} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}


export default connect(mapStateToProps)(Navbar)