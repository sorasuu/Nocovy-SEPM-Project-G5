import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import 'firebase/database';
import { firestoreConnect, populate } from 'react-redux-firebase'

class NewDashBoard extends Component{
    render(){
        console.log("populates: ", this.props.products)
        return(
            <div>
            
            </div>
        )
    }
    
}

const populates = [
    {
        child: 'supplierId', root:'users'
    }
]

const collection = 'products'
const mapStateToProps = (state) => {
    console.log(state)
    return {
      products: populate(state.firestore, 'products', populates)
    }
  };

const enhance = compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection,
            populates 
        },
    ]),
    
)
 export default enhance(NewDashBoard)