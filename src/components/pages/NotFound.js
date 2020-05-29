import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const useStyles = theme => ({
    notfound: {

    },
    h1: {

    },
    h2: {
        fontSize: "33px",
        fontWeight: "200",
        marginTop: "0px",
        marginBottom: '25px'
    },
});

const notfound = {
    fontFamily: 'Kanit',
    position: "relative",
    marginTop: "2%",
    textAlign: 'center',
    lineHeight: "1.4",
}


class NotFound extends Component {

    render() {

        return (
            <div style={notfound} >
                <img style={{height:'30%',maxHeight:'300px'}} alt='' src='https://firebasestorage.googleapis.com/v0/b/sepm-nocovy.appspot.com/o/mirage-page-not-found.png?alt=media&token=de37129c-849e-4cf4-8fb5-c1d768976986' ></img>
                <h1 style={{fontSize:"190px"}}>404</h1>
                
                <h4 style={{fontSize : "30px"}}>Oops! We couldn't find that page</h4>

                <br />
                <Link to="/">
                    <h5>Return to Homepage</h5>
                </Link>

            </div>
        )
    }
}

export default (withStyles(useStyles)(NotFound))

