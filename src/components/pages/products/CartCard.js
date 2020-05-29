import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card, CardContent, CardHeader, 
        Typography, Divider, Grid, Avatar,
        Button, Table, TableHead, TableContainer, TableRow, TableCell, TableBody,
        IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box 
} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from '../../layout/StyledButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        width: 'fit-content',
      },
    card: {
        display: 'flex',
        marginTop: "1%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
        height:'100%'
    },
    content: {
        display:'flex',
        flexDirection:'column',
        margin: "2%",
        width:'100%'
    },
    container: {
        maxHeight: '100%',
    },
}));

const CartCard = (props) => {
    console.log('Props', props)
    const cart = props.cart
    console.log('cart', props.cart)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardContent className={classes.content}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left' style={{ minWidth: 400 }}><Typography><Box fontWeight='Bold'>Product</Box></Typography></TableCell>
                                {/* <TableCell align='left'><Box fontWeight='Bold'>Author</Box></TableCell> */}
                                <TableCell align='left'><Box fontWeight='Bold'>Unit Price</Box></TableCell>
                                <TableCell align='left'><Box fontWeight='Bold'>Quantity</Box></TableCell>
                                <TableCell align='left'><Box fontWeight='Bold'>Total Price</Box></TableCell>
                                <TableCell align='right'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item, key) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell align='left'>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Button style={{marginRight:20}} onClick={handleClickOpen}>
                                                    <img style={{height:'8vh', width:'8vh', objectFit:'cover'}} src={item.cover} />
                                                </Button>
                                                <Grid>
                                                    <Typography variant='h6'><Box>{item.name}</Box></Typography>
                                                    <Typography variant='subtitle2'><Box>Seller: {item.authorName}</Box></Typography>
                                                </Grid>
                                            </Grid>
                                            <Dialog
                                                style={{ width: 'fit-content', direction: 'flex' }}
                                                fullWidth={true}
                                                maxWidth={'lg'}
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="max-width-dialog-title"
                                            >
                                                <DialogTitle id="max-width-dialog-title">Product: {item.name}</DialogTitle>
                                                <DialogContent>
                                                    <Grid container direction='row' >
                                                        <Grid item>
                                                            <div style={{ fontSize: '20px' }}>Detail Pictures</div>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container direction='row'>
                                                                {item.productImg.map((image, key) =>
                                                                    <Grid key={key} item xs={4}>
                                                                        <img style={{ width: 'fit-content', maxWidth:'300px' }} src={image} />
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                                        {/* <TableCell align='left'>{item.authorName}</TableCell> */}
                                        <TableCell align='left'>$ {item.price.unitPrice.toLocaleString()}</TableCell>
                                        <TableCell align='left'>Quantity</TableCell>
                                        <TableCell align='left'>$ {(item.price.unitPrice * cart[key].num).toLocaleString()}</TableCell>
                                        <TableCell><IconButton><ClearIcon/></IconButton></TableCell>
                                    </TableRow>
                                );
                             })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                >
                    <StyledButton startIcon={<ArrowBackIcon/>}>Continue Shopping</StyledButton>
                    <StyledButton startIcon={<ShoppingCartIcon/>}>Place Order</StyledButton>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CartCard;