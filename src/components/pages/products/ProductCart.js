import React, { Component, useState } from 'react'
import { createCheckout } from '../../store/actions/transactionAction'
import StyledButton from '../../layout/StyledButton'
import AmountSelector from '../../layout/AmountSelector'
import {
  withStyles,
  Card, CardContent, CardHeader,
  Grid,
  Table, TableHead, TableBody, TableRow, TableCell,
  Button,
  Input, Dialog, DialogTitle, DialogContent, DialogActions,
  Container,
  Typography, Box, TableContainer, IconButton
} from '@material-ui/core'
import { NavLink,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import CartCard from './CartCard'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = theme => ({
  root: {
    display: 'flex',
    margin: '2%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    display: 'block',
    width: '200px',
  },
  popover: {
    pointerEvents: 'none',
  },
  card: {
    display: 'flex',
    marginTop: "1%",
    overflow: 'initial',
    background: '#ffffff',
    borderRadius: 16,
    height:'100%'
  },
  content: {
    display:'flex',
    flexDirection:'column',
    margin: "2%",
    width:'100%'
  },
  container: {
    maxHeight: '100%',
  },
});

class ProductCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      number: [],
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    if( JSON.parse(window.localStorage.getItem('cart'))!== undefined&&JSON.parse(window.localStorage.getItem('cart'))!== null){
    this.setState({ cart: JSON.parse(window.localStorage.getItem('cart')) });
   
  }else{
    this.setState({cart:null})
  }
}
  handleOpen() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleRemove=(e,index)=>{
    let cart = [...this.state.cart];
    cart.splice(index, 1);
    this.setState({ cart: cart })
    this.props.handleNewCart(e,cart)
    localStorage.setItem('cart', JSON.stringify(cart));
    
  }

  handleOrder(e) {
    this.props.createCheckout(this.state.cart)
    localStorage.removeItem('cart');
    this.props.handleEmptyCart(e)
    this.setState({ cart: [] })
  }

  plusOne(e, index) {
    let cart = [...this.state.cart];
    if (Number(cart[index].num) + 1 >= 1) {
      cart[index].num =  Number(cart[index].num) + 1;
    }else {
      cart[index].num =  1
    }
    this.setState({ cart: cart })
    this.props.handleNewCart(e,cart)
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  minusOne(e, index) {
    let cart = [...this.state.cart];
    if (Number(cart[index].num) - 1 >= 1) {
      cart[index].num =  Number(cart[index].num) - 1;
    }else {
      cart[index].num =  1
    }
    this.setState({ cart: cart })
    this.props.handleNewCart(e,cart)
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  //This method is making users lose focus on the input everytime it's called. Don't know how to fix it
  handleChange(e, index) {
    let cart = [...this.state.cart];
    if (e.target.value >= 1) {
      cart[index].num =  e.target.value;
    }
    else {
      cart[index].num =  1
    }
    this.setState({ cart: cart })
    this.props.handleNewCart(e,cart)
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  render() {
    const classes = useStyles();
    if (!this.props.auth.uid) return <Redirect to='/signin' />
    const { cart } = this.state
    console.log("cart", cart)
    return (
      <Container>
        <div style={{maxHeight:'80vh'}}>
          <Typography variant='h2'>Cart</Typography>
          {/* Here be dragons. For some fucking reason, classes aren't working */}
          <Card className={classes.card} style={{
            display: 'flex',
            marginTop: "1%",
            overflow: 'initial',
            background: '#ffffff',
            borderRadius: 16,
            height:'100%'
          }}>
            <CardContent className={classes.content} style={{
              display:'flex',
              flexDirection:'column',
              margin: "2%",
              width:'100%'
            }}>
              {cart&&cart.length!==0 ?
                <div>
                <TableContainer className={classes.container} style={{
                  maxHeight:'55vh',
                  marginBottom:'2%'
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left' style={{ minWidth: 400 }}><Typography><Box fontWeight='Bold'>Product</Box></Typography></TableCell>
                                <TableCell align='left'><Box fontWeight='Bold'>Unit Price</Box></TableCell>
                                <TableCell align='left'><Box fontWeight='Bold'>Quantity</Box></TableCell>
                                <TableCell align='left'><Box fontWeight='Bold'>Total Price</Box></TableCell>
                                <TableCell align='right'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item, key) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell align='left'>
                                          <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="center"
                                          >
                                            <ImageDialog title={item.name} image={item}/>
                                            <Grid style={{marginLeft:20}}>
                                              <Typography variant='h6'><Box>{item.name}</Box></Typography>
                                              <Typography variant='subtitle2'><Box>Seller: {item.authorName}</Box></Typography>
                                            </Grid>
                                          </Grid>
                                        </TableCell>
                                        {/* <TableCell align='left'>{item.authorName}</TableCell> */}
                                        <TableCell align='left'>$ {item.price.unitPrice.toLocaleString()}</TableCell>
                                        <TableCell align='left'>
                                          <AmountSelector minusOne = {e =>  this.minusOne(e, key)} plusOne={e =>  this.plusOne(e, key)} key={key} value={item.num} onChange={e => this.handleChange(e, key)}/>
                                          {/* <Input
                                            required='true'
                                            disableUnderline="true"
                                            type='number'
                                            value={item.num}
                                            onChange={e => this.handleChange(e, key)}
                                          /> */}
                                        </TableCell>
                                        <TableCell align='left'>$ {(item.price.unitPrice * cart[key].num).toLocaleString()}</TableCell>
                                        <TableCell><IconButton onClick={e=>this.handleRemove(e,key)}><ClearIcon/></IconButton></TableCell>
                                    </TableRow>
                                );
                             })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Typography variant='h6'>Total:</Typography>
                  {/* Here be dragons? */}
                  <Typography paragraph variant='h4'>$ {Math.round(((cart.length>0)? cart.map(item => (Number(item.price.unitPrice) * Number(item.num))).reduce((prev, next) => prev + next) : 0 + Number.EPSILON) * 100) / 100}</Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                >
                     <NavLink to="/">
                    <StyledButton href='/' startIcon={<ArrowBackIcon/>}>Continue Shopping</StyledButton></NavLink>
                    <StyledButton onClick={(e) => this.handleOrder(e)} startIcon={<ShoppingCartIcon/>}>Place Order</StyledButton>
                </Grid>
                </div>
                : 
                <Grid >
                  <Typography paragraph variant='h4'>Your cart is currently empty</Typography>
                  <Typography paragraph variant='h4'>Add an item to your cart to see it</Typography>
                  <NavLink to="/">
                  <StyledButton  startIcon={<ArrowBackIcon/>}>Return to the dashboard</StyledButton></NavLink>
                </Grid>
              }
            </CardContent>
        </Card>
        </div>


        {/* <Typography variant='h4'>------ BELOW THIS IS OLD CODE ------</Typography>
        {cart&&cart.length!==0 ?
          cart.map((item, key) =>
            <Card
              key={key}
              style={classes.root}
            >
              <CardHeader 
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", width: 'auto', minWidth: '200px', marginLeft:"30px", color:'white'  }}
                title={item.name}/>
              <CardContent className={classes.content} style={{paddingTop:'5%'}}>
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={2}>
                  <ImageDialog title={item.name} image={item} maxWidth='200px' />
                </Grid>
                <Grid style={{marginLeft:'50px'}}item xs={9}>
                  <Grid className={classes.details}>             
                      <Table style={{ display: 'block', overflowX: 'auto' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell> ID </TableCell>
                            <TableCell>Author Name</TableCell>
                            <TableCell>Author Email</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>   
                          <TableCell style={{ width: '30px' }}>{item.id}</TableCell>
                          <TableCell>{item.authorName}</TableCell>
                          <TableCell>{item.authorEmail}</TableCell>
                          <TableCell>$ {item.price.unitPrice.toLocaleString()} </TableCell>
                          <TableCell>
                            <Grid container direction='row' justify='space-between' alignItems="center">
                              <Input
                                style={{ width: '20px' }}
                                disableUnderline="true"
                                defaultValue={item.num}
                                inputProps={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                                onChange={e => this.handleChange(e, key)}
                              />
                            </Grid>
                          </TableCell>
                          <TableCell>$ {(item.price.unitPrice * cart[key].num).toLocaleString()}</TableCell>
                          <TableCell><Button variant="outlined" color="secondary"  onClick={e=>this.handleRemove(e,key)} >Remove</Button></TableCell>
                        </TableBody>
                      </Table>
                  </Grid>
                </Grid>
              </Grid>     
              </CardContent>
            </Card>
          )
          : <div><h4>Your Cart Empty</h4>
          <h2><NavLink to='/'><Button>Make Purchase Now ^^!</Button></NavLink></h2></div>
        }
      {cart&&cart.length!==0  ?<StyledButton onClick={(e) => this.handleOrder(e)} >Place Order</StyledButton>:null} */}
      </Container>
    )
  }
}

function ImageDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <img style={{ minWidth:'50px', width: '8vh', height:'8vh', objectFit:'cover' }} src={props.image.cover} />
      </Button>
      <Dialog
        style={{ width: 'fit-content', direction: 'flex' }}
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Product: {props.title}</DialogTitle>
        <DialogContent>
          <Grid container direction='row' >
            <Grid item>
              <div style={{ fontSize: '20px' }}>Detail Pictures</div>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction='row'>
                {props.image.productImg.map((image, key) =>
                  <Grid key={key} item xs={4}>
                    <img style={{ width: 'fit-content', maxWidth:'300px' }} src={image} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}




const mapDispatchToProps = dispatch => {
  return {
    createCheckout: cart => dispatch(createCheckout(cart)),
  };
};

const mapStateToProps = (state) => {

  return {
    auth: state.firebase.auth,

  }
};



export default compose(

   connect(mapStateToProps, mapDispatchToProps),
)(withStyles(useStyles)(ProductCart))