import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, withStyles } from '@material-ui/core'
import  ProductDetailCard  from './ProductDetailCard'

const useStyles = (theme) => ({
  root: {
    // width: 'fit-content',
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
 }
  render() {
    const { auth, product } = this.props;
    console.log('product nay', product)
    if (!auth.uid) return <Redirect to='/signin' />
    // console.log("product detail ne:", this.props.product)
    return (
      <div className="container">
        {product ?
          
            <ProductDetailCard product={product} id={this.props.match.params.id} owner={this.props.owner}/>
         
          :<div>Loading...</div>
        }        
      </div>
    )
  }
}

const populates = [
  {
      child: 'supplierId', root:'users',
  },
  {
    child: 'retailerId', root:'users'
  }
]

const collection = 'products'

const mapStateToProps = (state, ownProps) => {
  console.log (state)
  const product = populate(state.firestore, 'thisProduct', populates)
  const auth = state.firebase.auth
  var owner = null
  if (auth!==null&&auth!== undefined&& product!==null&& product!==undefined){
    if (auth.uid === product.supplierId.id){
      owner=true
    }
    else{
      owner=false
    }
  }
  console.log(owner)
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
        { collection, doc: props.match.params.id, populates ,storeAs:'thisProduct' },
        
      ];
  })
)(withStyles(useStyles)(ProductDetail)) 