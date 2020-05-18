import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Card, CardContent, CardMedia,
    Button, Dialog, DialogContent, DialogActions,
    Chip, DialogTitle, Grid, Input, Collapse
} from '@material-ui/core';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import "../page.css"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import ProductImageDetail from './ProductImageDetail'
import { ColorButton } from '../retailer/RetailerCard'

const useStyles = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
}));

const ProductCard = (props) => {

    const classes = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: false });
    const product = props.product
    // console.log('product', product)

    return (
        // <NavLink to = {'/product/'+ props.product.id}>

        <Card className={cx(classes.root, shadowStyles.root)} style={{ position: "relative", marginBottom: '10px' }}>

            <CardContent className={classes.content}
            // ref={hoverRef}
            >
                <div style={{ marginTop: "2%" }}>
                    {/* put image and info */}
                    <div className='image'>
                        <CardMedia
                            // component="img"
                            alt="product"
                            className={cx(classes.media, mediaStyles.root)}
                            image={product.cover}
                        />

                        <div className="overlay" style={{ borderRadius: 16 }}>

                            <BuyDialog uid={props.uid} product={product} currentUser={props.currentUser}/>
                            <NavLink to={'/product/' + product.id}>
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SendOutlinedIcon />}
                                >
                                    Detail
                                </ColorButton>
                            </NavLink>

                        </div>
                    </div>
                </div>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={product.name}
                    heading={product.price.unitPrice ? '$' + product.price.unitPrice.toLocaleString() : null}

                />
            </CardContent>
        </Card>


        // </NavLink>
    );
};


export default ProductCard


export const BuyDialog = (props) => {
    const [dialog, setDialog] = React.useState(false);
    const [register, setRegister]= useState(false); 
    const [number, setNumber] = useState(0);
    const  product  = props.product
    const currentUser = props.currentUser
    const handleClickDialog = () => {
        setDialog(true);
    };

    const handleCloseDialog = () => {
        setDialog(false);
        setRegister(false);
    };
    const handleBuyProduct = (e, product, number) => {  
        console.log("handle Buy Product:", product)
        props.handleCart(e, product, number)
        setDialog(false);
    };
    const buyLess = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
    }
    const buyMore = () => {
        setNumber(number + 1)
    }
    const handleRegister =()=>{
        setRegister(true)
    }
    const handleChange = (e) => {
        setNumber(e.target.value)

    }
    var owner
    if (props.uid === props.product.supplierId) {
        owner = true
    } else {
        owner = false
    }
    return (
        <div>
            {owner ? null :
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ShoppingCartOutlinedIcon />}
                        onClick={handleClickDialog}
                    >
                        Buy
                </Button>
            }
            < Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={dialog}
                onClose={handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
            <h4 style={{ margin: '40px' }}>{product.name}</h4>
            <Grid container style={{ margin: '1%' }} style={{ width: 'fit-content', marginLeft: '2%' }}>
                <Grid item xs={6} md={6} lg={6}  >
                    <ProductImageDetail image={product} />
                </Grid>
                <Grid item xs={5} md={5} lg={5}>
                    <DialogTitle id="responsive-dialog-title">
                        
                        <div style={{ textAlign: 'center', fontSize: '30px' }}>Buying Product</div>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container justify="flex-start" style={{ width: 'fit-content' }}>
                            <Grid item><h5>Description:</h5></Grid>
                            <Grid item>{props.product.description}</Grid>
                            <Grid item xs={6}><h5>Categories:</h5></Grid>
                            <Grid item xs={6}>{product.category.map((item, key) => <Chip key={key} label={item} variant="outlined" />)}</Grid>
                            <br />
                            
                            <Grid item xs={6}> <h5>Unit Price:</h5></Grid>
                            <Grid item xs={6}> <div style={{ textAlign: 'right', fontSize: '30px', fontFamily: 'bold' }}> ${product.price.unitPrice} </div></Grid>
                            <Grid item xs={12}>
                                <Collapse in={register} unmountOnExit> 
                                    <Grid container direction="row">
                                        <Grid style={{textAlign:'right'}} item xs={6}><p>Unit Cost</p></Grid><Grid style={{textAlign:'right'}} item xs={6}><p>$ {product.price.unitCost}</p></Grid>
                                        <Grid style={{textAlign:'right'}} item xs={6}><p>Duty Rate</p></Grid><Grid style={{textAlign:'right'}} item xs={6}><p>{product.price.dutyRate} %</p></Grid>
                                        <Grid style={{textAlign:'right'}} item xs={6}><p>Margin</p></Grid><Grid style={{textAlign:'right'}} item xs={6}><p>{product.price.margin} %</p></Grid>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid item xs={6}><h5>Quantity</h5></Grid>
                            <Grid item xs={6}><h5 style={{ textAlign: 'right' }}>Cost</h5></Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={4}><Button onClick={buyLess}><RemoveRoundedIcon /></Button></Grid>
                                    <Grid item xs={4}>
                                        <Input
                                            style={{ width: '20px' }}
                                            disableUnderline="true"
                                            value={number}
                                            onChange={e => handleChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}><Button onClick={buyMore}><AddRoundedIcon /></Button></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}><div style={{ textAlign: 'right', fontSize: '30px', fontFamily: 'bold' }}> = {product.price.unitPrice * number}</div></Grid>
                                

                        </Grid>
                        
                    </DialogContent>
                    <Grid container justify='center'>



                    </Grid>
                </Grid>
                <Grid container
                    justify="flex-end">
                    <DialogActions>
                        {currentUser  ? currentUser.type === 'retailer'&& register == false ? 
                            <Button variant='outlined' color='secondary' onClick={handleRegister}>Register</Button>
                             : null :null}
                        <Button autoFocus onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(e) => handleBuyProduct(e, product, number)} color="primary" autoFocus>
                            {register? 'Register' :'Purchase'}
                        </Button>
                    </DialogActions>
                </Grid>
            </Grid>
                </Dialog >
            </div >
    )
}

