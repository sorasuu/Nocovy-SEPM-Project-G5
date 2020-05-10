import React, { Component, useState } from 'react';
import cx from 'clsx';

import PropTypes from "prop-types";
import {
    Card, CardContent, CardHeader,
    Avatar, CardActions, IconButton,
    Typography, makeStyles, Box,
    InputBase, Tabs, Tab,
    Collapse, Grid
} from "@material-ui/core";
import {
    Table, TableBody, TableRow,
    TableCell, TableHead
} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { checkArray } from '../dashboard/Dashboard'
import RetailerList from './RetailerList'
const useStyles = makeStyles((theme) => ({
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
    },

    avatar: {
        width: 100,
        height: 100
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
            marginLeft: theme.spacing(0, 3),
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
        marginLeft: '50px'
    },
    header: {
        backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
        color: 'white',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },

}));
 export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function SupplierDetailCard(props) {

    const [search, setSearch] = useState('');
    const [value, setValue] = useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    // const allProducts = [{name:'a',value:'b'}, {name:'b',value:'c'}]
    const allProducts = checkArray(props.products)
    
    
    const onChange = (event, newValue) => {
        console.log(newValue)
        // setSearch((newValue).toString);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const filterProducts = allProducts.filter(product => {
        return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    });

    return (
        <Card className={cx(classes.card, cardShadowStyles.root)}
            style={{ position: "relative", marginBottom: '5px' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", width: 'auto', minWidth: '200px' }}
                title={<h4>{props.supplier.businessName}</h4>}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img style={{ width: '100%', height: '100%' }} src={props.supplier.logo} />
                    </Avatar>
                }
            />
            <CardContent className={classes.content} >
                <Grid container
                    direction="row"
                    justify="flex-end"
                    alignItems="stretch">
                    <CardActions disableSpacing>
                        <IconButton
                            className={cx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <div>Company Detail</div>
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>

                        <InputBase
                            placeholder="Searching your Product"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChange}
                        />
                    </div>


                </Grid>
            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <SupplierInfo/> */}

                </CardContent>
            </Collapse>
            <CardContent>

                <Table>
                    <TableHead className={classes.header}>
                        <TableCell>Products </TableCell>
                        <TableCell>Retailers </TableCell>
                    </TableHead>
                </Table>
                <TableBody>
                    <TableCell>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            className={classes.tabs}
                        >
                            {filterProducts.map((product, key) =>
                                <Tab label={product.name} {...a11yProps(key)} />
                            )}
                        </Tabs>
                    </TableCell>
                    <TableCell>
                        {filterProducts.map((product,productkey)=>

                            <RetailerList   product={product}
                                            data = {props.data}
                                            productkey ={productkey}
                                            value={value}
                            />
                        )}
                    </TableCell>
                </TableBody>

            </CardContent>
        </Card>
    )


}

