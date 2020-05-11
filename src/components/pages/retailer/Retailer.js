import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade } from '@material-ui/core/styles'
import {
  Grid, withStyles, Card, CardActionArea, CardMedia,
  CardContent, Typography, CardActions, Button
} from '@material-ui/core'
import RetailerDetail from './RetailerDetail'


const useStyles = theme => ({

  root: {
    justify: 'center',
    alignItems: 'center',
    direction: 'flex',
    maxWidth: '100',
  },
 
  media: {
    padding: '2% 1% 1% 1%',
    justify: 'center',
    alignItems: 'center',
    direction: 'flex',
  },
  img: {
    width: 100,
    height: 100
  },
  
  paper: {
    padding: theme.spacing(2),
  },
});

class Retailer extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  
  handleClose = () => {
    this.setState({ anchorEl: null})
  }

  onChange = e => {
    this.setState({ search: e.target.value })
  }

  render() {

    const { auth, classes, retailer , sellProduct, sellProductData} = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl)
    const id = open ? 'popover' : undefined;
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ marginTop: '10%' }}>
        {retailer?
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={4} md={4} lg={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}

                    title="Contemplative Reptile"
                  ><img src={retailer.logo} /></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {retailer.displayName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Hello, Im selling vehicles in Vietnam
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid
                    container
                    justify='space-between'
                  >
                    <Button size="small" color="primary">
                      haha
                  </Button>
                    <Button size="small" color="primary">
                      hoho
                  </Button>
                  </Grid>

                </CardActions>
              </Card>

            </Grid>
            <Grid className={classes.root} item xs={8} md={8} lg={8}>
                <RetailerDetail 
                  retailer={retailer}
                  sellProduct={sellProduct}
                  data={sellProductData}
                />
            </Grid>
          </Grid>
          :null}
        </div>
      </div>

    )
  }
}

const populates=[{child:'supplierId',root:'users'}]
const collection= 'products'
// const collection = 'users'

const mapStateToProps = (state, ownProps) => {
  const retailers = state.firestore.ordered.retailer
  const retailer = retailers? retailers[0]:null;
  const sellProductData = populate(state.firestore,'sellList',populates)
  const sellProduct = state.firestore.ordered.sellList
  console.log('hahha', sellProduct)
  return {
    auth: state.firebase.auth,
    retailer: retailer,
    sellProduct: sellProduct,
    sellProductData: sellProductData
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.users)
      return [
        { collection:'users', doc: props.match.params.id, storeAs:'retailer' },
        { collection, where:[['retailerId','array-contains',props.match.params.id]],populates,storeAs:'sellList'}
        
      ];
  })
)(withStyles(useStyles)(Retailer))