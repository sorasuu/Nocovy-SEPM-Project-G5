import React, { Component, useState, useRef } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles'

import {
    Popover, Grid, Button, Grow, Popper, MenuItem, MenuList,
    ButtonGroup, Table, TableHead, TableRow, Typography,
    TableCell, TableBody, Paper, ClickAwayListener
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const useStyles = makeStyles((theme) => ({
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
        marginTop: "2%"
    },
    img: {
        width: 100,
        height: 100
    },
    popover: {
        pointerEvents: 'none',
    },
}));

const options = ['Selling Products', 'Buying Products'];

export default function RetailerDetail(props) {
    const sellList = props.retailer.sellList
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    // const { sellList, retailer, expanded, anchorEl } = this.state;
    const [openOpt, setOpenOpt] = useState(false);
    const openBuyer = Boolean(anchorEl)
    const anchorRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(1);
    const id = openBuyer ? 'popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpenOpt(false);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
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

    console.log("retailer detail", props.retailer)

    return (
        <div>
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
            </Grid>


            <Paper className={classes.paper}>
                <Table >
                    <TableHead className={classes.header} style={{ fontStyle: 'bold' }}>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell>AVATAR</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>TYPE</TableCell>
                            <TableCell>BRAND</TableCell>
                            <TableCell>PRICE</TableCell>
                            <TableCell>Buyer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellList ? sellList.map((product) =>

                            <TableRow aria-owns={openBuyer ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            key={product.id}
                            >
                                <TableCell>{product.id}</TableCell>
                                <TableCell><img className={classes.img} src={product.img} /></TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                
                                <Popover
                                    id={id}
                                    open={openBuyer}
                                    anchorEl={anchorEl}
                                    onClose={handlePopoverClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Paper className={classes.paper}>
                                        Image
                                    </Paper>
                                </Popover>
                            </TableRow>

                        ) : <h4>No Selling Product</h4>

                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>

    )
}




