import React, { Component, useState, useRef } from 'react'
import cx from 'clsx';
import { Redirect, NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {
    Card, CardContent, CardHeader, Divider, Chip,
    Popover, Grid, Button, Table, TableHead, TableRow, Typography,
    TableCell, TableBody, Paper, ClickAwayListener, Icon
} from '@material-ui/core'

import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        minHeight: 800,
        width: '90%',
        justifyContent: 'left',
        alignItems: 'top',
        marginLeft: '5%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginTop: "2%",
        justify: 'center',
        alignItems: 'center',
        direction: 'flex',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    img: {
        width: 100,
        height: 100
    },
    popover: {
        pointerEvents: 'none',
    },
    card: {
        borderRadius: 16,
        // marginTop:'2%',
        height:'80vh'
    },
    content: {
        overflowX: 'auto',
        width:'100%'
    },
}));

const options = ['Your Sell', 'Your Cart'];

function RetailerDetail(props) {
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    // console.log("retailer Detail: ", props.sellProduct)
    const data = props.data ? props.data: null
    // console.log("daattata", data)
   
    const sellList = props.sellProduct
    const [anchorEl, setAnchorEl] = useState(null); 
    const [openedPopoverId, setOpenPopoverId] = useState(null);
    const [openOpt, setOpenOpt] = useState(false);
    const [optionSelected, setOptionSelected] = useState('Your Sell')
    const anchorRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverOpen = (event, popoverId) => {
        setOpenPopoverId(popoverId)
        setAnchorEl(event.currentTarget);
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpenOpt(false);
        setOptionSelected(options[index]);
        
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenPopoverId(null);
    }

    const handleToggle = () => {
        setOpenOpt((prevOpenOpt) => !prevOpenOpt)
    }

    const handleCloseOpt = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenOpt(false);
    }

    const onChange = e => {
        // this.setState({ search: e.target.value })
    }
    console.log(data)
    return (
        
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardContent className={classes.content}>
            <Typography paragraph variant='h4'>Product List</Typography>
            <Divider/>
        
                    <Table style={{width:'100%'}}>
                        <TableHead style={{ fontStyle: 'bold' }}>
                            <TableRow hover>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">AVATAR</TableCell>
                                <TableCell align="left">NAME</TableCell>
                                <TableCell align="left">CATEGORY</TableCell>
                                <TableCell align="left">PRICE</TableCell>
                                {/* <TableCell>SUPPLIER</TableCell> */}
                            </TableRow>
                        </TableHead>
                      
                        {sellList ? sellList.map((item, key) =>
                                 <TableBody>
                                {data ?
                                    <TableRow  
                                    // aria-owns={openBuyer ? 'mouse-over-popover' : undefined}
                                    hover
                                    aria-haspopup="true"
                                    onMouseEnter={e => handlePopoverOpen(e, key)}
                                    onMouseLeave={handlePopoverClose}
                                    key= {key}>
                                        <TableCell align="left">
                                            <Button
                                                href={'/product/'+ item.id}
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                endIcon={<Icon>send</Icon>}
                                            >
                                                {key+1}
                                        </Button></TableCell>
                                        <TableCell align="left"><img className={classes.img} src={data[item.id].cover} /></TableCell>
                                        <TableCell align="left">{data[item.id].name}</TableCell>
                                        <TableCell align="left">{data[item.id].category.map((item, key) => <li key={key}><Chip label={item}/></li>)}</TableCell>
                                        
                                        <TableCell align="left">{'$ '+ data[item.id].price.unitPrice}</TableCell>

                                        

                                        <Popover
                                            className={classes.popover}
                                            id={item.id}
                                            open={openedPopoverId === key}
                                            anchorEl={anchorEl}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <Paper className={classes.paper}>
                                                {data[item.id].productImg.map((image, key) =>
                                                    <img style={{ width: '100px', height: '100px' }} 
                                                        key={key} src={image} 
                                                    />
                                                )
                                                }
                                            </Paper>
                                        </Popover>
                                    </TableRow> 
                                    : <div>Loading...</div>
                                }
                           </TableBody>
                        ) : <div>No Selling Product</div>

                        }
                       
                        
                        
                    </Table>
                {/* </Grid>
        </Grid> */}
        </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => {
    const products = state.firestore.data.products
    const suppliers = state.firestore.data.suppliers
    return {
        products: products,
        suppliers: suppliers
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        if (!props.users)
            return [
                { collection: "products" },
                { collection: "users", where: [["type", "==", "supplier"]], storeAs: 'suppliers' },
            ];
    })

)(RetailerDetail)


