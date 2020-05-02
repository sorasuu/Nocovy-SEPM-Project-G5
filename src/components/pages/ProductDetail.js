import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, withStyles } from '@material-ui/core'

import  ProductDetailCard  from '../layout/ProductDetailCard'

const useStyles = (theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
});

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      owner:false
    }
 }

  render() {
    const { classes, auth, product,owner } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    // console.log("product detail ne:", this.props.product)
    return (
      <div className="container">
        {product ?
          
            <ProductDetailCard product={product} auth={auth} owner={owner}/>
         
          :<div>Loading...</div>
        }        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id]: null;
  const auth = state.firebase.auth
  var owner = null
  if (auth!==null&&auth!== undefined&& product!==null){
    if (auth.uid === product.supplierId){
      owner=true
    }
    else{
      owner=false
    }
  }
  return {
    auth: auth,
    product: product,
    owner:owner
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.products)
      return [
        { collection: "products", doc: props.match.params.id },
        
      ];
  })
)(withStyles(useStyles)(ProductDetail)) 