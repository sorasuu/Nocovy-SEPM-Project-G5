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
        borderRadius:16
    },
    content: {
        textAlign: 'left',
        overflowX: 'auto',
    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        left: "5%",
        width: 'auto',
        minWidth:'250px',
        transform: 'translate(0%, 10%)'
    },
    buttonGroup: {
        display:'flex',
        justifyContent:'flex-end',
        marginTop: '1%',
    }
}));

const DialogPanel = (props) => {
    // console.log('dialog panel', props)
    
    
    // console.log('list retailers', listRetailers)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title={"Request"}
            />
            <CardContent className={classes.content}>
                <ProductDialogTable products={props.listProducts} currentRetailer={props.currentRetailer} handleChangeSelected={props.handleChangeSelected}/>
                <div className={classes.buttonGroup}>
                <StyledButton style={{ marginRight:10, background: "linear-gradient(45deg, #019179 30%, #0074A7 90%)", boxShadow: '0 3px 5px 2px rgba(105, 135, 255, 0.3'}} onClick={props.handleClose} >Cancel</StyledButton>
                    <StyledButton onClick={(e)=>props.handleSubmitRequest(e)}>Request</StyledButton>  
                </div>
            </CardContent>
        </Card>
    );
};

class ProductDialogDetail extends React.Component {
    state={
        productSelected:[],
        
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
        console.log('product dialog detail', this.props)
        const listProducts = this.props.listProducts ? this.props.listProducts : {name:'No Product'}

        return (
        
            <DialogPanel listProducts={listProducts}  currentRetailer={this.props.currentRetailer} handleChangeSelected={this.handleChangeSelected} handleSubmitRequest={this.handleSubmitRequest} handleClose={this.props.handleClose}/>
      
           
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
        listProducts : state.firestore.ordered.products
  
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

