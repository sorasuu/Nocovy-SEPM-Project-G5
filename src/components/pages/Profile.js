import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {InputBase, Container, Typography, Grid, withStyles} from '@material-ui/core'
import ProfileInfoCard from './supplier/ProfileInfoCard'
import { firestoreConnect } from 'react-redux-firebase'
import { storeProducts } from "./data"
import AddProductCard from './products/AddProductCard'
import EditProfileCard from '../layout/EditProfileCard'
import ProductCard from './products/ProductCard'
import Modal from '@material-ui/core/Modal'
import { Redirect } from 'react-router-dom'
import {createProduct } from '../store/actions/productAction'
import {editUser } from '../store/actions/userActions'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles'
import {uploadToStorage} from '../store/actions/uploadAction'
import {withRouter} from 'react-router-dom';
import {createChatSession} from '../store/actions/chatActions'

const useStyles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop:"2%",
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
    productOpen:false,
    editOpen:false,
    type: this.props.currentUser.type,
    businessName: this.props.currentUser.businessName,
    phoneNumber: this.props.currentUser.phoneNumber,
    address: this.props.currentUser.address,
    website: this.props.currentUser.website,
    businessGenre: this.props.currentUser.businessGenre,
    businessDesc: this.props.currentUser.businessDesc,
    certificate: this.props.currentUser.certificate,
    wholesaler: this.props.currentUser.wholesaler,
    logo: this.props.currentUser.logo,
    newBusinessName: this.props.currentUser.businessName,
    newPhoneNumber: this.props.currentUser.phoneNumber,
    newAddress: this.props.currentUser.address,
    newWebsite: this.props.currentUser.website,
    newBusinessGenre: this.props.currentUser.businessGenre,
    newDescription: this.props.currentUser.businessDesc,

    //Figure out editing logo and cert later
    newCertificate: '', 
    newLogo: '',


    products: storeProducts,
    search:'',
    step:1,
    owner:false,
    productName:'',
    productBrand:'',
    productOrigin:'',
    productDesc:'',
    productCategories: '',
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
    progress: '',
  }

  handleProductOpen = () => {
    this.setState({productOpen: true});
  }

  handleProductClose = () => {
    this.setState({productOpen: false});
  }

  handleEditOpen = () => {
    this.setState({editOpen: true});
  }

  handleEditClose = () => {
    this.setState({editOpen: false});
  }

  handleChat=(e)=>{
    console.log('go to chat')
    if (this.props.chatexist===true){
      this.props.history.push('/chat/'+this.props.chat[this.props.chatId].id)
    }else{
      const chat={
        id:this.props.auth.uid+this.props.match.params.id,
        chatsesion:[this.props.auth.uid,this.props.match.params.id],
        user1: this.props.auth.uid,
        user2: this.props.match.params.id
      }
      this.props.createChatSession(chat)
    }

  }

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

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    });
  }

  handleUpload = (e) => {
    if (this.state.images.length !== 0){
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
          this.nextStep()
        }   
      }
    }
    else{
      this.nextStep()
    }
  }

  validateForm = () => {
    if(this.state.productName === ''){
      alert('The product name cannot be empty')
      return false
    }
    if(this.state.productName.length > 256){
      alert('The product name must not exceed 256 characters')
      return false
    }
    if(this.state.productBrand === ''){
      alert('The product brand cannot be empty')
      return false
    }
    if(this.state.productBrand.length > 256){
      alert('The product brand must not exceed 256 characters')
      return false
    }
    if(this.state.productOrigin === ''){
      alert('The product origin cannot be empty')
      return false
    }
    if(this.state.productOrigin.length > 256){
      alert('The product origin must not exceed 256 characters')
      return false
    }
    if(this.state.productDesc === ''){
      alert('The product description cannot be empty')
      return false
    }
    if(this.state.productCategories === ''){
      alert('The product category cannot be empty')
      return false
    }
    if(this.state.dutyCost <= 0){
      alert('The product duty cost cannot be negative or zero')
      return false
    }
    if(this.state.dutyRate <= 0){
      alert('The product duty rate cannot be negative or zero')
      return false
    }
    if(this.state.FOB === ''){
      alert('The product FOB point cannot be empty')
      return false
    }
    if(this.state.FOB.length > 256){
      alert('The product FOB point must not exceed 256 characters')
      return false
    }
    if(this.state.freightCost <= 0){
      alert('The product freight cost cannot be negative or zero')
      return false
    }
    if(this.state.freightDesc === ''){
      alert('The product freight description point cannot be empty')
      return false
    }
    if(this.state.freightDesc.length > 256){
      alert('The product freight description  must not exceed 256 characters')
      return false
    }
    if(this.state.freightRate === ''){
      alert('The product freight rate cannot be empty')
      return false
    }
    if(this.state.freightRate.length > 256){
      alert('The product freight rate must not exceed 256 characters')
      return false
    }
    if(this.state.landedCost <= 0){
      alert('The product landed cost cannot be negative or zero')
      return false
    }
    if(this.state.margin === ''){
      alert('The product margin cannot be empty')
      return false
    }
    if(this.state.margin.length > 256){
      alert('The product margin must not exceed 256 characters')
      return false
    }
    if(this.state.miscCost <= 0){
      alert('The product miscellaneous cost cannot be negative or zero')
    }
    if(this.state.unitCost <= 0){
      alert('The product unit cost cannot be negative or zero')
    }
    if(this.state.unitPrice <= 0){
      alert('The product unit price cannot be negative or zero')
    }
    else{
      return true
    }
  }

  formSubmit = () => {
    if (this.validateForm()){
      const product = {
        supplierId: this.props.auth.uid,
        productImg: this.props.productImg,
        name: this.state.productName, 
        authorName: this.props.user.displayName,
        detail: [
          'origin: '+ this.state.productOrigin,
          'brand:'+ this.state.productBrand
        ], 
        description: this.state.productDesc, 
        category: this.state.productCategories, 
        price: {
          dutyCost: this.state.dutyCost,
          dutyRate: this.state.dutyRate,
          FOB: this.state.FOB,
          freightCost: this.state.freightCost,
          freightDesc: this.state.freightDesc,
          freightRate: this.state.freightRate,
          landedCost: this.state.landedCost,
          margin: this.state.margin,
          miscCost: this.state.miscCost,
          unitCost: this.state.unitCost,
          unitPrice: this.state.unitPrice
        }
      }
      //Form submit functions go here
      this.props.createProduct(product)
      this.handleProductClose()
    }
  }

  submitProfileEdit = () => {
    //Replace True with validation
    console.log(this.props.currentUser)
    if (true){
      const newProfileData = {
        id: this.props.currentUser.id,
        businessGenre: this.state.newBusinessGenre, 
        businessName: this.state.newBusinessName,
        businessDesc: this.state.newDescription, 
        phoneNumber: this.state.newPhoneNumber,
        address: this.state.newAddress,
        website: this.state.newWebsite
      }
      //Form submit functions go here
      this.props.editUser(newProfileData)
      this.handleEditClose()
    }
  }

  componentDidMount(){
    if (this.props.match.params.id=== this.props.auth.uid && this.state.owner === false){
        this.setState({owner:true})
    }

  }
  
  render() {
    const { auth, classes} = this.props;
    console.log(this.props)
    const { search, products } = this.state;
    const filteredProducts = products.filter(product =>{
        return product.title.toLowerCase().indexOf(search.toLowerCase())!== -1
    })
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container>
        <div>
        <ProfileInfoCard handleEditOpen={this.handleEditOpen} handleProductOpen={this.handleProductOpen} info = {this.state} auth={auth} uid ={this.props.match.params.id} handleChat={this.handleChat}/>
        <Typography gutterBottom style={{fontWeight:'bold'}} align='center' variant='h3'>Products</Typography>
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
          <Modal open={this.state.productOpen} onClose={this.handleProductClose}>
            <div style={{maxWidth:'50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',}}>
              <AddProductCard props={this.props} values={this.state} prevStep={this.prevStep} step={this.state.step} closeModal={this.handleProductClose} formSubmit={this.formSubmit} handleChange={this.handleChange} handleCatChange={this.handleCatChange} handleUpload={this.handleUpload} handleChangeImg={this.handleChangeImg.bind(this)}/>
            </div>
          </Modal> : null
        }
        {this.state.owner?
          <Modal open={this.state.editOpen} onClose={this.handleEditClose}>
            <div style={{maxWidth:'50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',}}>
              <EditProfileCard props={this.props} values={this.state} closeModal={this.handleEditClose} formSubmit={this.submitProfileEdit} handleChange={this.handleChange} handleUpload={this.handleUpload}/>
            </div>
          </Modal> : null
        }
        </div>
      </Container>
    )
  }
}
var prourls = new Set()
const mapStateToProps = (state,ownProps) => {
  // eslint-disable-next-line no-unused-vars
  const id = ownProps.match.params.id;
  const chatId1 = ownProps.match.params.id+ state.firebase.auth.uid
  const chatId2 =  state.firebase.auth.uid+ownProps.match.params.id
  // console.log(state);
  const users = ownProps.currentUser;
  const user = users ? users[0] : null;
  console.log(ownProps)
  const url = state.uploadReducer.url ? state.uploadReducer.url:null
  if(url!==undefined&& url!==null){
    if (url.path==='/images/productImg/'){
      prourls=prourls.add(url.url)
      }}
  console.log(prourls)
  var chatexist=null
  var chatId =null
  var i;
  if (state.firestore.ordered.chatsesion!==undefined){
    if(state.firestore.ordered.chatsesion.length===0){
      chatexist= false
    }
    for (i in state.firestore.ordered.chatsesion){

      if (state.firestore.ordered.chatsesion[i].id===chatId1){
        chatexist = true 
        chatId = chatId1
      }else if( state.firestore.ordered.chatsesion[i].id===chatId2){
        chatexist = true 
        chatId = chatId2
      }else{
        chatexist= false
      }
    }
   }
  return {
    auth: state.firebase.auth,
    products :  state.firestore.ordered.products,
    productImg: Array.from(prourls),
    progress: state.uploadReducer.progress,
    thisUser: user,
    chatexist: chatexist,
    chat: state.firestore.data.chatsesion,
    chatId: chatId
    
}};
const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    editUser: (newProfileInfo) => dispatch(editUser(newProfileInfo)),
    uploadToStorage:(file)=>dispatch(uploadToStorage(file)),
    createChatSession:(chat)=> dispatch(createChatSession(chat))
  }
}

export default withRouter(compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => {
      return [{ collection: 'products', where:[["supplierId","==", props.match.params.id]]}, ]
      
  })
)(withStyles(useStyles)(Profile)) )