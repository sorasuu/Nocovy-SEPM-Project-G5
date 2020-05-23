import React from 'react';
import { TabPanel } from './SupplierDetailCard'
import { NavLink } from 'react-router-dom'
import { Table, TableHead, TableCell, TableBody, 
        TableRow, Button
} from '@material-ui/core'

import InfoRoundedIcon from '@material-ui/icons/InfoRounded';

function RetailerList(props){
    const { product, productkey, value } = props
    
    const data = props.data?  props.data[product.id]: null;
    const retailerList = data?data.retailerId:null 
    console.log("retailer list", retailerList)
    return(
        <div key={productkey}>
            {retailerList ? retailerList.map((item, key)=>
        
                <TabPanel value={value} index={productkey} key={key} style={{width:'fit-content'}}>
                        <Table>
                            <TableHead>
                                <TableCell>Detail</TableCell>
                                <TableCell>Cover</TableCell>
                                <TableCell>BusinessName</TableCell>
                                <TableCell>DisplayName</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                            </TableHead>
                        
                        <TableBody>
                        
                            <TableRow>
                                <TableCell><NavLink to={`/retailer/${item.id}`}><Button><InfoRoundedIcon/></Button></NavLink></TableCell>
                                <TableCell><img style={{width:"100px", height:'150px'}}src={item.logo}/></TableCell>
                                <TableCell>{item.businessName}</TableCell>
                                <TableCell>{item.displayName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.address}</TableCell>
                            </TableRow> 

                        </TableBody>
                        </Table>
                    </TabPanel>
            )
                    
                :null}
        </div>
    )
}

export default (RetailerList)


