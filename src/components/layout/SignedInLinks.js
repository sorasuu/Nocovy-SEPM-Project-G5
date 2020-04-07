import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Grid from '@material-ui/core/Grid';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";



export  function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
      <NavLink to='/myproducts' style={{color:"black"}} >
      <MenuItem onClick={handleClose}>My Products</MenuItem></NavLink>
      <NavLink to='/reports' style={{color:"black"}}>
      <MenuItem onClick={handleClose}>Product Reports</MenuItem></NavLink>
     
      </Menu>
    </div>
  );
}

const SignedInLinks = (props) => {

  return (
    <div>
      <Grid container spacing={3}>
      <Grid item xs={6}>
            <LongMenu  />
        </Grid>
        <Grid item xs={6}>
      <IconButton onClick={props.signOut} >
            <InputIcon  />
          </IconButton>
        </Grid>
     
        </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks) 
