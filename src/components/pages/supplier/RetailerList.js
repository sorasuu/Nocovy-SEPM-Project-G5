import React from 'react';
import { TabPanel } from './SupplierDetailCard'
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'


function RetailerList(props){
    const { product, productkey, value } = props
    
    const data = props.data?  props.data[product.id]: null;
    const retailerList = data?data.retailerId:null 
    console.log("retailer list", retailerList)
    return(
        <div key={productkey}>
            {retailerList ? retailerList.map((item, key)=>
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
                        
                            <TableRow>
                                <TableCell><img style={{width:"30px", height:'30px'}}src={item.logo}/></TableCell>
                                <TableCell>{item.businessName}</TableCell>
                                <TableCell>{item.displayName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.address}</TableCell>
                            </TableRow> 
                    </TableBody>
                        
                    </TabPanel>
                ):<div>No Retailer</div>}
        </div>
    )
}

export default (RetailerList)


