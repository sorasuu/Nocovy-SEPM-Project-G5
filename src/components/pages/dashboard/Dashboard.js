import React, { Component, useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade, withStyles } from '@material-ui/core/styles'
import {
  Grid, InputBase,
  Tabs, Tab, CardContent, Typography,
  CardMedia, Card, Chip
} from '@material-ui/core'
// import StyledButton from '../../layout/StyledButton'
import ProductCard from '../products/ProductCard'
import SupplierCard from '../supplier/SupplierCard'
import RetailerCard from '../retailer/RetailerCard'
import SearchIcon from '@material-ui/icons/Search';
import { TabPanel, a11yProps } from './AdminDashboard'
import FilterForm from './FilterForm'
import {deliverProductToCart}from '../../store/actions/productAction'
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
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  root: {
    display: 'flex',
    maxWidth: '500px',
    justifyContent: 'center',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '300px',
    height: '300px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },

});

function checkFilter(arr, arrCheck) {
  var i
  var arraf = []
  for (i = 0; i < arr.length; i++) {

    if (arrCheck.includes(arr[i])) {
      arraf.push(arr[i])
    } else {
      break
    }
  }
  if (arr.length === arraf.length) {
    return arrCheck
  }
  else { return null }
}


export function checkArray(array) {
  var data = [{ id: 'Loading...', category: ['a', 'b'], pending: true, name: "Loading", displayName: "Loading", businessName: 'Loading', price: 'Loading'}];
  if (array !== undefined) {
    data = array
  }
  return data
}

const allCategories = [
  'fashion',
  'vehicle',
  'luxury',
  'convenience',
  'something',
  'electronic',
  'beauty'
];



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      value: 0,
      filter: [],
      sortName: true,
      sortAsc: true,
      isFiltered: false,
      cart:[]
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSortKind = this.handleSortKind.bind(this)
    // this.handleCart= this.handleCart(this)
  }

  onChange = e => {
    this.setState({ search: e.target.value })
  }
  handleSort = e => {
    this.setState({ sortAsc: !this.state.sortAsc })
  }

  handleSortKind(params){
    this.setState({sortName: !this.state.sortName})
  }

  handleChange(e, newValue) {
    this.setState({ value: newValue });

  }
  handleSelectFilter = (item) => {
    this.setState({ filter: item })
  }
  handleFilterForm = () => {
    this.setState({ isFiltered: true })
  }
  handleCancelFilter =()=>{
    this.setState({ isFiltered: false})
  }
  render() {
    
    const { auth, classes, products, suppliers, retailers } = this.props;
    // console.log('dashboard product', products)
    const { search, value, filter, sortAsc, isFiltered, sortName, cart } = this.state;
    
    const afterSearchSupplier = checkArray(suppliers).filter(supplier => supplier.businessName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const afterSearchProduct = checkArray(products).filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const afterSearchRetailer = checkArray(retailers).filter(retailer => retailer.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const found = checkArray(afterSearchProduct).filter((product) => {
      if (product.category === checkFilter(filter, product.category)) {
        return true
      } else { return false }

    })
    const sortFoundName = found.sort((a, b) => {
      const isReverse = (sortAsc === true) ? 1 : -1;
      return isReverse * a.name.localeCompare(b.name)
    })

    const sortFoundPrice = found.sort((a,b) => {
      const isReverse = (sortAsc === true) ? 1: -1;
      return isReverse * ( a.price.unitPrice - b.price.unitPrice)
    }
    )

    if (!auth.uid) return <Redirect to='/signin' />
    // console.log('asdasd',this.state)
    return (

      <div className="container" style={{ textAlign: 'center' }}>

        <h1 style={{ fontFamily: 'Muli', marginBottom: "5%" }}>Welcome To Nocovy</h1>
        <br />
        <br />
        <Tabs
          orientation="horizontal"
          value={value}
          onChange={this.handleChange}
          className={classes.tabs}
          justify="center"
        >
          <Tab label="Product List" {...a11yProps(0)} />
          <Tab label="Supplier List" {...a11yProps(1)} />
          <Tab label="Retailer List" {...a11yProps(2)} />
        </Tabs>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={this.onChange}
          />
        </div>

        <div style={{ marginTop: '10%' }}>
          <TabPanel value={value} index={0}>

            <FilterForm products={products}
              allCategories={allCategories}
              handleFilter={item => this.handleSelectFilter(item)}
              handleFilterForm={this.handleFilterForm}
              handleCancelFilter={this.handleCancelFilter}
              handleSort={this.handleSort}
              handleSortKind={this.handleSortKind}
              sortName={sortName}
              sortAsc={sortAsc}
            />
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="flex-start"
              style={{ marginTop: '30px' }}
            >

              {isFiltered ? 
              <>  
              {
                sortName ?
                sortFoundName.map((product, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={4}key={index}>
                     <ProductCard product={product} uid ={this.props.auth.uid} handleCart={this.props.handleCart}/>
                  </Grid>
                )
                })
              : sortFoundPrice.map((product, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
                    <ProductCard key={index} product={product} uid ={this.props.auth.uid} handleCart={this.props.handleCart}/>
               
                  </Grid>
                )
              })
              }
              </>
              : afterSearchProduct.map((product, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                     <ProductCard key ={index} product={product} uid ={this.props.auth.uid} handleCart={this.props.handleCart} currentUser ={ this.props.currentUser}/>
                  </Grid>
                )
              })}

            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              {afterSearchSupplier.map((supplier, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                     <SupplierCard supplier={supplier}/>
                  </Grid>
                  
                )

              })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              {afterSearchRetailer.map((retailer, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                      <RetailerCard retailer={retailer}/>
                  </Grid>
                )

              })}
            </Grid>
          </TabPanel>
        </div>
      </div>

    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deliverProductToCart: cart => dispatch(deliverProductToCart(cart)),
  };
};

const mapStateToProps = (state) => {
  const users = state.firestore.ordered.currentUser
  const currentUser = users ? users[0] : null
  return {
    currentUser: currentUser,
    auth: state.firebase.auth,
    products: state.firestore.ordered.products,
    suppliers: state.firestore.ordered.suppliers,
    retailers: state.firestore.ordered.retailers
  
  }
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'products'},
    { collection: 'users', where: [["type", "==", "supplier"]], storeAs: 'suppliers' },
    { collection: 'users', where: [["type", "==", "retailer"]], storeAs: 'retailers' },

  ]),


)(withStyles(useStyles)(Dashboard))