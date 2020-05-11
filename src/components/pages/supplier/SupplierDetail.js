import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import SupplierDetailCard from './SupplierDetailCard'

class SupplierDetail extends Component {
    constructor(props) {
      super(props);
   }
    render() {
      const { auth, user, productList , productListdata} = this.props;
      if (!auth.uid) return <Redirect to='/signin' />
      
      console.log('productList', productList)
      return (
        <div className="container">
          {user ?

              <SupplierDetailCard 
                supplier={user} 
                products={productList}
                data = {productListdata} 
               />
           
            :<div>Loading...</div>
          }        
        </div>
      )
    }
  }

  const populates = [
    {
      child: 'retailerId', root:'users'
    }
  ]
  
  const collection = 'products'
  
  const mapStateToProps = (state, ownProps) => {
    const users = state.firestore.ordered.user;
    const user = users ? users[0]: null;
    const productListdata = populate(state.firestore, 'listProductSupply', populates)
    const productList = state.firestore.ordered.listProductSupply
    return {
      auth: state.firebase.auth,
      user: user,
      productList : productList,
      productListdata: productListdata,
      
    }
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      if (!props.users)
        return [
          { collection: "users", doc: props.match.params.id, storeAs:'user' },
          { collection, where:[['supplierId','==', props.match.params.id]], storeAs:'listProductSupply', populates},
          // { collection, populates}
        ];
    })
  )(SupplierDetail) 