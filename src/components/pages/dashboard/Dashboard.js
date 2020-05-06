import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fade } from '@material-ui/core/styles'
import { Grid, InputBase, withStyles, Tabs, Tab, CardContent, Typography, CardMedia, Card } from '@material-ui/core'
import StyledButton from '../../layout/StyledButton'
import ProductCard from '../products/ProductCard'
import SearchIcon from '@material-ui/icons/Search';
import { TabPanel, a11yProps } from './AdminDashboard'
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

export function checkArray(array) {
  var data = [{pending:true,product:"No Product", name:"wrong", displayName: "wrong", businessName: 'wrong' }];
  if (array !== undefined) {
    data = array
  }
  return data
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  onChange = e => {
    this.setState({ search: e.target.value })
  }

  handleChange(e, newValue) {
    this.setState({ value: newValue });

  }

  render() {
    const { auth, classes, products, suppliers, retailers } = this.props;
    const { search, value } = this.state;
    console.log('suppliers', suppliers)
    console.log('retailers', retailers)

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
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >

              {checkArray(products).filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((product, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard product={product} />
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
              alignItems="center"
            >
              {checkArray(suppliers).filter(supplier => supplier.businessName.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((supplier, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>

                    <Card className={classes.root}>
                      <CardMedia
                        className={classes.cover}
                        image={supplier.logo}
                        title="Live from space album cover"
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                            {supplier.businessName}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {supplier.email}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {supplier.address}
                          </Typography>
                        </CardContent>

                      </div>
                      <div>
                          <NavLink to = {'/supplier/'+ supplier.id}>
                              <button>Detail</button>
                          </NavLink>
                        </div>
                    </Card>
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
              alignItems="center"
            >
              {checkArray(retailers).filter(retailer => retailer.businessName.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((retailer, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>

                    <Card className={classes.root}>
                      <CardMedia
                        className={classes.cover}
                        image={retailer.logo}
                        title="Live from space album cover"
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                            {retailer.displayName}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {retailer.email}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {retailer.address}
                          </Typography>
                        </CardContent>

                      </div>
                      <div>
                          <NavLink to = {'/retailer/'+ retailer.id}>
                              <button>Detail</button>
                          </NavLink>
                        </div>
                    </Card>
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    products: state.firestore.ordered.products,
    suppliers: state.firestore.ordered.suppliers,
    retailers: state.firestore.ordered.retailers
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'products' },
    { collection: 'users', where: [["type", "==", "supplier"]], storeAs: 'suppliers' },
    { collection: 'users', where: [["type", "==", "retailer"]], storeAs: 'retailers' }
  ]),
  

)(withStyles(useStyles)(Dashboard))