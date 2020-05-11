import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Card, CardContent, CardHeader,
    Button, Dialog, DialogContent, DialogActions,
    DialogContentText, DialogTitle, Grid
} from '@material-ui/core';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import Carousel from 'react-elastic-carousel'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import "../page.css"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

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
    console.log("product card", props.product)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [open, setOpen] = React.useState(false);
    const [number, setNumber] = useState(0);
    const product = props.product

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '10px' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={product.name}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", right: "5%" }}
            />
            <CardContent className={classes.content}
            // ref={hoverRef}
            >
                <div style={{ marginTop: "10%" }}>
                    {/* put image and info */}
                    <div className='image'>
                        <img src={product.cover} style={{ width: "200px", height: "250px" }} />

                        <div className="overlay">
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                onClick={handleClickOpen}
                            >
                                Buy
                            </Button>
                            <Dialog
                                fullWidth={true}
                                maxWidth={"md"}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <h4 style={{ margin: '40px' }}>{product.name}</h4>
                                <Grid container>
                                    <Grid item xs={8} md={8} lg={8}  >
                                        <Carousel itemToShow={1}>
                                            {product.productImg ? product.productImg.map((item, key) =>
                                                <img key={key} style={{ minWidth: 200, height: 500 }} src={item} />
                                            ) :
                                                <img src={product.cover} />
                                            }
                                        </Carousel>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <DialogTitle id="responsive-dialog-title">
                                            {product.id}
                                        </DialogTitle>
                                        <DialogContent>
                                            {product.brand}
                                            {product.authorName}
                                        </DialogContent>
                                        <Grid container justify='center'>

                                            <Button onClick={buyLess    }><RemoveRoundedIcon/></Button>
                                            <h4>{number}</h4>
                                            <Button onClick={buyMore}><AddRoundedIcon/></Button>

                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        justify="flex-end">
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleClose} color="primary" autoFocus>
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
            </CardContent>
        </Card>


        // </NavLink>
    );
};



export default ProductCard;