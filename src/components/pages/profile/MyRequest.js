import React, { Component } from 'react'
import cx from 'clsx';
import { makeStyles  } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import { Container, Grid,Box , Avatar ,Divider, Button  } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import StyledButton from '../../layout/StyledButton';
import {acceptRequest,declineRequest} from '../../store/actions/transactionAction'
import {registerRetailers} from '../../store/actions/productAction'
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
    root: {
        maxWidth: 343,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
      },
      media: {
        borderRadius: 6,
      },
}));

const useStyles1 = makeStyles((theme) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
      },
      avatar: {
        width: 60,
        height: 60,
        margin: 'auto',
      },
      heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
      },
      subheader: {
        fontSize: 14,
    
        marginBottom: '0.875em',
      },
      statLabel: {
        fontSize: 12,
        fontWeight: 500,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
      },
      statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
      },}
));

const UserCard = (props) => {
    const styles = useStyles();
    const shadowStyles = useSoftRiseShadowStyles({ inactive: false });
    const borderedGridStyles = useGutterBorderedGridStyles({
      borderColor: 'rgba(0, 0, 0, 0.08)',
      height: '50%',
    });
    var link
    if (props.user.type==="supplier"){
        link='/supplier/'+props.user.uid
    }else if(props.user.type==="retailer"){
        link='/retailer/'+props.user.uid
    }else{
        link='/profile/'+props.user.uid
    }
    return (
        // <NavLink to={link} >
      <Card className={cx(styles.card, shadowStyles.root)} style={{maxWidth:'500px',marginTop:'-1%'}}>
        <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={6}>
          <Avatar className={styles.avatar} src={props.user.logo} />
          <h3 className={styles.heading}>{props.user.businessName}</h3>
          <span className={styles.subheader}>{props.user.displayName}</span>
          </Grid>
          <Grid item xs={6} style={{textAlign:'right'}}>
              <NavLink to={link}>
          <Button color="primary">Details</Button></NavLink>
          <Button color="primary">Chat</Button>
          </Grid>
          </Grid>
        </CardContent>
        <Divider light />
        <Box display={'flex'}>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Email</p>
            <p className={styles.statValue}>{props.user.email?props.user.email:"Email is not available"}</p>
          </Box>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Phone Number</p>
            <p className={styles.statValue}>{props.user.phoneNumber?props.user.phoneNumber:"Phone Number is not available"}</p>
          </Box>
        </Box>
      </Card>
    //   </NavLink>
    );
};


const ProductCard = (props) => {
    const styles = useStyles();
    console.log(props)
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useSoftRiseShadowStyles({ inactive: false });
    return (
      <Card className={cx(styles.root, shadowStyles.root)}>
        <CardMedia
          className={cx(styles.media, mediaStyles.root)}
          image={
            props.product.cover
          }
        />
        <CardContent className={styles.content}>
          <TextInfoContent
            classes={textCardContentStyles}
            overline={props.product.name}
            heading={props.product.price.unitPrice+"$"}
          />
        </CardContent>
      </Card>
    );
  };
const YourRequestsCard =(props)=>{
    console.log(props)
    var supplier=false
    if (props.request.supplierId===props.currentUser.uid){
        supplier=true
    }
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useSoftRiseShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const handleAccept=(e)=>{
        props.acceptRequest(props.request)
        for(var i=0; i<props.request.productId.length;i++){
            props.registerRetailers(props.request.productId[i])
         
          }
    }
    const handleDecline=(e)=>{
        props.declineRequest(props.request)

    }
    var display
    if(props.request!== undefined&& props.request!==null){
        if(props.request.pending===true){
            display =  supplier?<h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>Requested</h5>:
            <Box>
                <h5 style={{ fontFamily: 'Muli', marginBottom: "20px" }}>Do you want to accept this request?</h5>
                <StyledButton style={{marginRight:'20px'}} onClick={e=>handleAccept(e)}>Accept</StyledButton>
                <StyledButton onClick={e=>handleDecline(e)}>Decline</StyledButton>
            </Box>
        }
        if(props.request.pending===false&&props.request.confirmed===true){
            //accepted
           display = supplier?<h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>The Request is accepted</h5>:<h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>You accepted this request</h5>
        }else if(props.request.pending===false&&props.request.confirmed===false){
            //declined
            display = supplier?<h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>The Request is declined</h5>:<h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>You declined this request</h5>
        }
    }
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={supplier?( "To Retailer: "+ props.requestsdata[props.request.id].retailerId.businessName):("Requested by: "+ props.requestsdata[props.request.id].supplierId.businessName)}
                subheader={ moment(props.request.createdAt.toDate()).fromNow()}
                style={{ background: "linear-gradient(45deg, #019474 30%, #0071AC 90%)", position: "absolute", top: "-3%", left: "3%", width: '400px', }}
            />
            <CardContent className={classes.content} >
                <div style={{marginBottom: "2%",marginTop:"20px"}}>
                <h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>{supplier?"Retailer  Details:":"Supplier Details"}</h5>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    {supplier?<UserCard user={props.requestsdata[props.request.id].retailerId}/>:<UserCard user={props.requestsdata[props.request.id].supplierId}/>}
                    </Grid>
                    <Grid item xs={6}>
                        {display}
                    </Grid>
                </Grid>
                <h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>Product Offered:</h5>
                    <Grid container  spacing={3} >
                    {props.request.productId?props.requestsdata[props.request.id].productId.map((value,key)=>{return(
                        <Grid item xs={3} key={key}>
                        <NavLink to={"/product/"+props.request.productId[key]}>
                        <ProductCard  product = {value}/>
                        </NavLink>
                        </Grid>
                    )}):null}
                    </Grid>
                </div>
            </CardContent>
        </Card>)
}
class MyRequests extends Component{

    
    render(){
        
        return(
        <div style={{paddingBottom:'200px'}}>
            <Container maxWidth="lg" >
            {this.props.requests?this.props.requests.map((request)=><YourRequestsCard 
            key={request.id} 
            request={request} 
            requestsdata={this.props.requestsdata} 
            currentUser={this.props.currentUser}
            acceptRequest={this.props.acceptRequest}
            declineRequest={this.props.declineRequest}
            registerRetailers={this.props.registerRetailers}
            />):null}
            </Container>

        </div>)
    }
}
const populates = [
    { child: 'retailerId', root: 'users' },{ child: 'supplierId', root: 'users' },{child:'productId', root:'products'}
]
const collection = 'requests';
const mapDispatchToProps = dispatch => {
    return {
        acceptRequest: (requests)=>dispatch(acceptRequest(requests)),
        registerRetailers: (productId) => dispatch(registerRetailers(productId)),
        declineRequest: (requests)=>dispatch(declineRequest(requests))
    }
}
const mapStateToProps = (state,ownProps) => {
    console.log(state);
    const requestsdata = populate(state.firestore, collection, populates)
    return {
        auth: state.firebase.auth,
        requestsdata:requestsdata,
        requests: state.firestore.ordered.requests
    }
  };
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>{
        if(props.auth!==undefined){
        return([{
        collection,where:[['retailerId','==',props.auth.uid]],orderBy:[['createdAt','desc']] ,populates  
    },{
        collection,where:[['supplierId','==',props.auth.uid]],orderBy:[['createdAt','desc']], populates  
    }

])}
    else{
        return[]
    }
})
  )(MyRequests)
