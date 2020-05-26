import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Notifications from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { Avatar } from 'material-ui'
import moment from 'moment'
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
  console.log('navbar profile menu', props)
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
        TransitionComponent={Fade}
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


  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);

  const { auth, cart } = props
  const handleClick = event => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <Badge badgeContent={props.props.cart?props.props.cart.length:0} color="secondary">
              <ShoppingCartIcon  />
             </Badge>
            </IconButton>
          </NavLink>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "1%" }}>
            <IconButton
              onClick={handleClick}
              
            >
              <Badge badgeContent={props.props.notifications?props.props.notifications.length:0} color="secondary">
              <Notifications  />
              </Badge>
            </IconButton>          
                  <Menu
                     id="long-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={open}
                     onClose={handleClose}>
                  {props.props.notifications?props.props.notifications.map((noti, key)=>
                    <MenuItem onClick={handleClose} key={key} style={{maxWidth:'300px',whiteSpace: 'normal'}}>
                   <p> {noti.content}</p>
                  <p style={{fontSize:'10px',marginTop:'40px', textAlign:'right',marginRight:'5px'}}>from {moment(noti.time.toDate()).fromNow()}</p>
                  </MenuItem>
                        )
                        :<MenuItem
                          onClick={handleClose}
                      
                        >
                          You have no notification
                    </MenuItem>}
                    </Menu>
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
