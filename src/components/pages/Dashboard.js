import React, { Component } from 'react'
import { Redirect,  NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Grid} from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import ProductCard from '../layout/ProductCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'
import { storeProducts } from "./data"

class Dashboard extends Component {
  state = {
    products: storeProducts
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
  
    return (
      <div className="container" style={{textAlign:'center'}}>

          <h1 style={{fontFamily:'Muli', marginBottom:"5%"}}>Welcome To Nocovy</h1>
          <NavLink to ="/reports" style={{marginRight:"2%", marginBottom:"2%"}}>
            <StyledButton>Product Report</StyledButton>
          </NavLink>
          <NavLink to ="/products" style={{ marginBottom:"2%"}}>
            <StyledButton>Product Manangement</StyledButton>
          </NavLink>
           <div style={{marginTop:'10%'}}>
          <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"       
          >
           {this.state.products?this.state.products.map(product=>{
             return(
              <Grid item xs={12} sm={6} md={4}  key={product.id}>
             <ProductCard  product={product}/>
          </Grid>
          )}):<h5>Loading...</h5>}</Grid>
          
          </div>
        </div>
     
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("haha", state.product);
  return {
    auth: state.firebase.auth,
  }
};

export default  compose(
  connect(mapStateToProps),
  // firestoreConnect([

  // ])
)(Dashboard) 