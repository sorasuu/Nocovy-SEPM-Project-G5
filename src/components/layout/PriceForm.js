import React, { Fragment } from 'react';
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
      open: false,
      price:{
        fobPoint:'',
        freightRate:'',
        freightDescription:'',
        dutyRate:'',
        unitCost:'',
        freightCost:'',
        dutyCost:'',
        miscCost:'',
        landedCost:'',
        margin:'',
        unitPrice:'',
      }
    }
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
    const { open, 
    price:{
      fob,
      frate,
      fdescription,
      dutyrate,
      unitcost,
      fcost,
      dutycost,
      misc,
      land,
      margin,
      unitprice} 
    } = this.state
    return <Fragment>
   
        <Button variant="outlined" color="primary" onClick={this.handleClickForm}>
          Edit
        </Button>
       
        <Dialog open={open} onClose={this.handleClickForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Price Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit your price information 
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              label="FOB Point"
              value={fob}
              type='string'          
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              value={frate}
              label="Freight Rate ($/ft3)"
              type='number'
              
            />
            <br/>
            <TextField
              autoFocus
              multiline
              rows="3"
              margin="dense"
              value={fdescription}
              label="Freight Description"
              type='string'
              fullWidth
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              value={fcost}
              label="Freight Cost ($)"
              type='number'
            />
            <TextField
              autoFocus
              margin="dense"
              value={unitcost}
              label="Unit Cost ($)"
              type='number'
              style={{marginLeft:10}}
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              value={dutyrate}
              label="Duty Rate (%)"
              type='number'
            />
            <TextField
              autoFocus
              margin="dense"
              value={dutycost}
              label="Duty Cost ($)"
              type='number'
              style={{marginLeft:10}}
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              value={misc}
              label="Misc Cost ($)"
              type='number'

            />
      
            <TextField
              autoFocus
              margin="dense"
              value={land}
              label="Landed Cost ($)"
              type='number'
              style={{marginLeft:10}}
            />
            <br/>
             <TextField
              autoFocus
              value={margin}
              label="Margin (%)"
              type='number'
              
            />
            <br/>
            <TextField
              autoFocus
              margin="dense"
              value={unitprice}
              label="Unit Price ($)"
              type='number'
            />
            
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