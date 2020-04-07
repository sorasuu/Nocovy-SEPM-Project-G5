import React, { Component } from 'react'
import { Redirect,  NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Grid} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import StyledButton from '../layout/StyledButton'
import ProductDetailCard from '../layout/ProductDetailCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'

class ProductDetail extends Component {
  state={
    reports:[],
    students:[],
    reportform: false,

  }
 handelReportformClicked =(e)=>{
   this.setState({reportform:!this.state.reportform})
 }
  render() {
    const { auth, currentproduct } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    return (
      <div className="container" style={{textAlign:'center'}}>
        {currentproduct?
        <div>
          <ProductDetailCard product={currentproduct}/>
          <StyledButton startIcon={<AddIcon/>} onClick={(e)=> this.handelReportformClicked(e)} >Product Report</StyledButton>
          {this.state.reportform?<div><h1>the form</h1></div>:null}
          </div>
          :
          <div>
          <h1>Loading...</h1>
          <ColorLinearProgress/>
          </div>}
        
       
   
         
        </div>
  
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const id = ownProps.match.params.id;

  console.log(state);
  console.log(ownProps)
  return {

}};

export default  compose(
  connect(mapStateToProps),
  // firestoreConnect((props) => {

  // })
)(ProductDetail) 