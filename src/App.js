import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, populate } from 'react-redux-firebase'
import Navbar from './components/layout/Navbar'
import Profile from './components/pages/Profile'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Chat from './components/pages/Chat'
import { Fab} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import "./App.css"
import ChatWidget from './components/layout/ChatWidget';
import Dashboard from './components/pages/dashboard/Dashboard'
import AdminDashboard from './components/pages/dashboard/AdminDashboard';
import ProductDetail from './components/pages/products/ProductDetail'
import SupplierDetail from './components/pages/supplier/SupplierDetail';
import Retailer from './components/pages/retailer/Retailer';
import "./App.css"
import ProductCart from './components/pages/products/ProductCart';
import FAQ from './components/pages/FAQ'
import TermOfService from './components/pages/TermOfService'
import TransactionRules from './components/pages/TransactionRules'
import PrivacyPolicy from './components/pages/PrivacyPolicy'
import NotFound from './components/pages/NotFound'
import CancelIcon from '@material-ui/icons/Cancel';


class App extends Component {
  state = {
    chatwindow: false,
    cart:[]
  }
  handleClicked = e => {
    this.setState({ chatwindow: !this.state.chatwindow })
  }
  handleCart=(e, productinfo, num)=>{
    
    const { cart } = this.state
    console.log('state cart',cart)
    var newcart = cart;
    var a =[]
    var productitem ={...productinfo,num}
    
      if (cart.length === 0){
            // console.log('newcart', newcart)
            this.setState({cart:[productitem]})
            console.log("productItem", productitem)
            localStorage.setItem('cart',JSON.stringify([productitem]));
      }
      else{
     
      var exist = false
      for( var i=0;i<cart.length;i++){
        console.log('the fuck',cart[i].id,productitem.id)
          if (cart[i].id===productitem.id){
            exist= true
            newcart[i]=productitem
            this.setState({cart:newcart})
            localStorage.setItem('cart', JSON.stringify(newcart));
            break;
          }
        }
        if(exist===false){
          newcart = [...cart,productitem]
          console.log(newcart)
          this.setState({cart:newcart})
          localStorage.setItem('cart', JSON.stringify(newcart));
        }
        // this.props.deliverProductToCart(null)
    }
    var cartfromlocal = JSON.parse(localStorage.getItem('cart'));
    console.log('cart',cartfromlocal)
  }
  render() {
    const {  productlist, supplierlist, retailerlist, currentUser, chatsession, notifications,lastContact}= this.props
   
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar notifications={notifications} lastContact ={lastContact} cart={this.state.cart} />
          <Switch>
            <Route exact path='/' component={(props)=><Dashboard {...props} handleCart={this.handleCart} />} />
            {/* <Route path='/'component={ProductDetail} /> */}
            <Route path='/supplier/:id' component={(props)=> <SupplierDetail {...props} classes={supplierlist}/>}/>
            <Route path ='/admin' component={AdminDashboard}/>
            <Route path='/product/:id' component={(props) => <ProductDetail {...props} classes={productlist} />}/>
            <Route path='/retailer/:id' component={(props) =><Retailer {...props} class={retailerlist}/>}/>
            <Route path='/signin'component={SignIn}/>
            <Route path='/signup' component={SignUp} />
            <Route path='/cart' component={ProductCart} />
            <Route path='/profile/:id' component={(props) => <Profile {...props} currentUser={currentUser} chatsesion={chatsession} />} />
            <Route path='/chat/:id' component={(props) => <Chat {...props} currentUser={currentUser} chatsession={chatsession}  />} />
            <Route path='/faq' component={FAQ} />
            <Route path='/privacypolicy' component={PrivacyPolicy} />
            <Route path='/rules' component={TransactionRules}/>
            <Route path='/tos' component={TermOfService} />
            <Route component={NotFound} />

          </Switch>
          {this.props.auth.uid&&this.props.chatsession?
          <Fab style={{
            right: '20px',
            bottom: '20px',
            display: 'block',
            position: 'fixed',
            zIndex:1
          }} onClick={(e) => { this.handleClicked(e) }} >
            {!this.state.chatwindow? <ChatBubbleIcon /> : <CancelIcon />}
          </Fab>:null}
          {this.state.chatwindow ? <ChatWidget /> : null}
        </div>
      </BrowserRouter>
    
    );
  }
}


const mapStateToProps = (state,ownProps) => {
  // console.log(ownProps);
  const users = state.firestore.ordered.currentUser
  const currentUser = users ? users[0] : null
  const chatsession = state.firestore.ordered.allchatsesion
  const lastContact = chatsession? chatsession[0]:null
  return {
    auth: state.firebase.auth,
    currentUser: currentUser,
    notifications: state.firestore.ordered.notifications,
    chatsession: chatsession,
    lastContact: lastContact
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    // console.log("fetch data" ,props)
    if (!props.auth.uid) {
      return [];
    }
    else {
      return [{ collection: 'users', doc: props.auth.uid, storeAs: 'currentUser' },
      {
        collection:'chats', where:[['chatsesion', 'array-contains',  props.auth.uid]],queryParams:['orderByChild=lastMod'] ,storeAs:'allchatsesion',
      },
      { collection: 'notifications', where: [['uid', '==', props.auth.uid]] }]
    }
  })
)
  (App);