import React, { Component, useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade, withStyles } from '@material-ui/core/styles'
import {
  Grid, InputBase, Button, Select, MenuItem, InputLabel,
  Tabs, Tab, Collapse, Chip, Input, FormControl,
} from '@material-ui/core'
import SortByAlphaOutlinedIcon from '@material-ui/icons/SortByAlphaOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import ProductCard from '../products/ProductCard'
import SupplierCard from '../supplier/SupplierCard'
import RetailerCard from '../retailer/RetailerCard'
import SearchIcon from '@material-ui/icons/Search';
import { TabPanel, a11yProps } from './AdminDashboard'
import { deliverProductToCart } from '../../store/actions/productAction'

const useStyles = theme => ({
  search: {
    marginTop:'3%',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    display: 'flex',
    border: `1px solid ${'#dfe1e5'}`,
    boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
    borderRadius: 100,
    padding:`${theme.spacing(1)/4}`,
    height: '50px',
    margin:'auto',
    width:'482px'

  },
  searchIcon: {
    marginTop:'-5px',
    padding:`${theme.spacing(1) /2}px ${theme.spacing(1)}px`,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius:100,
    
  },
  inputRoot: {
    color: 'inherit',
    width:'85%',
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
  var data = [{ id: 'Loading...', category: ['a', 'b'], pending: true, name: "Loading", displayName: "Loading", businessName: 'Loading', price: 'Loading' }];
  if (array !== undefined) {
    data = array
  }
  return data
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};
export const allCategories = [
  'beauty',
  'convenience',
  'electronic',
  'fashion',
  'food',
  'vehicle',
  'other',
];

const defaultFilter = [
  { name: 'sortNameAsc', value: false, icon: <SortByAlphaOutlinedIcon />, detail: '(A->z)' },
  { name: 'sortNameDesc', value: false, icon: <SortByAlphaOutlinedIcon />, detail: '(Z->a)' },
  { name: 'sortPriceAsc', value: false, icon: <TrendingUpOutlinedIcon />, detail: '$' },
  { name: 'sortPriceDesc', value: false, icon: <TrendingDownOutlinedIcon />, detail: '$' },
]


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      value: 0,
      isFiltered: false,
      filter: [
        { name: 'sortNameAsc', value: false, icon: <SortByAlphaOutlinedIcon />, detail: '(A->z)' },
        { name: 'sortNameDesc', value: false, icon: <SortByAlphaOutlinedIcon />, detail: '(Z->a)' },
        { name: 'sortPriceAsc', value: false, icon: <TrendingUpOutlinedIcon />, detail: '$' },
        { name: 'sortPriceDesc', value: false, icon: <TrendingDownOutlinedIcon />, detail: '$' },
      ],
      selectedCategories: [],
      cart: [],
      allCategories: allCategories
    };

  }

  onChange = e => {
 
    this.setState({ search: e.target.value })
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });

  }

  handleFilter = () => {
    this.setState({ isFiltered: !this.state.isFiltered })
  }
  handleSelectFilter = (id, item, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ filter: defaultFilter })
    this.setState((prevState) => {
      const data = [...prevState.filter];
      data[id] = { name: item, value: open, icon: data[id].icon, detail: data[id].detail }
      return { filter: data }
    }
    )

  }
  
  handleChangeCategory = (e) => {
    this.setState({ selectedCategories: e.target.value })
  }

  render() {

    const { auth, classes, products, suppliers, retailers, currentUser } = this.props;
    // console.log('dashboard product', products)
    const { search, value, filter, isFiltered, selectedCategories } = this.state;

    const afterSearchSupplier = checkArray(suppliers).filter(supplier => supplier.businessName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const afterSearchProduct = checkArray(products).filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const afterSearchRetailer = checkArray(retailers).filter(retailer => retailer.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const found = checkArray(afterSearchProduct).filter((product) => {
      if (product.category === checkFilter(selectedCategories, product.category)) {
        return true
      } else { return false }

    })
    const sortedFound = found.sort((a, b) => {
      if (filter[0].value === true) {
        console.log('vaooooo 0')
        return a.name.localeCompare(b.name)
      }
      if (filter[1].value === true) {
        console.log('vao 1')
        return -1 * a.name.localeCompare(b.name)
      }
      if (filter[2].value === true) {
        return a.price.unitPrice - b.price.unitPrice
      }
      if (filter[3].value === true) {
        return -1 * (a.price.unitPrice - b.price.unitPrice)
      }
    })


    if (!auth.uid) return <Redirect to='/signin' />


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

        <div style={{ marginTop: '2%' }}>
          <TabPanel value={value} index={0}>

            <Button onClick={this.handleFilter}>Filter <FilterListRoundedIcon/></Button>
            <Collapse className={classes.search} in={this.state.isFiltered} timeout="auto" unmountOnExit >
              <Grid container style={{marginTop:'5%', marginBottom:'5%'}}>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems='center'>
                    <Grid item><InputLabel id="demo-mutiple-chip-label"><em>Select Filter Categories</em></InputLabel></Grid>
                    <Grid item>
                      <Select
                
                        multiple
                        displayEmpty
                        value={this.state.selectedCategories}
                        onChange={this.handleChangeCategory}
                        input={<Input name="category" id='category-chip' />}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} className={classes.chip} />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {allCategories.map((name, key) => (
                          <MenuItem key={key} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                  </Grid>


                </Grid>
                <Grid item xs={12}>
                  {filter.map((option, key) => <Button key={key} onClick={this.handleSelectFilter(key, option.name, !option.value)}>{option.icon}{option.detail}</Button>)}
                </Grid>
              </Grid>
            </Collapse>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="center"
              style={{ marginTop: '30px' }}
            >

              {isFiltered ?
                sortedFound.map((product, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ProductCard
                        key={index}
                        product={product}
                        uid={this.props.auth.uid}
                        handleCart={this.props.handleCart}
                        handelRegister={this.props.handelRegister}
                        currentUser={this.props.currentUser}
                      />
                    </Grid>
                  )
                })

                : afterSearchProduct.map((product, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <ProductCard key={index} product={product} uid={this.props.auth.uid} handleCart={this.props.handleCart} currentUser={this.props.currentUser} handelRegister={this.props.handelRegister} />
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
              justify="flex-start"
              alignItems="center"
            >
              {afterSearchSupplier.map((supplier, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <SupplierCard supplier={supplier} />
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
              justify="flex-start"
              alignItems="center"
            >
              {afterSearchRetailer.map((retailer, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <RetailerCard retailer={retailer} currentUser={currentUser} />
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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'products' },
    
    { collection: 'users', where: [["type", "==", "supplier"], [['verify', '==', true]] ], storeAs: 'suppliers' },
    { collection: 'users', where: [["type", "==", "retailer"], [['verify', '==', true]] ], storeAs: 'retailers' },

  ]),


)(withStyles(useStyles)(Dashboard))