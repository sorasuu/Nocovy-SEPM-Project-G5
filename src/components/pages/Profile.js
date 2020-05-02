import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {InputBase, Container, Typography, Grid, withStyles} from '@material-ui/core'
import WholesalerInfoCard from '../layout/WholesalerInfoCard'
import { firestoreConnect } from 'react-redux-firebase'
import { storeProducts } from "./data"
import AddProductCard from '../layout/AddProductCard'
import ProductCard from '../layout/ProductCard'
import Modal from '@material-ui/core/Modal'
import { Redirect, NavLink } from 'react-router-dom'
import {createProduct } from '../store/actions/productAction'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles'
import storageRef from '../../index'
import { v4 as uuidv4 } from 'uuid'
import {uploadToStorage} from '../store/actions/uploadAction'

const useStyles = theme => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop:"2%",
    // marginRight: theme.spacing(2),
    justify:'center',
    alignItems:'center',
    direction:'flex',
    width:'100%',
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
  }
});
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
    products: storeProducts,
    search:'',
    owner:false,
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
    images: [],
    category:'',
    progress: 0,
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
  }

  handleCatChange = input => e => {
    this.setState({ [input]: e.target.value })
    console.log(this.state)
    //Write function to parse string input into array of tags
  }
  handleChangeImg(files){
    console.log(files)
    this.setState({
      images: files
    });
  }
  handleUpload = (e) => {
    e.preventDefault();
    
    const {images} = this.state;
    console.log(images)
    if(images!== undefined&& images!== null){
        // need a image and a path
        var i;
        for (i in images){

        const file={
           image: images[i],
            path: '/images/productImg/'
        }
        // new upload
        this.props.uploadToStorage(file)
    }
        
    }
}
  formSubmit = () => {
    const product = {supplierId: this.props.auth.uid,
                    productImg: this.props.productImg,
                    name: this.state.productName, 
                    authorName: this.props.user.displayName,
                    detail: ['origin: '+ this.state.productOrigin,
                            'brand:'+ this.state.productBrand], 
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
    this.props.createProduct(product)

  }
  componentDidUpdate(prevProps){
    if (prevProps.auth.uid!== this.props.uid){
    if (this.props.match.params.id=== this.props.auth.uid && this.state.owner ==false){
        this.setState({owner:true})
    }}
    if(this.props.productImg.length=== this.state.images.length&& this.props.productImg.length>0){
      this.formSubmit();
      this.setState({open: false});
    }
  // console.log('??',this.props.certificate)

    // console.log(this.state)
  }
  
  render() {
    const { auth, classes} = this.props;
    const { search, products } = this.state;
    const filteredProducts = products.filter(product =>{
        return product.title.toLowerCase().indexOf(search.toLowerCase())!== -1
    })
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container>
        <WholesalerInfoCard handleOpen={this.handleOpen} info = {this.state} auth={auth} uid ={this.props.match.params.id} />
        <Typography gutterBottom align='center' variant='h3'><text style={{fontWeight:'bold'}}>Products</text></Typography>
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
              onChange={this.handleChange('search')}
            />
          </div>
        <div style={{ marginTop: '3%' }}>
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
        {this.state.owner?
          <Modal style={{}} open={this.state.open} onClose={this.handleClose}>
            <div style={{height:'90%', overflowY: 'auto', maxWidth:700, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%',}}>
              <AddProductCard formSubmit={this.formSubmit} handleChange={this.handleChange} handleCatChange={this.handleCatChange} handleUpload={this.handleUpload} handleChangeImg={this.handleChangeImg.bind(this)}/>
            </div>
          </Modal>:null}
      </Container>
    )
  }
}
var prourls = new Set()
const mapStateToProps = (state,ownProps) => {
  // const id = ownProps.match.params.id;
  console.log(state);
  const users = state.firestore.ordered.currentUser;
  const user = users ? users[0] : null;
  console.log(ownProps)
  const url = state.uploadReducer.url ? state.uploadReducer.url:null
  if(url!==undefined&& url!==null){
    if (url.path==='/images/productImg/'){
      prourls=prourls.add(url.url)
      }}
  console.log(prourls)
  return {
    auth: state.firebase.auth,
    products :  state.firestore.ordered.products,
    productImg: Array.from(prourls),
    progress: state.uploadReducer.progress,
    user: user
    
}};
const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    uploadToStorage:(file)=>dispatch(uploadToStorage(file))
  }
}

export default  compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => {
      return [{ collection: 'products', where:[["supplierId","==", props.match.params.id]]}, { collection: 'users', doc:props.auth.uid,storeAs:'currentUser' }]
  })
)(withStyles(useStyles)(Profile) )