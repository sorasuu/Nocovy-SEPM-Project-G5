import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card, CardContent, CardMedia ,
    Button, withStyles
} from '@material-ui/core';

import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { NavLink } from 'react-router-dom';

import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import "../page.css"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ProductDialog from './ProductDialog'


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
export const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(`hsla(14, 100%, 53%, 0.6)`),
      backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
      '&:hover': {
        backgroundColor: `hsla(14, 100%, 53%, 0.8)`,
      },
    },
  }))(Button);

const RetailerCard = (props) => {
   
    const classes = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: false });
 
    const retailer = props.retailer
    console.log('this is retailer', retailer)
    
    
    return (

        <Card className={cx(classes.root, shadowStyles.root)} style={{ position: "relative", marginBottom: '10px' }}>
            
            <CardContent className={classes.content}

            >
                <div style={{ marginTop: "2%" }}>
                    
                    <div className='image'>
                    <CardMedia
                    
                    alt="product"
                        className={cx(classes.media, mediaStyles.root)}
                        image={retailer.logo}
                    />

                        <div className="overlay" style={{borderRadius: 16}}>  
                            {props.currentUser.type === 'supplier'?
                                <ProductDialog currentRetailer={retailer} currentUser = {props.currentUser }/>
                            : null} 
                            <NavLink to={'/retailer/' + retailer.id}>
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
                    overline={`${retailer.displayName}: \ ${retailer.email} `}
                    heading={retailer.businessName}
                    body={ retailer.address}
                    
                />
            </CardContent>
        </Card>


        // </NavLink>
    );
};


 export default RetailerCard
 

 