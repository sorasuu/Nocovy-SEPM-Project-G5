import React, { Component } from 'react'
import { Redirect,  NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {Container, Paper} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import StyledButton from '../layout/StyledButton'
import ProductDetailCard from '../layout/ProductDetailCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'

class Profile extends Component {
  state={
    businessName: 'Coastal Designs Décor',
    businessGenre: 'Handmade Products, Home Decor, Licensed Products, Nostalgic Gifts, Woodware',
    description: 'Product lines include Photo frames, money boxes, wall plaques, book boxes, trinket boxes, candle holders, tea light holders, wall art including shadow boxes, shell theme products',
    address: 'Unit 3/339 Hillsborough Road Warners Bay NSW',
    phoneNumber: '02 4954 4100',
    website: 'http://www.coastaldesigns.com.au'
  }
 handelReportformClicked =(e)=>{
   this.setState({reportform:!this.state.reportform})
 }
  render() {
    return (
      <Container>
        <Paper elevation={3}>
          <Container>
            <img className="img-responsive" src="http://wholesalerslist.com.au/wp-content/uploads/2019/07/BL1158-150x150.jpg" alt="logo"/>
            <h4>Coastal Designs Décor</h4>
            <div><text style={{fontWeight: "bold"}}>Business Name:</text> {this.state.businessName}</div>
            <div><text style={{fontWeight: "bold"}}>Business Genre:</text> {this.state.businessGenre}</div>
            <div><text style={{fontWeight: "bold"}}>Business Description:</text> {this.state.description}</div>
            <div><text style={{fontWeight: "bold"}}>Address:</text> {this.state.address}</div>
            <div><text style={{fontWeight: "bold"}}>Phone Number:</text> {this.state.phoneNumber}</div>
            <div><text style={{fontWeight: "bold"}}>Website:</text> {this.state.website}</div>
          </Container>
      </Paper>
      </Container>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const id = ownProps.match.params.id;

  console.log(state);
  console.log(ownProps)
  return {

}};

export default  compose(
  connect(mapStateToProps),
  // firestoreConnect((props) => {

  // })
)(Profile) 