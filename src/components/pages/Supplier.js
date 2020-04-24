import React, { Component } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardContent, CardHeader,
    Paper, Typography, withStyles
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        padding: '3% 10px 10px 10px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
        '& .MuiTableCell-root': {
            border: `1px solid black`,
            padding: '2% 2% 2px 10px'
        },
    },

    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: '5px',
        maxWidth: 500,
    },
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
    },
    content: {
        transition: '0.3s',
        textAlign: 'left',
        overflowX: 'auto',
        marginLeft: "5%",
        margintTop: "5%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: 'auto',
        maxWidth: '500px',
        height: "400px",
        marginTop: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    '&.MuiTableCell-head': {
        border: `1px solid red`
    }

});

class Supplier extends Component{
    state ={
       
    }

    render(){
        const classes = useStyles();
        const cardHeaderStyles = useContainedCardHeaderStyles();
        const cardShadowStyles = useOverShadowStyles();
        const cardHeaderShadowStyles = useFadedShadowStyles();
        return(
            <Card className={cx(classes.card, cardShadowStyles.root)}
            style={{ position: "relative", marginBottom: '5px' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", width: 'auto', minWidth: '200px' }}
                title={props.product.title}
            />
            <CardContent className={classes.content} >
                <Grid
                    className={classes.root}
                    container
                    alignItems="flex-start"
                    key={props.product.id}
                >
                    <Grid item xs={12} sm={6} md={6} >
                        <ProductImageCard product={props.product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <ProductInfoCard product={props.product} />
                    </Grid>

                </Grid>


            </CardContent>
        </Card>
        )

    }
}

const mapStateToProps = (state) => {
    // console.log("haha", state.product);
    return {
      auth: state.firebase.auth,
    }
  };
  
  export default compose(
    connect(mapStateToProps),
    // firestoreConnect([
  
    // ])
  )(withStyles(useStyles)(Supplier) )