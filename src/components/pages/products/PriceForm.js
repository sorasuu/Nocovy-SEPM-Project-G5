import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography, Modal} from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import {deleteProduct, editProduct} from '../../store/actions/productAction'
import history from '../../utils/history'
import EditProductCard from './EditProductCard'
import { TableRow, TableCell } from '@material-ui/core'
export class PriceForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      openDelete:false,
      open: false,
      newProductName: this.props.product.name,
      newProductDesc: this.props.product.description,
      newDutyRate: this.props.product.price.dutyRate,
      newMargin: this.props.product.price.margin,
      newUnitCost: this.props.product.price.unitCost,
      newImages: this.props.product.images,
      newCategory: this.props.product.category,

      nameError: false,
      categoriesError: false, 
      unitCostError:'',
      dutyRateError:'',
      marginError:''
    }
  }

  handleDeleteDialog =() => {
    this.setState({openDelete: !this.state.openDelete})
  }

  handleDelete =() => {
    // console.log(this.props.product)
    this.props.deleteProduct(this.props.id)
    history.push('/')
    window.location.reload()
  }

  handleClickForm =() => {
    this.setState({open: !this.state.open})
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value })
  }

  handleCatChange = (chips) => {
    this.setState({ newCategory: chips })
  }

  handleChangeCategory = (e) => {
    this.setState({ selectedCategories: e.target.value })
  }

  validateForm = () => {
    var valid = true
    if(this.state.newProductName === ''){
      this.setState({nameError: true})
      valid = false
    }
    else if(this.state.newProductName.length > 256){
      this.setState({nameError: true})
      valid = false
    }
    else{
      this.setState({nameError: false})
    }
    if(this.state.newCategory.length <= 0){
      this.setState({categoriesError: true})
      valid = false
    }
    else{
      this.setState({categoriesError: false})
    }
    if(this.state.newUnitCost === ''){
      this.setState({unitCostError: 'The product unit cost cannot be empty'})
      valid = false
    }
    else if(this.state.newUnitCost <= 0){
      this.setState({unitCostError: 'The product unit cost cannot be negative or zero'})
      valid = false
    }
    else{
      this.setState({unitCostError: ''})
    }
    if(this.state.newDutyRate === ''){
      this.setState({dutyRateError: 'The product duty rate cannot be empty'})
      valid = false
    }
    else if(this.state.newDutyRate < 0){
      this.setState({dutyRateError: 'The product duty rate cannot be negative'})
      valid = false
    }
    else{
      this.setState({dutyRateError: ''})
    }
    if(this.state.newMargin === ''){
      this.setState({marginError: 'The product margin cannot be empty'})
      valid = false
    }
    else if(this.state.newMargin < 0){
      this.setState({marginError: 'The product margin cannot be negative'})
      valid = false
    }
    else{
      this.setState({marginError: ''})
    }
    return valid
  }

  handleSubmit =() => {
    if (this.validateForm()){
      var newUnitPrice = (Number(this.state.newUnitCost) * ((100 + Number(this.state.newMargin) + Number(this.state.newDutyRate))/100)).toFixed(2)
      var product = {
        id: this.props.id,
        category: this.state.newCategory, 
        name: this.state.newProductName, 
        description: this.state.newProductDesc,
        price: {
          dutyRate: this.state.newDutyRate,
          margin: this.state.newMargin,
          unitCost: this.state.newUnitCost,
          unitPrice: newUnitPrice
        }
      }
      // console.log(product)
      this.props.editProduct(product)
      this.handleClickForm()
    }
  }

  render(){
    console.log("price form", this.state.newCategory)
    return <Fragment>
      
        
          <TableCell> <Button size="small" variant="outlined" color="primary" onClick={this.handleClickForm}>
            Edit
          </Button></TableCell>
          <TableCell size="small"><Button size="small" variant="outlined" color="secondary" onClick={this.handleDeleteDialog}>
            Delete
          </Button></TableCell>


        <Dialog open={this.state.openDelete} onClose={this.handleDeleteDialog} aria-labelledby="del-dialog-title">
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

          <Modal open={this.state.open} onClose={this.handleClickForm}>
            <div style={{maxWidth:'50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',}}>
              <EditProductCard props={this.props} values={this.state} saveEdit={this.handleSubmit} closeModal={this.handleClickForm} handleChange={this.handleChange} handleCatChange={this.handleCatChange} handleChangeCategory={this.handleChangeCategory}/>
            </div>
          </Modal>
      </Fragment>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: cart => dispatch(deleteProduct(cart)),
    editProduct: (newProductInfo) => dispatch(editProduct(newProductInfo)),
  };
};
export default connect(null,mapDispatchToProps) (PriceForm)