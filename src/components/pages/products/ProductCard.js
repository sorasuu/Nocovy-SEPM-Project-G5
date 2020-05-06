import React from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Card, CardContent, CardHeader,
    Button, Dialog, DialogContent, DialogActions,
    DialogContentText, DialogTitle, Grid
} from '@material-ui/core';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import "../page.css"
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
    const theme = useTheme();
    const product = props.product
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                                
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <Grid container>
                                    <Grid item xs={6} md={6} lg={6}>

                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Let Google help apps determine location. This means sending anonymous location data to
                                                Google, even when no apps are running.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} color="primary">
                                                Disagree
                                        </Button>
                                            <Button onClick={handleClose} color="primary" autoFocus>
                                                Agree
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