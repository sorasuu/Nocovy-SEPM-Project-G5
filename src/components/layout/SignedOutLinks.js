import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const SignedOutLinks = () => {
  return (
    <div>
       <Grid container spacing={3}>
      <Grid item xs={6}>
 
        <NavLink to='/signup'>
          <Button>Signup</Button>
          </NavLink>
      </Grid>
        
      <Grid item xs={6}>

        <NavLink to='/signin'>
          <Button>Login</Button>
          
          </NavLink>
   </Grid></Grid>
    </div>
  )
}

export default SignedOutLinks