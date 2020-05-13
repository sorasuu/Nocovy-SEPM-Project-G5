import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Card, CardContent, CardMedia ,
    Button, Dialog, DialogContent, DialogActions,
    DialogContentText, DialogTitle, Grid
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
import ProductImageDetail  from './ProductImageDetail'

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
    const [open, setOpen] = React.useState(false);
    const [number, setNumber] = useState(0);
    const product = props.product
    var owner
    if(props.uid ===props.product.supplierId){
        owner= true
    }else{
        owner=false
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleBuyProduct = (e,product,number) => {
        console.log("handle Buy Product:", product)
        props.handleCart(e,product,number)
        setOpen(false);
    };
    const buyLess = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
    }
    const buyMore = () => {
        setNumber(number + 1)
    }

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

                        <div className="overlay" style={{borderRadius: 16}}>
                        {owner?null:
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                onClick={handleClickOpen}
                            >
                                Buy
                            </Button>}
                            <Dialog
                                fullWidth={true}
                                maxWidth={"md"}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <h4 style={{ margin: '40px' }}>{product.name}</h4>
                                <Grid container style={{margin:'1%'}}>
                                    <Grid item xs={7} md={7} lg={7}  >
                                        <ProductImageDetail image = {product}/>
                                    </Grid>
                                    <Grid item xs={5} md={5} lg={5}>
                                        <DialogTitle id="responsive-dialog-title">
                                             
                                            <div style={{textAlign:'right', fontSize:'30px', fontFamily:'bold' }}>ID: {product.id}</div>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Grid container justify="flex-start">
                                                <Grid item xs={6}><h5>Categories:</h5></Grid>
                                                <Grid item xs={6}>{product.category.map((item, key) =><div key={key} style={{textAlign:'right', fontSize:'30px', fontFamily:'bold' }}>{item.toUpperCase()} </div>)}</Grid>
                                                <br/>
                                                <Grid item xs={6}> <h5>Unit Price:</h5></Grid>
                                                <Grid item xs={6}> <div style={{textAlign:'right', fontSize:'30px', fontFamily:'bold'}}> {product.price.unitPrice} </div></Grid>
                                                <Grid item xs={6}><h5>Calculator</h5></Grid>
                                                <Grid item xs={6}><h5> </h5></Grid>
                                                <Grid item xs={6}>
                                                    <Grid container direction="row" justify="center" alignItems="center">
                                                        <Grid item xs={4}><Button onClick={buyLess}><RemoveRoundedIcon/></Button></Grid>
                                                        <Grid item xs={4}>   <div style={{textAlign:'right', fontSize:'30px', fontFamily:'bold'}}>{number} </div></Grid>
                                                        <Grid item xs={4}><Button onClick={buyMore}><AddRoundedIcon/></Button></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6}><div style={{textAlign:'right', fontSize:'30px', fontFamily:'bold'}}> = {product.price.unitPrice * number}</div></Grid> 
                                               
                                               
                                            </Grid>
                                        </DialogContent>
                                        <Grid container justify='center'>

                                            

                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        justify="flex-end">
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={(e)=>handleBuyProduct(e,product,number)} color="primary" autoFocus>
                                                Purchase
                                            </Button>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </Dialog>
                            <NavLink to={'/product/' + product.id}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SendOutlinedIcon />}
                                >
                                    Detail
                                </Button>
                            </NavLink>

                        </div>
                    </div>
                </div>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={product.name}
                    heading={product.price.unitPrice+' VNĐ'}
        //   body={
        //     product.category
        //   }
        />
            </CardContent>
        </Card>


        // </NavLink>
    );
};


 export default ProductCard
 

 