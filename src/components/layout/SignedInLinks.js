import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Grid from '@material-ui/core/Grid';
import InputIcon from '@material-ui/icons/Input';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Notifications from "@material-ui/icons/Notifications";
import styles from './headerLinksStyle'
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles(styles);
export  function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = event => {
    console.log(props)
    setAuth(props);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
//  console.log(props)

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
      <NavLink to={`/profile/${props.props.uid}`} style={{color:"black"}} >
      <MenuItem onClick={handleClose}>My Profile</MenuItem></NavLink>
      {props.lastContact?
      <NavLink to={'/chat/'+props.lastContact.id }style={{color:"black"}}>
      <MenuItem onClick={handleClose}>Chat</MenuItem></NavLink>:null}
      </Menu>
      
    </div>
  );
}

const SignedInLinks = (props) => {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const {auth} = props 
  return (
    <div>
      <Grid container spacing={3}>
      <Grid item xs={4} style={{marginTop:"2%"}}>
        <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          // justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          // className={
          //   classNames({ [classes.popperClose]: !openNotification }) +
          //   " " +
          //   classes.popperNav
          // }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <NavLink to='/chat'>
                      <MenuItem
                        onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your message
                      </MenuItem>
                    </NavLink>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new transaction
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You are now able to trade with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
          </Grid>
      <Grid item xs={4}>
            <LongMenu props={auth} lastContact={props.props.lastContact}/>
        </Grid>
        <Grid item xs={4}>
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
