import React, { Component } from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Container, Grid,Button } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment'
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

const useStyles1 = makeStyles(({  }) => ({
    root: {
      minWidth: 100,
      padding: 0,
     textAlign:'right',
     marginTop:'2%'
    },
    tag: {
      borderRadius: '0 3px 3px 0',
      background: '#FFFFFF',
      borderLeft: `3px solid red `,
      fontWeight: 'bold',
      padding: '8px 16px',
    
    },
  }));
  const InsideLeftLineTag = (props) => {
    const classes = useStyles1();

    return (
      <div className={classes.root}>
        <Button className={classes.tag} disabled={true} style={{color:'black'}}>Total Price: {props.totalPrice?props.totalPrice:null}$</Button>
      </div>
    );
  };
const ProductCard = (props) => {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: false });
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
            body={
            "Quantity: "+ props.product.num
            }
          />
        </CardContent>
      </Card>
    );
  };
const YourOrdrerCard =(props)=>{

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    var totalPrice=null;
        if(props.order!==undefined&& props.order!== null){
            for (var i=0;i<props.order.orders.length;i++) {
              totalPrice= totalPrice+(props.order.orders[i].price.unitPrice*props.order.orders[i].num)
            }
            console.log(totalPrice)
        }
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Order: "+props.order.id}
                subheader={ moment(props.order.createdAt.toDate()).fromNow()}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-3%", left: "3%", width: '400px', }}
            />
            <CardContent className={classes.content} >
                <div style={{marginBottom: "2%",marginTop:"20px"}}>
                <h5 style={{ fontFamily: 'Muli', marginBottom: "2%" }}>Product Ordered:</h5>
                    <Grid container  spacing={3} >
                    {props.order?props.order.orders.map(order=>{return(
                        <Grid item xs={3} key={order.id}>
                        <NavLink to={"/product/"+order.id}>
                        <ProductCard  product = {order}/>
                        </NavLink>
                        </Grid>
                    )}):null}
                    </Grid>
                    <div >
                    <InsideLeftLineTag  totalPrice={totalPrice}/></div>
                </div>
            </CardContent>
        </Card>)
}
class MyOrders extends Component{

    
    render(){
        
        return(
        <div style={{paddingBottom:'200px'}}>
            <Container maxWidth="lg" >
            {this.props.orders?this.props.orders.map((order)=><YourOrdrerCard key={order.id} order={order} />):null}


            </Container>

        </div>)
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log(state);

    return {
        auth: state.firebase.auth,
        orders: state.firestore.ordered.orders
    }
  };
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props)=>{return([{
        collection: 'users',
        doc: props.auth.uid,

        // THIS IS BREAKING THE PAGE
        subcollections: [{ collection: 'orders' }],
        orderBy: ['createdAt', 'desc'],
        storeAs: 'orders'
    }])})
  )(MyOrders)
