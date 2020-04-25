import React, { Component, useState } from 'react';
import cx from 'clsx';

import PropTypes from "prop-types";
import {
    Card, CardContent, CardHeader, Avatar, CardActions, IconButton,
    Paper, Typography, withStyles, makeStyles, Box, InputBase, Tabs, Tab, Collapse
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { supplier } from './data';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SupplierInfo from '../layout/SupplierInfo';

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
function TabPanel(props) {
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

export default function Supplier() {

    const [search, setSearch] = useState('');
    const [value, setValue] = useState(0);
    const [expanded, setExpanded] = React.useState(true);
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const allProducts = supplier[0].productList
    
    console.log("check", allProducts)
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
                title={<h4>{supplier[0].title}</h4>}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img style={{ width: '100%', height: '100%' }} src={supplier[0].logo} />
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
                   <SupplierInfo/>

                </CardContent>
            </Collapse>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} lg={3}>
                        <h4 className={classes.header}>
                            Product List
                        </h4>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            {
                                filterProducts.map(
                                    (product) =>
                                        <Tab key={product.id} label={product.name} {...a11yProps(product.id)} />
                                )
                            }

                        </Tabs>
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <h4 className={classes.header}>
                            Product Retailer
                        </h4>
                        {filterProducts.map((product) =>
                            <TabPanel key={product.id} value={value} index={product.id}>
                                <Table>
                                    <TableHead className={classes.header} style={{fontStyle:'bold'}}>
                                        <TableRow >
                                            <TableCell>ID</TableCell>
                                            <TableCell>AVATAR</TableCell>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>EMAIL</TableCell>
                                            <TableCell>ADDRESS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product.retailer ? product.retailer.map(retailer =>
                                            <TableRow>
                                                <TableCell>{retailer.id}</TableCell>
                                                <TableCell><img src={retailer.avatar} /></TableCell>
                                                <TableCell>{retailer.name}</TableCell>
                                                <TableCell>{retailer.email}</TableCell>
                                                <TableCell>{retailer.address}</TableCell>
                                            </TableRow>
                                        ) : <h4>No Retailer</h4>}
                                    </TableBody>
                                </Table>
                            </TabPanel>)}

                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )


}

