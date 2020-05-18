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
import TextField from '@material-ui/core/TextField';


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
        width: 'auto',
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
        marginTop: '2%',
    }
}));

const EditProfileCard = (props) => {
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title='Edit Profile'
            />
            <CardContent className={classes.content}>
            <div>
                <div className={classes.form}>
                    <form style={{margin:'2%', textAlign:'left'}}>
                        <TextField multiline style={{marginBottom:'2%'}} label='Business Name' defaultValue={props.values.businessName} onChange={props.handleChange('newBusinessName')}></TextField><br/>
                        <TextField multiline style={{marginBottom:'2%'}} label='Phone Number' defaultValue={props.values.phoneNumber} onChange={props.handleChange('newPhoneNumber')}></TextField><br/>
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Address' defaultValue={props.values.address} onChange={props.handleChange('newAddress')}></TextField><br/>
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Website' defaultValue={props.values.website} onChange={props.handleChange('newWebsite')}></TextField><br/>
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Business Genre' defaultValue={props.values.businessGenre} onChange={props.handleChange('newBusinessGenre')}></TextField><br/>
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Description' defaultValue={props.values.businessDesc} onChange={props.handleChange('newDescription')}></TextField>
                    </form>    
                </div>
                <div className={classes.buttonGroup}>
                        <StyledButton onClick={(e) =>{props.closeModal()}} style={{marginRight:10}}>Cancel</StyledButton>
                        <StyledButton onClick={(e) =>{props.formSubmit()}}>Save</StyledButton>
                </div>
            </div>
            </CardContent>
        </Card>
    );
};


export default EditProfileCard;