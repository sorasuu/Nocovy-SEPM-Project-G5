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
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import StyledButton from '../../layout/StyledButton'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        marginTop: "2%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
    content: {
        overflowX: 'auto',
        margin: "2%",
        marginBottom:'1%',
        width:'100%'
    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        top: "3%",
        left: "5%",
        width: '350px'
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
        alignSelf:'flex-start'
    }
}));

const WholesalerInfoCard = (props) => {
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
                title={props.info.businessName}
            />
            {/* <CardMedia className={classes.media} image="http://wholesalerslist.com.au/wp-content/uploads/2019/07/BL1158-150x150.jpg"/> */}
            <CardContent className={classes.content} >
                <div className={classes.topPortion}>
                    <img className={classes.image} src="http://wholesalerslist.com.au/wp-content/uploads/2019/07/BL1158-150x150.jpg" alt="Logo"/>
                    <div className={classes.contact}>
                        {/* <Typography><text style={{fontWeight: "bold"}}>Phone Number:</text> {props.info.phoneNumber}</Typography>
                        <Typography><text style={{fontWeight: "bold"}}>Website:</text> {props.info.website}</Typography>      
                        <Typography><text style={{fontWeight: "bold"}}>Address:</text> {props.info.address}</Typography> */}
                        <Typography variant="h5"><text style={{fontWeight:'bold'}}>{props.info.phoneNumber}</text></Typography>
                        <Link variant="h6" href={props.info.website}>{props.info.website}</Link>      
                        <Typography variant="h6">{props.info.address}</Typography>
                    </div>
                    
                    { props.info.owner?
                    <div className={classes.buttons}>
                   
                        <StyledButton onClick={props.handleOpen} style={{marginBottom:10}}>New Listing</StyledButton>
                        <Divider light/>
                        <NavLink to='/editProfile' ><StyledButton>Edit Profile</StyledButton></NavLink>
                      
                    </div>
                    :<div className={classes.buttons}>
                    <StyledButton style={{marginBottom:10}} onClick={(e)=>props.handleChat(e)}>Chat</StyledButton>
                    </div> }
                    
                </div>
                <div className={classes.description}>
                    <Divider className={classes.divider} light />
                    <Typography variant='h6'>Business Genre:</Typography> 
                    <Typography paragraph>{props.info.businessGenre}</Typography>
                    <Typography variant='h6'>Business Description:</Typography> 
                    <Typography>{props.info.description}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};


export default WholesalerInfoCard;