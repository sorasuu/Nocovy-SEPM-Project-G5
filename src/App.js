import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/pages/dashboard/Dashboard'
import AdminDashboard from './components/pages/dashboard/AdminDashboard';
import Profile from './components/pages/Profile'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProductDetail from './components/pages/products/ProductDetail'
// import Reports from './components/layout/Reports';
import Upload from './components/layout/Upload';
import SupplierDetail from './components/pages/supplier/SupplierDetail';
import Retailer from './components/pages/retailer/Retailer';
// import Footer from './components/layout/Footer';
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import "./App.css"
import Chat from './components/layout/Chat';

class App extends Component {
  
  render() {
    const { productobj, productlist, supplierlist, retailerlist, reports }= this.props
    console.log('productList nay',productlist)
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            {/* <Route path='/'component={ProductDetail} /> */}
            <Route path='/supplier/:id' component={(props)=> <SupplierDetail {...props} classes={supplierlist}/>}/>
            <Route path ='/admin' component={AdminDashboard}/>
            <Route path='/product/:id' component={(props) => <ProductDetail {...props} classes={productlist} />}/>
            <Route path='/retailer/:id' component={(props) =><Retailer {...props} class={retailerlist}/>}/>
            <Route path='/signin'component={SignIn}/>
            <Route path='/signup' component={SignUp} />
            {/* <Route path='/profile/:id' component={Profile} /> */}
            <Route path='/myproducts' component={Profile} />
            <Route path='/upload'component={Upload}/>
            <Route path='/chat'component={Chat}/>
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