import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade } from '@material-ui/core/styles'
import { Grid, InputBase, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import ProductCard from '../layout/ProductCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'
import { storeProducts } from "./data"
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = theme => ({


  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop: "2%",
    // marginRight: theme.spacing(2),
    justify: 'center',
    alignItems: 'center',
    direction: 'flex',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },

  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: fade(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  },
  marginTop: "2%",
  // marginRight: theme.spacing(2),
  justify: 'center',
  alignItems: 'center',
  direction: 'flex',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
});

class Dashboard extends Component {
  state = {
    products: storeProducts,
    search: ''
  }

  onChange = e => {
    this.setState({ search: e.target.value })
  }



  render() {
    const { auth, classes } = this.props;
    const { search, products } = this.state;
    const filteredProducts = products.filter(product => {
      return product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

    // const sortedProducts = products.filter(product =>{
    //   return product.category 
    // })


  
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="container" style={{ textAlign: 'center' }}>

        <h1 style={{ fontFamily: 'Muli', marginBottom: "5%" }}>Welcome To Nocovy</h1>
        <NavLink to="/reports" style={{ marginRight: "2%", marginBottom: "2%" }}>
          <StyledButton>Product Report</StyledButton>
        </NavLink>
        <NavLink to="/products" style={{ marginBottom: "2%" }}>
          <StyledButton>Product Management</StyledButton>
        </NavLink>
        <br />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase xs={6}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={this.onChange}
          />

        </div>
        <div className={classes.filter}>
          <InputLabel id="category" xs={6}>Catergory</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={products.category}
            onChange={this.onChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Motor"}>Motor</MenuItem>
            <MenuItem value={"Camera"}>Camera</MenuItem>

            {/* Query */}

          </Select>
        </div>
        <div style={{ marginTop: '10%' }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {products ? filteredProducts.map(product => {
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              )
            }) : <h5>Loading...</h5>}</Grid>

        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  // console.log("haha", state.product);
  return {
    auth: state.firebase.auth,
  }
};

export default compose(
  connect(mapStateToProps),
  // firestoreConnect([

  // ])
)(withStyles(useStyles)(Dashboard))