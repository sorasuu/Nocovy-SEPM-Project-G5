import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { Redirect, Link, NavLink } from 'react-router-dom'

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions,Typography,CardContent ,IconButton,Avatar,Collapse,CardHeader,Card} from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors"
import clsx from "clsx";
// import ReportCard from '../layout/ReportCard'

class Reports extends Component {
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

          <h1 style={{fontFamily:'Muli', marginBottom:"5%"}}>Product Report</h1>
          <div className="input-field">
            <input type="text" id='search' />
            <label htmlFor="title">Search</label>
           </div>
      
           {/* <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
              >
           {this.state.reports&&products?this.state.reports.map(report=>{
             return(
              <Grid item xs={12} sm={6} md={12}  key={report.id}>
             <ReportCard report={report} products={products}/>
          </Grid>
          )}):null}</Grid> */}
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

export default  connect(mapStateToProps)(Reports) 