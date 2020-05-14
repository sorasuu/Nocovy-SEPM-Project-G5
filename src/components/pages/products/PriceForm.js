import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid'



export default class PriceForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      openDelete:false,
      open: false,
    }
  }

  handleDeleteDialog =() => {
    this.setState({openDelete: !this.state.openDelete})
  }

  handleDelete =() => {
    // console.log(this.props.product)
    this.props.deleteProduct(this.props.product)
  }

  handleClickForm =() => {
    this.setState({open: !this.state.open})
  }
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      price: {
        ...this.state.price,
        [name]: value
      }
    })

  }
  // handleSubmit =() => {
  //   const {price} = this.state

  //   this.props.onCreate(price)  
  // }

  render(){
    
    const { open, openDelete } = this.state
    return <Fragment>
      
      <Grid container direction='row' justify='flex-end' alignItems="center">
        
        <Grid item> 
          <Button variant="outlined" color="primary" onClick={this.handleClickForm}>
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={this.handleDeleteDialog}>
            Delete
          </Button>
        </Grid>
       
     
        
      </Grid>
        <Dialog open={openDelete} onClose={this.handleDeleteDialog} aria-labelledby="del-dialog-title">
          <DialogTitle id="del-dialog-title">Confirm deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you wish to delete this product?</Typography>
          </DialogContent>
          <DialogActions>
           <Button onClick={this.handleDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
       
        <Dialog open={open} onClose={this.handleClickForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Price Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit your price information 
            </DialogContentText>      
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog> 
        
      </Fragment>
  }
}