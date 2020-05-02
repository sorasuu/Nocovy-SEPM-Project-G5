import React from 'react';
import { TabPanel } from './SupplierDetailCard'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import { checkArray } from '../dashboard/Dashboard'
import { displayRetailer } from "../../store/actions/userActions"
function RetailerList(props){
    const { retailers, product, productkey, value } = props
    const retailersCheck = checkArray(retailers)
    // const retails= new Map(retailersCheck['0BVGQYiYTSHwHBf3vR9X'])
    console.log("retailers",retailersCheck['0BVGQYiYTSHwHBf3vR9X'])
    return(
        <div key={productkey}>
            {product.retailer ? product.retailer.map((id, key)=>
                    <TabPanel value={value} index={productkey} key={key}>
                        <Table>
                            <TableHead>
                                <TableCell>Avatar</TableCell>
                                <TableCell>BusinessName</TableCell>
                                <TableCell>DisplayName</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                            </TableHead>
                            
                        </Table>
                        <TableBody>
                        {retailersCheck[id]?
                            <TableRow>
                            <TableCell><img style={{width:"30px", height:'30px'}}src={retailersCheck[id].logo}/></TableCell>
                            <TableCell>{retailersCheck[id].businessName}</TableCell>
                            <TableCell>{retailersCheck[id].displayName}</TableCell>
                            <TableCell>{retailersCheck[id].email}</TableCell>
                            <TableCell>{retailersCheck[id].address}</TableCell>
                            </TableRow> :null}
                    </TableBody>
                        
                    </TabPanel>
                ):<div>No Retailer</div>}
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    const retailers = state.firestore.data.retailers
    // const retailersmap = state.
    return {
        retailers : retailers
    }
  };
const mapDispatchToProps = dispatch => {
    return {  
        displayRetailer: id => dispatch(displayRetailer(id))
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        if (!props.users)
          return [
            { collection: "users", where: [["type", "==", "retailer"]], storeAs: 'retailers' },
            
          ];
      })
    
)(RetailerList) 