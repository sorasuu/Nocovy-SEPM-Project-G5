import React from 'react'
import StyledButton from '../layout/StyledButton';

class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
   
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo      
      })
    }
   
    render() {
      if (this.state.errorInfo) {
        return (
          <div  style={{textAlign:'center'}}>
                <img alt="error" src='https://firebasestorage.googleapis.com/v0/b/sepm-nocovy.appspot.com/o/rush-11.png?alt=media&token=ca557853-af52-4883-b664-da2ec0807b8c' style={{width:'70%'}}></img>
              <h1 style={{ fontFamily: 'Muli', marginBottom: "5%" }}>Something went wrong!</h1>
              <StyledButton href='/'>Go to Home Page</StyledButton>
              </div>
        );
      }
      return this.props.children;
    }
   }
   export default ErrorHandler