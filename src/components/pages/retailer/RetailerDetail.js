import React, { useState } from 'react'
import cx from 'clsx';

import { makeStyles, fade } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {
    Card, CardContent, Divider, Chip,
    Popover, Button, Table, TableHead, TableRow, Typography,
    TableCell, TableBody, Paper, Icon, Grid
} from '@material-ui/core'
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

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
        height: '80vh'
    },
    content: {
        overflowX: 'auto',
        width: '100%'
    },
    paper: {
        width: 'fit-content'
    }
}));

function RetailerDetail(props) {
    const classes = useStyles();
    // console.log('retailer detail', props)
    const cardShadowStyles = useOverShadowStyles({ inactive: true });
    const data = props.data ? props.data : null
    const sellList = props.sellProduct
    const [anchorEl, setAnchorEl] = useState(null);
    const [openedPopoverId, setOpenPopoverId] = useState(null);

    const handlePopoverOpen = (event, popoverId) => {
        setOpenPopoverId(popoverId)
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenPopoverId(null);
    }

    return (

        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardContent className={classes.content}>
                <Typography paragraph variant='h4'>Product List</Typography>

                <Divider />

                <Table stickyHeader="true" style={{ width: '100%' }} >
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
                </Table>
                <div style={{ overflow: 'auto', height: '600px' }}>
                    <Table style={{ tableLayout: 'fixed' }}>
                        {sellList ? sellList.map((item, key) =>
                            <TableBody overflow="auto">
                                {data ?
                                    <TableRow
                                        // aria-owns={open  Buyer ? 'mouse-over-popover' : undefined}
                                        hover
                                        aria-haspopup="true"
                                        onMouseEnter={e => handlePopoverOpen(e, key)}
                                        onMouseLeave={handlePopoverClose}
                                        key={key}>
                                        <TableCell align="left">
                                            <Button
                                                href={'/product/' + item.id}
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                endIcon={<Icon>send</Icon>}
                                            >
                                                {key + 1}
                                            </Button></TableCell>
                                        <TableCell align="left"><img className={classes.img} src={data[item.id].cover} /></TableCell>
                                        <TableCell align="left">{data[item.id].name}</TableCell>
                                        <TableCell align="left">{data[item.id].category.map((item, key) => <li key={key}><Chip label={item} /></li>)}</TableCell>

                                        <TableCell align="left">{'$ ' + data[item.id].price.unitPrice}</TableCell>



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
                                                <Grid container justify="flex-start">
                                                    {data[item.id].productImg.map((image, key) =>
                                                        <Grid item>
                                                            <img style={{ width: '100px', height: '150px' }}
                                                                key={key} src={image}
                                                            />
                                                        </Grid>
                                                    )
                                                    }
                                                </Grid>
                                            </Paper>
                                        </Popover>
                                    </TableRow>
                                    : <div>Loading...</div>
                                }
                            </TableBody>
                        ) : null

                        }



                    </Table>
                </div>

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
                { collection: "users", where: [["type", "==", "supplier"], ['verify', '==', true]], storeAs: 'suppliers' },
            ];
    })

)(RetailerDetail)


