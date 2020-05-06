import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import 'firebase/database';
import { firebaseConnect, populate } from 'react-redux-firebase'

export default class NewDashBoard extends Component{
    render(){
        console.log("enhance", enhance)
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
const enhance = compose(
    firebaseConnect([
        {path:'/products', populates}
    ]),
    connect(
        ({firebase}) => ({
            products: populate(firebase, 'products', populates)
        })
    )
)