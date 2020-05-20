import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card, CardContent, CardHeader, Typography, Divider, Link, Avatar} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from '../../layout/StyledButton'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        marginTop: "5%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
    content: {
        overflowX: 'auto',
        margin: "2%",
        marginTop: "3%",
        marginBottom:'1%',
        width:'100%'
    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        left: "5%",
        width: 'auto',
        minWidth:'250px',
        transform: 'translate(0%, -3%)'
    },
    divider:{
        margin:10,
    },
    description:{
        clear:'both'
    },
    image:{
        float: 'left'
    },
    topPortion:{
        display: 'flex',
        alignItems:'center',
    },
    contact:{
        marginLeft:'1%',
        textAlign:'left'
    },
    buttons:{
        display:'flex',
        flexDirection:'column',
        marginLeft:'auto',
        alignSelf:'flex-start',
        justifyContent:'center'

    }
}));

const ProfileInfoCard = (props) => {
    // console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title={props.info.businessName? props.info.businessName : 'N/A'}
                subheader={(props.info.type === 'supplier') ? 'Supplier' : 'Retailer'}
            />
            <CardContent className={classes.content} >
                <div className={classes.topPortion}>
                    <Avatar style={{height:175, width: 175, marginRight:10}} className={classes.image} src={props.info.logo ? props.info.logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'} alt="Logo"/>
                    <div className={classes.contact}>
                        <Typography variant="h5" style={{fontWeight:'bold'}}>{props.info.phoneNumber ? props.info.phoneNumber : 'No phone number available'}</Typography>
                        <Link variant="h6" href={props.info.website}>{props.info.website ? props.info.website : 'No website available'}</Link>      
                        <Typography variant="h6">{props.info.address ? props.info.address : 'No address available'}</Typography>
                    </div>
                    
                    { props.info.owner?
                    <div className={classes.buttons}>
                   
                        <StyledButton onClick={props.handleProductOpen} startIcon={<AddIcon />} style={{marginBottom:10}}> Create New Product </StyledButton>
                        <Divider light/>
                        <StyledButton onClick={props.handleEditOpen} startIcon={<EditIcon />}>Edit Profile</StyledButton>
                      
                    </div>
                    :<div className={classes.buttons}>
                    <StyledButton style={{marginBottom:10}} onClick={(e)=>props.handleChat(e)}>Chat</StyledButton>
                    </div> }
                    
                </div>
                <div className={classes.description}>
                    <Divider className={classes.divider} light />
                    <Typography variant='h6'>Business Genre:</Typography> 
                    <Typography paragraph>{props.info.businessGenre ? props.info.businessGenre : 'Business genre not available'}</Typography>
                    <Typography variant='h6'>Business Description:</Typography> 
                    <Typography paragraph>{props.info.businessDesc? props.info.businessDesc : 'Description not available'}</Typography>
                    <Typography paragraph variant='h6'>Business Certificate(s):</Typography>
                    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', flexDirection:'row'}}>
                        {props.info.certificates? props.info.certificates.map((value) => (
                            <div>
                            <img key={value} src={value} alt="certificate" height='300' />
                            </div>
                        )) : 'No certificates available'}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export default ProfileInfoCard;