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
    marginTop: "8%",
    textAlign: 'center',
    lineHeight: "1.4",
}


class NotFound extends Component {

    render() {

        return (
            <div style={notfound} >
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

