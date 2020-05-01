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
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    // const [hoverRef, isHovered] = useHover();

    return (
        // <NavLink to = {'/product/'+ props.product.id}>

        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '10px' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={props.product.name}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", right: "5%" }}
            />
            <CardContent className={classes.content}
            // ref={hoverRef}
            >
                <div style={{ marginTop: "10%" }}>
                    {/* put image and info */}
                    <div className='image'>
                        <img src={props.product.productImg} style={{ width: "200px", height: "250px" }} />

                        <div className="overlay">
                            <NavLink to = {'/product/'+ props.product.id}>
                                <button>Detail</button>
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