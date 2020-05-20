import React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { TableBody, TableRow, TableCell, Button, Grid } from '@material-ui/core'
import firebase from 'firebase/app'
class RetailerDialogDetail extends React.Component {
    state={
        retailer: null,
        pending: true,
    }
    handlePending=(e)=>{
        this.setState({pending: false})
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
        return (
            <TableBody>
                {retailer !== undefined && retailer !== null ?
                <TableRow>
                    <TableCell style={{textAlign:'left'}}>
                        <Grid container direction="row">
                            {this.props.registered ? null:
                                <>{this.state.pending ?
                                    <Grid item xs={6}>
                                        <Button onClick={this.handlePending}><AddRoundedIcon/></Button>
                                    </Grid>
                                    : <Grid item xs={6}>
                                        <Button><CheckRoundedIcon/></Button>
                                    </Grid>
                                    }
                                </>
                                
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
        )
    }

}

// const mapStateToProps = (state, ownProps) => {
//     console.log('state', state, 'ownProps', ownProps)

//     return {
//         selectedRetailer: state.firestore.data.selectedRetailer
//     }
// }
// export default compose(
//     connect(mapStateToProps),
    
// )(RetailerDetail)
export default RetailerDialogDetail;