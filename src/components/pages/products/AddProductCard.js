import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from '../../layout/StyledButton';
import {DropzoneArea} from 'material-ui-dropzone'
const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        marginTop: "2%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        left: "50%",
        width: '250px',
        textAlign:'center',
        transform: 'translate(-50%, 15%)'
    },
    content: {
        margin: "2%",
        marginTop:'4%',
        width:'100%',

    },
    form: {
        textAlign:'center',
        overflowY: 'auto',
        maxHeight: '65vh',
    },
    buttonGroup: {
        display:'flex',
        justifyContent:'flex-end',
        marginTop: '3%',
    }
}));

const AddProductCard = (props) => {
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title='Add New Listing'
            />
            <CardContent className={classes.content}>
            {{ 1: <div>
                <div className="form-group">
                    <label htmlFor="image" >Image(s)</label>
                    <br/>
                    <DropzoneArea
                            onChange={props.handleChangeImg}
                            acceptedFiles={['image/*']}
                            maxFileSize={500000}
                            filesLimit = {4}
                            dropzoneText={'Upload your product Image here'}
                    />
                </div>
                <div className={classes.buttonGroup}>
                    <StyledButton onClick={(e) =>{props.closeModal()}} style={{marginRight:10}}>Cancel</StyledButton>
                    <StyledButton onClick={(e) =>{props.handleUpload(e)}}>Next</StyledButton>
                </div>
            </div>,
            
            2: <div>
                <div className={classes.form}>
                    <form style={{margin:'2%'}}>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input id='name' placeholder='Product Name' defaultValue={props.values.productName} onChange={props.handleChange('productName')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description</label>
                            <input id='desc' placeholder='Product Description' defaultValue={props.values.productDesc} onChange={props.handleChange('productDesc')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Categories</label>
                            <input id='categories' placeholder='Product Categories' defaultValue={props.values.productCategories} onChange={props.handleCatChange('productCategories')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dutyRate">Duty Rate (%)</label>
                            <input type='number' id='dutyRate' defaultValue={props.values.dutyRate} placeholder='Duty Rate (%)' onChange={props.handleChange('dutyRate')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="margin">Margin (%)</label>
                            <input id='margin' placeholder='Margin (%)' defaultValue={props.values.margin} onChange={props.handleChange('margin')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="unitCost">Unit Cost</label>
                            <input type='number' id='unitCost' defaultValue={props.values.unitCost} placeholder='Unit Cost' onChange={props.handleChange('unitCost')}/>
                        </div>
                    </form>    
                </div>
                <div className={classes.buttonGroup}>
                        <StyledButton onClick={(e) =>{props.prevStep()}} style={{marginRight:10}}>Back</StyledButton>
                        <StyledButton onClick={(e) =>{props.formSubmit(e)}}>Create</StyledButton>
                </div>
            </div>
            }[props.step]}
            </CardContent>
        </Card>
    );
};


export default AddProductCard;