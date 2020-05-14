import React, { Component, useState } from 'react'
import { createCheckout } from '../../store/actions/transactionAction'
import StyledButton from '../../layout/StyledButton'
import {
  Card, CardContent, Grid, withStyles,
  Table, TableHead, TableBody, Button,
  TableRow, TableCell, Input,Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

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
  constructor(props){
    super(props);
    this.state = {
      cart: [],
      number: [],
      open: false ,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose= this.handleClose.bind(this)  
  }
   componentDidMount() {
    this.setState({ cart: JSON.parse(window.localStorage.getItem('cart')) });
    JSON.parse(window.localStorage.getItem('cart')).map(item => this.state.number.push(item.num))
   
  }
  handleOpen(){
    this.setState({open: true})
  }
  handleClose(){
    this.setState({open: false})
  }

  handleOrder(e) {
    this.props.createCheckout(this.state.cart)
    localStorage.removeItem('cart');
    this.setState({ cart: [] })
  }
  handleChange(e) {
    this.setState({ number: e.target.value })
  }
  buyMore(index) {

    this.setState({ number: this.state.number[index] + 1 })
  }

  buyLess(index) {
    if (this.state.number > 0) {
      this.setState({ number: this.state.number[index] - 1 })
    }
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
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={2}>
                  <ImageDialog title={item.name} cover={item.cover} maxWidth='200px'/>
                </Grid>
                <Grid item xs={10}>
                  <Grid className={classes.details}>
                    <CardContent className={classes.content}>
                      <Table style={{ display: 'block', overflowX: 'auto' }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell> Item </TableCell>
                            <TableCell> ID </TableCell>
                            <TableCell>Author Name</TableCell>
                            <TableCell>Author Email</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Cost</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell>{item.name}</TableCell>
                          <TableCell style={{ width: '30px' }}>{item.id}</TableCell>
                          <TableCell>{item.authorName}</TableCell>
                          <TableCell>{item.authorEmail}</TableCell>
                          <TableCell>{item.price.unitPrice.toLocaleString()} VND</TableCell>
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
                                onChange={e => this.handleChange(e)}
                              />

                            </Grid>
                          </TableCell>
                          <TableCell>{item.price.unitPrice * number[key]} </TableCell>
                        </TableBody>
                      </Table>
                      </CardContent>
                    
                  </Grid>
                </Grid>
              </Grid>

            </Card>

          )

          : <p>cart empty</p>
        }

        <StyledButton onClick={(e) => this.handleOrder(e)} >Place Order</StyledButton>
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
              <img style={{ width: 'fit-content', maxWidth: `${props.maxWidth}` }} src={props.cover} />
          </Button>
          <Dialog
              style={{ width: 'fit-content', direction: 'flex' }}
              fullWidth={true}
              maxWidth={'md'}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
          >
              <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
              <DialogContent>
                  <Grid container>
                    <img src={props.cover} />
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
  firestoreConnect((props) => {
    if (!props.auth.uid) {
      props.history.push("/")
    }
    else {
      return [
        { collection: 'users' },
        // { collection: 'users', where:[["pending","==",true]], storeAs:'usersPending' },
        // { collection: 'users', where:[["pending","==",false]], storeAs:'usersApprove' },

      ]
    }
  })
)(withStyles(useStyles)(ProductCart))