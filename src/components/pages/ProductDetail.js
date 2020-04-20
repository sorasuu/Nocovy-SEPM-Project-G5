import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Grid, withStyles, Divider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import StyledButton from '../layout/StyledButton'
import  ProductDetailCard  from '../layout/ProductDetailCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'
import { detailProduct, storeProducts } from './data'

const useStyles = (theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
});

class ProductDetail extends Component {

  state = {
    reports: [],
    students: [],
    reportform: false,
  }
  render() {
    const { classes, auth } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ProductDetailCard product={detailProduct} />
            </Grid>
        </Grid>        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  console.log(state);
  console.log(ownProps)
  return {
    // currentproduct: currentproduct,
    auth: state.firebase.auth,

  }
};

export default compose(
  connect(mapStateToProps),
  // firestoreConnect((props) => {

  // })
)(withStyles(useStyles)(ProductDetail)) 