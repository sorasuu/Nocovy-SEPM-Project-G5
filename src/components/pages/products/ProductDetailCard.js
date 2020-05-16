import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardContent, CardHeader, Button, Icon
} from "@material-ui/core";
import ProductImageDetail from './ProductImageDetail'
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import PriceForm from './PriceForm'
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '3% 10px 10px 10px',
        // border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },

    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        marginTop: '5px',
        // maxWidth: 1000,
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
        // marginTop: "5%",
        display: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: '100%',
        maxWidth: '400px',
        height: "350px",
        marginTop: '5px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
    },
    '&.MuiTableCell-head': {
        border: `1px solid red`
    }

}));

export default function ProductDetailCard(props) {
    
    const classes = useStyles();
    var price 
    if (props.product!==undefined&& props.product!=null){
        price =[{name:'Unit Cost',value:props.product.price.unitCost},{name:'Margin',value:props.product.price.margin},{name:'Duty Rate',value:props.product.price.dutyRate}]
    }
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    // {props.product?props.product.price.map(price => console.log('price',price))}
    // console.log('hello', props.product.price[0])
  
    return (
        <div style={{textAlign:'center'}}>
        <Card className={cx(classes.card, cardShadowStyles.root)}
            style={{ position: "relative", marginBottom: '5px', }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", width: 'auto', minWidth: '200px', marginLeft:"30px"  }}
                title={props.product.name}
            />
            <CardContent className={classes.content} >
                <Grid
                    className={classes.root}
                    container
                    alignItems="flex-start"
                    key={props.product.id}
                    spacing={2}
                >
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        {/* <ProductImageCard image={ props.product.productImg } /> */}
                        <ProductImageDetail image ={props.product}/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Grid container>
    <Grid item xs={12}><ProductInfoCard product={props.product} price={price} id={props.id}/> </Grid>
                            <Grid item xs={12}><DetailTable details={props.product.detail} style={{marginBottom: '5px' }}/></Grid>
                        
                        </Grid>             
                    </Grid>

                </Grid>


            </CardContent>
        </Card>
        
        </div>
    );
};


// image design

// table detail

export const ProductInfoCard = props => { 
    const classes = useStyles();
    console.log('product detail card', props)
    return (
        
        <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}><h4>Author:</h4></Grid>
            <Grid item xs={6} md={6} lg={6}><div style={{fontSize:'20px'}}>{props.product.authorName}</div>
                    <NavLink to={`/supplier/${props.product.supplierId.uid}`}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                        >
                            Supplier
                        </Button>
                    </NavLink>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={6} md={4} lg={3}> 
                    <h4> Price</h4>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={9}>
                <TableContainer className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <PriceForm product={props.product} id={props.id}/>
                        </TableRow>
                    </TableHead>
                    <TableBody aria-label="simple table">
                        {props.price ? props.price.map((detail, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell style={{ backgroundColor: `hsla(14, 100%, 53%, 0.6)`, color: 'white' }}>
                                        {detail.name}
                                    </TableCell>
                                    <TableCell>
                                        {detail.value}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : null}

                    </TableBody>


                </TableContainer>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}></Grid>
        </Grid>
        
    )
}
function DetailTable(props) {
    // console.log('detail table props', props.details)

    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Name', field: 'name',
                cellStyle: {
                    backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
                    color: '#FFF'
                  },
                headerStyle: {
                  backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
                  fontSize:15,
                  fontFamily:'Open Sans',
                  color:'white'
                  
                }
              },
            { title: 'Value', field: 'value',
            // headerStyle:{
            //     backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
            //     fontSize:15,
            //     fontFamily:'Open Sans',
            //     color:'white'
            // } 
        },         
        ],
       
    });

    return (
        <div>
        <h4>Detail</h4>
        <MaterialTable
            title={' '}
            columns={state.columns}
            data={props.details}
            options={{
                searchFieldAlignment: "left",
                paging:false,
                actionsColumnIndex:-1,
                rowStyle: rowData =>({
                    backgroundColor: (rowData.tableData.id % 2 ===0)? '#EEE': '#FFF'
                })
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
        </div>
    );
}
