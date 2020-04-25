import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
                <form noValidate autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="title">Name</label>
                        <input id='name' placeholder='Product Name' onChange={props.handleChange('productName')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input id='brand' placeholder='Product Brand' onChange={props.handleChange('productBrand')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="origin">Origin</label>
                        <input id='origin' placeholder='Product Origin' onChange={props.handleChange('productOrigin')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input id='desc' placeholder='Product Description' onChange={props.handleChange('productDesc')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categories">Categories</label>
                        <input id='categories' placeholder='Product Categories' onChange={props.handleCatChange('productCategories')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dutyCost">Duty Cost</label>
                        <input className="form-control" type='number' id='dutyCost' placeholder='Duty Cost' onChange={props.handleChange('dutyCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dutyRate">Duty Rate</label>
                        <input className="form-control" type='number' id='dutyRate' placeholder='Duty Rate' onChange={props.handleChange('dutyCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="FOB">FOB Point</label>
                        <input id='FOB' placeholder='FOB Point' onChange={props.handleChange('FOB')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="freightCost">Freight Cost</label>
                        <input type='number' id='freightCost' placeholder='Freight Cost' onChange={props.handleChange('freightCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="freightDesc">Freight Description</label>
                        <input id='freightDesc' placeholder='Freight Description' onChange={props.handleChange('freightDesc')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="freightRate">Freight Rate</label>
                        <input id='freightRate' placeholder='Freight Rate' onChange={props.handleChange('freightRate')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="landedCost">Landed Cost</label>
                        <input type='number' id='landedCost' placeholder='Landed Cost' onChange={props.handleChange('landedCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="margin">Margin</label>
                        <input id='margin' placeholder='Margin' onChange={props.handleChange('margin')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="miscCost">Miscellaneous Cost</label>
                        <input type='number' id='miscCost' placeholder='Miscellaneous Cost' onChange={props.handleChange('miscCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unitCost">Unit Cost</label>
                        <input type='number' id='unitCost' placeholder='Unit Cost' onChange={props.handleChange('unitCost')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unitPrice">Unit Price</label>
                        <input type='number' id='unitPrice' placeholder='Unit Price' onChange={props.handleChange('unitPrice')}/>
                    </div>
                    <StyledButton onClick={props.formSubmit} style={{marginTop:10}}>Create</StyledButton>
                </form>
            </CardContent>
        </Card>
    );
};


export default AddProductCard;