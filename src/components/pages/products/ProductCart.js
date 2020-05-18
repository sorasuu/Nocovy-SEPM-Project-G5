import React, { Component, useState } from 'react'
import { createCheckout } from '../../store/actions/transactionAction'
import StyledButton from '../../layout/StyledButton'
import {
  Card, CardContent, Grid, withStyles,
  Table, TableHead, TableBody, Button,
  TableRow, TableCell, Input, Dialog,
  DialogTitle, DialogContent, DialogActions, CardHeader
} from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
const useStyles = theme => ({
  root: {
    display: 'flex',
    margin: '2%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    display: 'block',
    width: '200px',
  },
  popover: {
    pointerEvents: 'none',
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
   
     JSON.parse(window.localStorage.getItem('cart')).map(item => this.state.number.push(item.num))
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

  handleOrder(e) {
    this.props.createCheckout(this.state.cart)
    localStorage.removeItem('cart');
    this.setState({ cart: [] })
  }
  handleChange(e, index) {
    let numbers = [...this.state.number];
    numbers[index] =  e.target.value;
    this.setState({ number: numbers })
  }

  render() {

    const classes = useStyles();

    const { cart, number } = this.state
    console.log("cartt", cart)
    return (
      <>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cart</h1>
        {cart ?
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
                    
                      <Table style={{ display: 'block', overflowX: 'auto' }}
                      >
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
                                InputProps={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                                onChange={e => this.handleChange(e, key)}
                              />

                            </Grid>
                          </TableCell>
                          <TableCell> $ {(item.price.unitPrice * number[key]).toLocaleString()}</TableCell>
                          <TableCell><Button variant="outlined" color="secondary" >Remove</Button></TableCell>
                        </TableBody>
                      </Table>
                    

                  </Grid>
                </Grid>
              </Grid>
              
              </CardContent>
            </Card>

          )

          : <p>cart empty</p>
        }
{cart ?<StyledButton onClick={(e) => this.handleOrder(e)} >Place Order</StyledButton>:null}
       
      </>
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <img style={{ minWidth:'50px', width: `${props.maxWidth}` }} src={props.image.cover} />
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