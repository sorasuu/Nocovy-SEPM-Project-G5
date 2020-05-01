import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

import SupplierDetailCard from './SupplierDetailCard'

class SupplierDetail extends Component {
    constructor(props) {
      super(props);
   }
    render() {
      const { auth, user } = this.props;
      if (!auth.uid) return <Redirect to='/signin' />
      console.log("user trong supplier detail", user)
      return (
        <div className="container">
          {user ?

              <SupplierDetailCard supplier={user} />
           
            :<div>Loading...</div>
          }        
        </div>
      )
    }
  }
  
  const mapStateToProps = (state, ownProps) => {
    
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[id]: null;
    return {
      auth: state.firebase.auth,
      user: user
    }
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      if (!props.users)
        return [
          { collection: "users", doc: props.match.params.id },
          
        ];
    })
  )(SupplierDetail) 