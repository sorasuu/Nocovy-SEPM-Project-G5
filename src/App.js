import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/pages/Dashboard'
import AdminDashboard from './components/pages/AdminDashboard'
import Profile from './components/pages/Profile'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProductDetail from './components/pages/ProductDetail'
import Chat from './components/pages/Chat'
// import Reports from './components/pages/Reports';
import Upload from './components/pages/Upload'
import Supplier from './components/pages/Supplier'
import Retailer from './components/pages/Retailer'
// import Footer from './components/layout/Footer'

import "./App.css"



class App extends Component {
  
  render() {
    const {  productlist,  currentUser,chatsesion,notifications }= this.props
    // console.log('productList nay',productlist)
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar notifications={notifications} />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            {/* <Route path='/'component={ProductDetail} /> */}
            <Route path='/supplier' component={Supplier}/>
            <Route path ='/admin' component={AdminDashboard}/>
            <Route path='/product/:id' component={(props) => <ProductDetail {...props} classes={productlist} chatsesion = {chatsesion}/>}/>
            <Route path='/retailer' component={Retailer}/>
            <Route path='/signin'component={SignIn}/>
            <Route path='/signup' component={SignUp} />
            <Route path='/profile/:id' component={ (props) =>  <Profile {...props} currentUser={currentUser} chatsesion = {chatsesion}/>} />
            {/* <Route path='/myproducts' component={Profile} /> */}
            <Route path='/upload'component={Upload}/>
            <Route path='/chat/:id'component={  (props) => <Chat {...props} currentUser={currentUser}  />}/>
            {/* <Route path='/reports'  component={() => <Reports products={productobj} reports={reports} />}/>
            <Route path='/myproducts' component={() => <ProductsManage products={productlist} />}/> */}    
          </Switch>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  const users = state.firestore.ordered.currentUser
  const currentUser = users? users[0]:null
  const chatsesion =state.firestore.ordered.chatsesion? state.firestore.ordered.chatsesion.reverse():null
  return {
    auth: state.firebase.auth,
    currentUser : currentUser,
    chatsesion: chatsesion,
    notifications: state.firestore.ordered.notifications

  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    // console.log("fetch data" ,props)
    if(!props.auth.uid){
      return [];
    }
    else{
    return  [{collection:'users', doc:props.auth.uid, storeAs: 'currentUser' },{collection:'chats', where:[['chatsesion', 'array-contains',  props.auth.uid]],queryParams:['orderByChild=lastMod'] ,storeAs:'chatsesion'},
    {collection:'notifications', where:[['uid','==',props.auth.uid]]}]
    }})
  )
 (App);