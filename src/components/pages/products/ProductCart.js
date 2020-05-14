import React,{Component} from 'react'
import {createCheckout} from '../../store/actions/transactionAction'
import StyledButton from '../../layout/StyledButton'

import { connect } from 'react-redux'
import { compose } from 'redux'


class ProductCart extends Component{
state={
    cart:[],

}
componentDidMount(){
    this.setState({cart:JSON.parse(window.localStorage.getItem('cart'))})
}

handelCheckout(e){
    this.props.createCheckout(this.state.cart)
    localStorage.removeItem('cart');
    this.setState({cart:[]})
}
    render(){
        return(
        <div>{this.state.cart?
        this.state.cart.map(item=><p>{item.name}</p>)
           :<p>cart empty</p> }
           
           <StyledButton onClick={(e)=> this.handelCheckout(e)} >Check out</StyledButton>
           </div>
        )
    }
}




const mapDispatchToProps = dispatch => {
    return {
        createCheckout: cart => dispatch(createCheckout(cart)),
    };
  };
  
  const mapStateToProps = (state) => {
   
    return {
      auth: state.firebase.auth,
    
    }
  };
  
  export default compose(
    connect(mapStateToProps,mapDispatchToProps),
  ) (ProductCart)
