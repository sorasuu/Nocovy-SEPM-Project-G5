import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
    },
}));


const ProductCard = (props) => {
    console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <NavLink to = {'/product/'+ props.product.id}>
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{position:"relative",marginBottom:'2%'}}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={props.product.name}
                subheader={props.product.subheader}
                style={{background:"linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",position:"absolute", top:"-20%" , right:"5%"}}
            />
            <CardContent className={classes.content}>
                <div style={{ marginTop:"10%"}}>
                {/* put image and info */}
                <p>Product Info: {props.product.info}</p>
                </div>
            </CardContent>
        </Card>
        </NavLink>
    );
};


export default ProductCard;