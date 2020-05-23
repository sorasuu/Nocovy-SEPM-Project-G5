import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card, CardContent, CardMedia ,
    Button,
} from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { NavLink } from 'react-router-dom';
import { ColorButton } from '../retailer/RetailerCard'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import "../page.css"
import AddRoundedIcon from '@material-ui/icons/AddRounded';



const useStyles = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
        height:'500px',
    },
}));

const SupplierCard = (props) => {
   
    const classes = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: false });
 
    const supplier = props.supplier
    console.log('supplier', supplier)
    
    
    return (
        // <NavLink to = {'/product/'+ props.product.id}>

        <Card className={cx(classes.root, shadowStyles.root)} class={classes.card} style={{ position: "relative", marginBottom: '10px' }}>
            
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
                        image={supplier.logo}
                    />

                        <div className="overlay" style={{borderRadius: 16}}>   
                            <NavLink to={'/supplier/' + supplier.id}>
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
                    overline={`${supplier.email}: \ ${supplier.phoneNumber? supplier.phoneNumber : 'No PhoneNumber'}`}
                    heading={supplier.businessName}
                    body={supplier.address ? supplier.address.slice(0,65):null}
       
                />
            </CardContent>
        </Card>


        // </NavLink>
    );
};


 export default SupplierCard
 

 