import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { Avatar } from 'material-ui'
const useStyles = makeStyles(styles);
export function UserMenu(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
  const open = Boolean(anchorEl);
  const large = useSizedIconButtonStyles({ padding: 4, childSize: 28 });
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

      <IconButton classes={large} onClick={(e)=>handleClick(e)}>
          
          <Avatar src={props.currentUser?props.currentUser.logo:null} />
        </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <NavLink to={`/profile/${props.props.uid}`} style={{ color: "black" }} >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          </NavLink>
        {props.lastContact ?
          <NavLink to={'/chat/' + props.lastContact.id} style={{ color: "black" }}>
            <MenuItem onClick={handleClose}>Chat</MenuItem></NavLink> : null
            }
        <NavLink to ='/myorders' style={{ color: "black" }}> <MenuItem onClick={handleClose}>My Orders</MenuItem> </NavLink>
        <NavLink to ='/myrequests' style={{ color: "black" }}> <MenuItem onClick={handleClose}>Requests</MenuItem> </NavLink>
        <MenuItem style={{ color: "black" }} onClick={(e)=>props.handelSignOut(e)}><Button variant='outlined'>Sign Out</Button></MenuItem> 
  

      </Menu>

    </div>
  );
}

export function MoreMenu(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
  const open = Boolean(anchorEl);
  const large = useSizedIconButtonStyles({ padding: 4, childSize: 28 });
  const handleClick = event => {
    console.log(props)
    setAuth(props);
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
          <NavLink to ='/faq' style={{ color: "black" }}> <MenuItem onClick={handleClose}>FAQ</MenuItem> </NavLink>
          <NavLink to ='/rules' style={{ color: "black" }}> <MenuItem onClick={handleClose}>Transaction Rules</MenuItem> </NavLink>
          <NavLink to ='/privacypolicy' style={{ color: "black" }}> <MenuItem onClick={handleClose}>Privacy Policy</MenuItem> </NavLink>
          <NavLink to ='/tos' style={{ color: "black" }}> <MenuItem onClick={handleClose}>Term of Service</MenuItem> </NavLink>
      </Menu>
    </div>
  );
}
const SignedInLinks = (props) => {
  console.log(props)
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
  const { auth, cart } = props

  var cartnav
  if (cart === undefined) {
    cartnav = JSON.parse(window.localStorage.getItem('cart'))
  } else {
    if (cart.length === 0) {
      cartnav = JSON.parse(window.localStorage.getItem('cart'))
    }
    else {
      cartnav = cart
    }
  }
  const handelSignOut = (e) => {
    props.signOut()
    localStorage.removeItem('cart');
    sessionStorage.removeItem('logo')
    window.location.reload()

  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3} style={{ marginTop: "1%", marginRight: '-1%' }}>
          <NavLink to={'/cart'}  >
            <IconButton>
              <ShoppingCartIcon  className={classes.icons} />
              {cartnav ?
                <span className={classes.notifications}>{cartnav.length}</span> : null}
            </IconButton>
          </NavLink>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "1%" }}>
          <div className={classes.manager}>
            <IconButton

              onClick={handleClickNotification}
              className={classes.buttonLink}
            >
              <Notifications className={classes.icons} />
              {props.props.notifications?<span className={classes.notifications}>{props.props.notifications.length}</span>:null}
              <Hidden mdUp implementation="css">
                <p onClick={handleCloseNotification} className={classes.linkText}>
                  Notification
            </p>
              </Hidden>
            </IconButton>
            <Poppers
              open={Boolean(openNotification)}
              anchorEl={openNotification}
              transition
              disablePortal

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
                      {props.props.notifications?props.props.notifications.map(noti=> {return(
                        <MenuItem
                        onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        {noti.content}
                  </MenuItem>
                        )})
                        :<MenuItem
                          onClick={handleCloseNotification}
                          className={classes.dropdownItem}
                        >
                          You have no notification
                    </MenuItem>}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        </Grid>
        <Grid item xs={3}>
          <UserMenu props={auth} lastContact={props.props.lastContact} currentUser={props.props.currentUser} handelSignOut={handelSignOut}/>
        </Grid>
        <Grid item xs={3}>
        <MoreMenu/>
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
