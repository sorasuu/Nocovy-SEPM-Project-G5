import React, { Component, useState, useRef } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {
    Popover, Grid, Button, Grow, Popper, MenuItem, MenuList,
    ButtonGroup, Table, TableHead, TableRow, Typography,
    TableCell, TableBody, Paper, ClickAwayListener, Icon
} from '@material-ui/core'
import { checkArray } from '../dashboard/Dashboard'
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        minHeight: 800,
        width: '90%',
        justifyContent: 'left',
        alignItems: 'top',
        marginLeft: '5%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginTop: "2%",
        // marginRight: theme.spacing(2),
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
    paper: {
        padding: theme.spacing(2),
        marginTop: "2%",
        width: 'auto'
    },
    img: {
        width: 100,
        height: 100
    },
    popover: {
        pointerEvents: 'none',
    },
}));

const options = ['Your Sell', 'Your Cart'];

function RetailerDetail(props) {

    const productsCheck = checkArray(props.products)
    const suppliersCheck = checkArray(props.suppliers)
    const sellList = props.retailer.products
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null); 
    const [openedPopoverId, setOpenPopoverId] = useState(null);
    const [openOpt, setOpenOpt] = useState(false);
    const [optionSelected, setOptionSelected] = useState('Your Sell')
    // const openBuyer = Boolean(anchorEl)
    const anchorRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(0);
    // const id = openBuyer ? 'popover' : undefined;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverOpen = (event, popoverId) => {
        setOpenPopoverId(popoverId)
        console.log("CheckHandleOpen",event.currentTarget)
        setAnchorEl(event.currentTarget);
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpenOpt(false);
        setOptionSelected(options[index])
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

    return (

        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-controls={openOpt ? 'split-button-menu' : undefined}
                        aria-expanded={openOpt ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={openOpt} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseOpt}>
                                    <MenuList id="split-button-menu">
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>


            {optionSelected == 'Your Sell' ?
                <Grid item xs={12} md={12} lg={12}>
                    <Table >
                        <TableHead className={classes.header} style={{ fontStyle: 'bold' }}>
                            <TableRow >
                                <TableCell>ID</TableCell>
                                <TableCell>AVATAR</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>BRAND</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>SUPPLIER</TableCell>

                            </TableRow>
                        </TableHead>
                      
                        {sellList ? sellList.map((id, key) =>
                                 <TableBody >
                                {productsCheck[id] ?
                                    <TableRow  
                                    // aria-owns={openBuyer ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={e => handlePopoverOpen(e, key)}
                                    onMouseLeave={handlePopoverClose}
                                    key= {key}>
                                        <TableCell>
                                            <NavLink to={'/product/'+ id}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                endIcon={<Icon>send</Icon>}
                                            >
                                                {id}
                                        </Button></NavLink></TableCell>
                                        <TableCell><img className={classes.img} src={productsCheck[id].cover} /></TableCell>
                                        <TableCell>{productsCheck[id].name}</TableCell>
                                        <TableCell>{productsCheck[id].category}</TableCell>
                                        <TableCell>{productsCheck[id].brand}</TableCell>
                                        <TableCell>{productsCheck[id].price}</TableCell>
                                        {suppliersCheck[productsCheck[id].supplierId] ?
                                            <NavLink to={'/supplier/' + productsCheck[id].supplierId}>
                                                <Button variant="contained" color="primary" component="span">
                                                    {suppliersCheck[productsCheck[id].supplierId].businessName}
                                                </Button>
                                            </NavLink> : null}

                                        <Popover
                                            id={id}
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
                                                {productsCheck[id].productImg.map((image, key) =>
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
                </Grid>
                : <div>YourCart</div>}

        </Grid>


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


