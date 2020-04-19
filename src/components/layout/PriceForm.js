import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';


export default class PriceForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
    }
  }
  handleClickForm =() => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickForm}>
          Edit
        </Button>
       
        <Dialog open={this.state.isOpen} onClose={this.handleClickForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Price Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit your price information 
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              id=""
              label="$"
              type='number'
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id=""
              label=""
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id=""
              label=""
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id=""
              label=""
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id=""
              label=""
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id=""
              label=""
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClickForm} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog> 
        
      </div>
    );
  }
 
}