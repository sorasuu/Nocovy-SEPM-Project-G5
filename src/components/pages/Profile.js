import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {Paper, Container, Typography, Grid} from '@material-ui/core'
import WholesalerInfoCard from '../layout/WholesalerInfoCard'
import { storeProducts } from "./data"
import AddProductCard from '../layout/AddProductCard'
import ProductCard from '../layout/ProductCard'
import Modal from '@material-ui/core/Modal';

class Profile extends Component {
  state={
    open:false,
    businessName: 'Coastal Designs Décor',
    phoneNumber: '+61 02 4954 4100',
    address: 'Unit 3/339 Hillsborough Road Warners Bay NSW',
    website: 'http://www.coastaldesigns.com.au',
    businessGenre: 'Handmade Products, Home Decor, Licensed Products, Nostalgic Gifts, Woodware',
    description: `Originally Established in 1985, Coastal Designs Decor is a long established and experienced Australian wholesale distribution business.
    Our main products are Home decorating accessories in the form of Volkswagen memorabilia, such as VW Beetle and VW Kombi or beach theme and coastal designs like:- Lighthouses Anchors, oars, paddles, beach girl figurines, pelicans, starfish, shells etc.
    Product lines include Photo frames, money boxes, wall plaques, book boxes, trinket boxes, candle holders, tea light holders, wall art including shadow boxes, shell theme products`,
    productName:'',
    productBrand:'',
    productOrigin:'',
    productDesc:'',
    productCategories: ['',''],
    dutyCost:0,
    dutyRate:0,
    FOB:'',
    freightCost:0,
    freightDesc:'',
    freightRate:'',
    landedCost:0,
    margin:'',
    miscCost:0,
    unitCost:0,
    unitPrice:0,
    image: '',
  }

  handleOpen = () => {
    this.setState({open: true});
    console.log(this.state.open)
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value })
    console.log(this.state)
  }

  handleCatChange = input => e => {
    this.setState({ [input]: e.target.value })
    console.log(this.state)
    //Write function to parse string input into array of tags
  }

  formSubmit = () => {
    const product = {supplierId: '', 
                    name: this.state.productName, 
                    detail: {origin: this.state.productOrigin,
                            brand: this.state.productBrand}, 
                    description: this.state.productDesc, 
                    category: this.state.category, 
                    price: {dutyCost: this.state.dutyCost,
                            dutyRate: this.state.dutyRate,
                            FOB: this.state.FOB,
                            freightCost: this.state.freightCost,
                            freightDesc: this.state.freightDesc,
                            freightRate: this.state.freightRate,
                            landedCost: this.state.landedCost,
                            margin: this.state.margin,
                            miscCost: this.state.miscCost,
                            unitCost: this.state.unitCost,
                            unitPrice: this.state.unitPrice}}
    console.log(product)
    //Form submit functions go here
  }


  render() {
    return (
      <Container>
        <WholesalerInfoCard handleOpen={this.handleOpen} info = {this.state}/>
        <Typography gutterBottom align='center' variant='h3'><text style={{fontWeight:'bold'}}>Products</text></Typography>
        <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"       
          >
           {storeProducts?storeProducts.map(product=>{
             return(
              <Grid item xs={12} sm={6} md={4}  key={product.id}>
             <ProductCard  product={product}/>
          </Grid>
          )}):<h5>Loading...</h5>}</Grid>
          <Modal style={{}} open={this.state.open} onClose={this.handleClose}>
            <div style={{height:'90%', overflowY: 'auto', maxWidth:700, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%',}}>
              <AddProductCard formSubmit={this.formSubmit} handleChange={this.handleChange} handleCatChange={this.handleCatChange}/>
            </div>
          </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log(state);
  console.log(ownProps)
  return {

}};

export default  compose(
  connect(mapStateToProps),
  // firestoreConnect((props) => {

  // })
)(Profile) 