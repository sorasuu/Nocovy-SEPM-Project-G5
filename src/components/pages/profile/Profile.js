import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {InputBase, Container, Typography, Grid, withStyles, Modal} from '@material-ui/core'
import ProfileInfoCard from './ProfileInfoCard'
import { firestoreConnect } from 'react-redux-firebase'

import AddProductCard from '../products/AddProductCard'
import EditProfileCard from '../supplier/EditProfileCard'
import ProductCard from '../products/ProductCard'
import { Redirect } from 'react-router-dom'
import {createProduct } from '../../store/actions/productAction'
import {editUser } from '../../store/actions/userActions'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles'
import {uploadToStorage} from '../../store/actions/uploadAction'
import {withRouter} from 'react-router-dom';
import {createChatSession} from '../../store/actions/chatActions'
import { checkArray } from '../dashboard/Dashboard'
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
    type: '',
    businessName: '',
    phoneNumber: '',
    address: '',
    website: '',
    businessGenre: '',
    businessDesc: '',
    certificates: '',
    wholesaler: '',
    logo: '',
    newBusinessName: '',
    newPhoneNumber: '',
    newAddress: '',
    newWebsite: '',
    newBusinessGenre: '',
    newDescription: '',

    //Figure out editing logo and cert later
    newCertificate: '', 
    newLogo: '',

    search:'',
    step:1,
    owner:false,
    productName:'',
    productDesc:'',
    productCategories: [],
    dutyRate:0,
    margin:0,
    unitCost:0,
    images: [],
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

  handleCatChange = (chips) => {
    this.setState({ productCategories: chips })
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
    if(this.state.productDesc === ''){
      alert('The product description cannot be empty')
      return false
    }
    if(this.state.productCategories === ''){
      alert('The product category cannot be empty')
      return false
    }
    if(this.state.dutyRate <= 0){
      alert('The product duty rate cannot be negative or zero')
      return false
    }
    if(this.state.margin <= 0){
      alert('The product margin cannot be negative or zero')
    }
    if(this.state.unitCost <= 0){
      alert('The product unit cost cannot be negative or zero')
    }
    else{
      return true
    }
  }

  formSubmit = () => {
    if (this.validateForm()){

      //FIX THIS TO FIT WITH NEW DATA
      var unitPrice = Number(this.state.unitCost) * ((100 + Number(this.state.margin) + Number(this.state.dutyRate))/100)
      var timeStamp = Math.floor(Date.now() / 1000);
      var product = {
        authorEmail: this.props.thisUser.email,
        authorName: this.props.thisUser.displayName,
        category: this.state.productCategories, 
        cover: this.props.productImg[0],
        supplierId: this.props.auth.uid,
        productImg: this.props.productImg,
        name: this.state.productName, 
        createdAt: timeStamp,
        description: this.state.productDesc, 
        price: {
          dutyRate: this.state.dutyRate,
          margin: this.state.margin,
          unitCost: this.state.unitCost,
          unitPrice: unitPrice
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
      var newProfileData = {
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

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.thisUser !== this.props.thisUser && prevState.thisUser!== this.props.thisUser && this.props.thisUser!==undefined&& this.props.thisUser!==null) {
        this.setState({ type: this.props.thisUser.type,
          businessName: this.props.thisUser.businessName,
          phoneNumber: this.props.thisUser.phoneNumber,
          address: this.props.thisUser.address,
          website: this.props.thisUser.website,
          businessGenre: this.props.thisUser.businessGenre,
          businessDesc: this.props.thisUser.businessDesc,
          certificates: this.props.thisUser.certificates,
          wholesaler: this.props.thisUser.wholesaler,
          logo: this.props.thisUser.logo,
          newBusinessName: this.props.thisUser.businessName,
          newPhoneNumber: this.props.thisUser.phoneNumber,
          newAddress: this.props.thisUser.address,
          newWebsite: this.props.thisUser.website,
          newBusinessGenre: this.props.thisUser.businessGenre,
          newDescription: this.props.thisUser.businessDesc,})
    }
  }

static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.thisUser !== prevState.thisUser) {
        return { thisUser: nextProps.thisUser };
    }
    else return null;
}
  
  render() {
    const { auth, classes, products } = this.props;
    console.log(this.props)
    const allRetailers = this.props.allRetailers ? this.props.allRetailers : []
    const { search } = this.state;
    const filteredProducts = checkArray(products).filter(product =>{
        return product.name.toLowerCase().indexOf(search.toLowerCase())!== -1
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
                  <ProductCard product={product} profile={this.props.thisUser ? this.props.thisUser.type : false} allRetailers={allRetailers} />
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
  const thisUsers = state.firestore.data.thisUser
  const thisUser = thisUsers?thisUsers:null
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
    thisUser: thisUser,
    chatexist: chatexist,
    chat: state.firestore.data.chatsesion,
    chatId: chatId,
    allRetailers: state.firestore.ordered.allRetailers
    
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
    
      return [
        { collection: 'products', where:[["supplierId","==", props.match.params.id]]},
        { collection: 'users', doc: props.match.params.id, storeAs: 'thisUser' },
        { collection: 'users', where: [["type", "==", "retailer"]], storeAs: 'allRetailers' }      ]
      
  })
)(withStyles(useStyles)(Profile)) )