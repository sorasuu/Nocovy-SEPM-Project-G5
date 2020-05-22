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
import { Container, Grid } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import CardMedia from '@material-ui/core/CardMedia';

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
const ProductCard = (props) => {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
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
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Order: "+props.order.id}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-5%", left: "5%", width: '400px', }}
            />
            <CardContent className={classes.content} >
                <div >
                    <Grid container  spacing={3}>
                    {props.order?props.order.orders.map(order=>{return(
                        <Grid item xs={4}>
                        <ProductCard key={order.id} product = {order}/>
                        </Grid>
                    )}):null}
                    </Grid>
                </div>
            </CardContent>
        </Card>)
}
class MyOrders extends Component{

    
    render(){
        
        console.log(this.props)
        return(
        <div>
            <Container>
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
