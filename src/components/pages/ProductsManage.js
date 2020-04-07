import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { Redirect, Link, NavLink } from 'react-router-dom'

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions,Typography,CardContent ,IconButton,Avatar,Collapse,CardHeader,Card, LinearProgress} from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import ProductCard from '../layout/ProductCard'

class ProductsManage extends Component {
 state={
   reports:[],
   search:'',
   searching:false,
   searchResult:[]
 }
 static getDerivedStateFromProps(nextProps, prevState){
  if(nextProps.reports!==prevState.reports){
    return { reports: nextProps.reports};
 }
 else return null;
}

componentDidUpdate(prevProps, prevState) {
 if(prevProps.reports!==this.props.reports){
   //Perform some operation here
   this.setState({reports: this.props.reports});

 }
}
  render() {
    console.log(this.state)
    const { auth,products } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    return (
      <div className="container" style={{textAlign:'center'}}>

          <h1 style={{fontFamily:'Muli', marginBottom:"5%"}}>Products</h1>
          <div className="input-field" style={{fontFamily:'Muli', marginBottom:"5%"}} >
            <input type="text" id='search' />
            <label htmlFor="title">Search</label>
           </div>
        
           <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
              >
           {products?products.map(product=>{
             return(
              <Grid item xs={12} sm={6} md={4}  key={classe.id}>
             <ProductCard  product={product}/>
          </Grid>
          )}):<h5>Loading...</h5>}</Grid>
        </div>
       
     
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,

  }
};

export default connect(mapStateToProps)(ProductsManage) 