import React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead , TableBody, TableRow, TableCell, Button, Grid } from '@material-ui/core'
import firebase from 'firebase/app'
import {createSingleRequest} from '../../store/actions/transactionAction'
const useStyles = theme => ({
})

class ProductDialogDetail extends React.Component {
    state={
        pending: true,
    }
    
   
    render() {

        const listProduct = this.props.listProduct? this.props.listProduct : {name:'No Product'}

        console.log('list Product', listProduct)
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Actions</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { listProduct.map(product => 
                    product.retailerId ? 
                        product.retailerId.includes(this.props.currentRetailer.id) ?
                            <TableRow>
                                <TableCell>Detail</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
                                <TableCell>{product.price.unitPrice}</TableCell>
                            </TableRow>
                            : <TableRow>
                            <TableCell>Invite</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
                            <TableCell>{product.price.unitPrice}</TableCell>
                        </TableRow>
                            
                    :<TableRow>
                    <TableCell>Invite</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
                    <TableCell>{product.price.unitPrice}</TableCell>
                </TableRow>
                    
                    )
                } 
                    
                
           
        
            </TableBody>
            </Table>
            
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
      
    };
  };
  
const mapStateToProps = (state) => {
    
    return {
        listProduct : state.firestore.ordered.products
  
    }
  };
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
       console.log('props need check...', props)
          return [
              {collection: 'products', where:[["supplierId", '==', props.currentUser.id]]}
            // { collection:'users', doc: props.match.params.id, storeAs:'retailer' },
            // { collection, where:[['retailerId','array-contains',props.match.params.id]],populates,storeAs:'sellList'}
            
          ];
      })
  
  
  )(withStyles(useStyles)(ProductDialogDetail))

