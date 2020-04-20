import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from './StyledButton';



const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        marginTop: "2%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
    content: {
        margin: "2%",
        marginTop:'5%',
        width:'100%',
        textAlign:'center'

    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        top: "2%",
        left: "50%",
        width: '250px',
        textAlign:'center',
        transform: 'translate(-50%)'
    },
}));

const AddProductCard = (props) => {
    console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title='Add New Listing'
            />
            <CardContent className={classes.content}>
                <img src="image/Alexa.jpg" style={{ width: "200px", height: "250px" }} />
                <form noValidate autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input id='title' placeholder='Product Title'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Subheader</label>
                        <input id='title' placeholder='Product Subtitle'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Price</label>
                        <input type='number' id='title' placeholder='Base Price'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Description</label>
                        <input id='title' placeholder='Product Description'/>
                    </div>
                    <StyledButton style={{marginTop:10}}>Create</StyledButton>
                </form>
            </CardContent>
        </Card>
    );
};


export default AddProductCard;