import React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { TableBody, TableRow, TableCell, Button, Grid, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core'
import firebase from 'firebase/app'
import {createSingleRequest} from '../../store/actions/transactionAction'
class RetailerDialogDetail extends React.Component {
    state={
        retailer: null,
        pending: true,
        open: false,
    }
    handleOpen=()=>{
        this.setState({open: true})
    }
    handleClose=()=>{
        this.setState({open: false})
    }
    
    handlePending=(e)=>{
        
        const request={
         retailerId:   this.state.retailer.uid,
         product: this.props.product
        }
        console.log(request)
        this.props.createSingleRequest(request)
        this.setState({pending: false}, {open: false})
    }
    
    componentDidMount() {
        
        var testRetailer=null
        if( this.props !== undefined){
            var docRef = firebase.firestore().collection("users").doc(this.props.id);
        
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                testRetailer = doc.data()
                
                return testRetailer
               
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).then(testRetailer=>{
            this.setState({retailer:testRetailer})
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    
    }
    render() {

        const retailer = this.state.retailer
        console.log('something', this.props)
        var requestuser=null
        if(this.props.requested!== undefined&& this.props.requested!==null){
            if(this.props.requested.pending===true){
                requestuser= <Grid item xs={6}> <Button><CheckRoundedIcon/></Button></Grid>
            }
            if(this.props.requested.pending===false&&this.props.requested.confirmed===true){
                //accepted
                // requestuser= <Grid item xs={6}> <Button><CheckRoundedIcon/></Button></Grid>
            }else if(this.props.requested.pending===false&&this.props.requested.confirmed===false){
                //declined
                // requestuser= <Grid item xs={6}> <Button><CheckRoundedIcon/></Button></Grid>
            }
        }else{
            requestuser =<Grid item xs={6}><Button onClick={this.handleOpen}><AddRoundedIcon/></Button></Grid>
        }
        return (
            <>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="del-dialog-title">
                <DialogTitle id="del-dialog-title">Confirm deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure wanna invite this retailer?</Typography>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handlePending} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


            <TableBody>
                {retailer !== undefined && retailer !== null ?
                <TableRow>
                    <TableCell style={{textAlign:'left'}}>
                        <Grid container direction="row">
                            {this.props.registered ? null:
                                <>{requestuser}</> 
                            }
                            <Grid item xs={6}>
                                <NavLink to={`/retailer/${retailer.uid}`}><Button><InfoRoundedIcon/></Button></NavLink>
                            </Grid>
                            
                        </Grid>
                    </TableCell>
                    <TableCell><img alt='' style={{maxWidth:'50px', height:'75px'}} src={retailer.logo}/></TableCell>
                    <TableCell>{retailer.businessName}</TableCell>
                    <TableCell>{retailer.email}</TableCell>
                    <TableCell>{retailer.address}</TableCell>
                </TableRow>
                
            :null
        }
            </TableBody>
            </> 
        )
    }

}
const mapDispatchToProps = dispatch => {
    return {
        createSingleRequest: (request) => dispatch(createSingleRequest(request)),
    }
  }



const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    const id = ownProps.id&&ownProps.product?ownProps.product.id+ ownProps.id:null
    const requesteds =state.firestore.data.requested
    const requested = requesteds? requesteds[id]: null
    return {
        requested: requested
        
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>{
        console.log(props)
    return[
        { collection: 'requests', where:[["retailerId","==",props.id]], where:[["productId","array-contains",props.product.id]],storeAs:'requested'},
      ]
      
     } )
    )
(RetailerDialogDetail)
