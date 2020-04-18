import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/pages/Dashboard'

import Profile from './components/pages/Profile'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProductDetail from './components/pages/ProductDetail'
import Reports from './components/pages/Reports';

// import Footer from './components/layout/Footer';
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

import "./App.css"


class App extends Component {
  
  render() {
    const { productobj, productlist, reports }= this.props
    // console.log('productList nay',productlist)
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            {/* <Route exact path='/'component={Dashboard} /> */}
            <Route exact path='/'component={ProductDetail} />

            <Route path='/product/:id' component={(props) => <ProductDetail {...props} classes={productlist} />}/> />
            <Route path='/signin'component={SignIn}/>
            <Route path='/signup' component={SignUp} />
            <Route path='/profile' component={Profile} />
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
  return {
    auth: state.firebase.auth,


  }
};

export default compose(
  connect(mapStateToProps),
  // firestoreConnect((props) => {
  //   console.log("fetch data" ,props)
  //   if(!props.auth.uid){
  //     return [];
  //   }
  //   else{
  //   return  [{ collection: 'reports', queryParams: ['orderByChild=createdBy' ],limit:50 },{collection:'products'},{collection:'users', doc:props.auth.uid}]
  //   }})
  )
 (App);