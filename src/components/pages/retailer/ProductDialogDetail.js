import React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import {createListRequest} from '../../store/actions/transactionAction'
import ProductDialogTable from './ProductDialogTable';
import StyledButton from '../../layout/StyledButton';
const useStyles = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
    },
    content: {
        textAlign: 'left',
        overflowX: 'auto',
        marginLeft: "5%",
    },
}));

const DialogPanel = (props) => {
    console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Request"}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-1%", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content}  >
            <ProductDialogTable products={props.products} handleChangeSelected={props.handleChangeSelected}/>
            </CardContent>
            <StyledButton onClick={(e)=>props.handleSubmitRequest(e)}>Request</StyledButton>
        
            <StyledButton onClick={props.handleClose} >Cancel</StyledButton>
        </Card>
    );
};

class ProductDialogDetail extends React.Component {
    state={
        productSelected:[]
    }

    handleChangeSelected=(e,productSelected)=>{
        // console.log(productSelected)
        this.setState({productSelected:productSelected})
        
    }


    handleSubmitRequest=(e)=>{
        const request={
            retailerId:  this.props.currentRetailer.uid,
            products: this.state.productSelected
           }
           console.log(request)
           this.props.createListRequest(request)
           this.props.handleClose()
    }
   
    render() {

        const listProduct = this.props.listProduct? this.props.listProduct : {name:'No Product'}

        console.log('list Product', this.state.productSelected)
        return (

            <DialogPanel products={listProduct} handleChangeSelected={this.handleChangeSelected} handleSubmitRequest={this.handleSubmitRequest} handleClose={this.props.handleClose}/>

            // <Table>
            //     <TableHead>
            //         <TableRow>
            //             <TableCell>Actions</TableCell>
            //             <TableCell>Name</TableCell>
            //             <TableCell>Image</TableCell>
            //             <TableCell>Price</TableCell>
            //         </TableRow>
            //     </TableHead>
            //     <TableBody>
            //     { listProduct.map((product,key, isCheck=true) => 
            //         product.retailerId ? 
            //             product.retailerId.includes(this.props.currentRetailer.id) ?
            //                 <TableRow key={key}>
            //                     <TableCell>Detail</TableCell>
            //                     <TableCell>{product.name}</TableCell>
            //                     <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
            //                     <TableCell>{product.price.unitPrice}</TableCell>
            //                 </TableRow>
            //                 :
            //                 <TableRow>
            //                 <TableCell>
            //                     <Checkbox color={'primary'} onClick={e=>this.handleCheckBox(e,product.id,isCheck)} checked={isCheck}/>
            //                     </TableCell>
            //                 <TableCell>{product.name}</TableCell>
            //                 <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
            //                 <TableCell>{product.price.unitPrice}</TableCell>
            //             </TableRow>
                            
            //         :<TableRow>
            //         <TableCell><Checkbox color={'primary'} onClick={e=>this.handleCheckBox(e,product.id,isCheck) } checked={isCheck} /></TableCell>
            //         <TableCell>{product.name}</TableCell>
            //         <TableCell><img style={{width:'50px', height:'75px'}} src={product.cover}/></TableCell>
            //         <TableCell>{product.price.unitPrice}</TableCell>
            //     </TableRow>
                    
            //         )
            //     } 
                    
                
           
        
            // </TableBody>
            // </Table>
            
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        createListRequest:(requests)=>dispatch (createListRequest(requests)),
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
          ];
      })
  
  
  )(ProductDialogDetail)

