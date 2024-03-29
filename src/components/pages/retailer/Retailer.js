import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import cx from 'clsx';
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade } from '@material-ui/core/styles'
import {
  Container, Grid, withStyles, Card, CardActionArea, CardMedia,
  CardContent, Typography, CardActions, Button
} from '@material-ui/core'
import RetailerDetail from './RetailerDetail'
import { CardHeader } from 'material-ui'
import RetailerDetailCard from './RetailerDetailCard'


const useStyles = theme => ({

  root: {
    justify: 'center',
    alignItems: 'center',
    direction: 'flex',
    maxWidth: '100',
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
      <Container style={{ marginTop: '2%' }}>
        {retailer?
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={3} md={3} lg={3}>
              <RetailerDetailCard info={retailer} viewer={auth} currentUser={this.props.currentUser}/>
            </Grid>
            <Grid className={classes.root} item xs={9} md={9} lg={9}>
                <RetailerDetail 
                  retailer={retailer}
                  sellProduct={sellProduct}
                  data={sellProductData}
                />
            </Grid>
          </Grid>
          :null}
      </Container>

    )
  }
}

const populates =[{child:'supplierId',root:'users'}]
const collection= 'products'
// const collection = 'users'

const mapStateToProps = (state, ownProps) => {
  // console.log('state trong retailer', state)
  const retailers = state.firestore.ordered.retailer
  const retailer = retailers? retailers[0]:null;
  const sellProductData = populate(state.firestore,'sellList',populates)
  const sellProduct = state.firestore.ordered.sellList
  const users = state.firestore.ordered.currentUser
  const currentUser = users ? users[0] : null
 
  return {
    auth: state.firebase.auth,
    retailer: retailer,
    sellProduct: sellProduct,
    sellProductData: sellProductData,
    currentUser: currentUser
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