import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card, CardContent, CardHeader, 
        Typography, Divider, Grid, Avatar,
        Button
} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from '../../layout/StyledButton'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import DotIndicator from '@mui-treasury/components/indicator/dot';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        width: 'fit-content',
      },
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
        marginTop:20,
        marginBottom:15
    },
    description:{
        clear:'both',
        textAlign:'justify'
    },
    avatar:{
        float: 'left',
        
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
    },
    slide: {
        perspective: 1000, 
        overflow: 'hidden',
        position: 'relative',
      },
      imageContainer: {
        display: 'block',
        position: 'relative',
        zIndex: 2,
      },
      image: {
        
        marginTop: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        height: "fit-content",
        maxHeight:'800px',
        minHeight:'400px',
        objectFit: 'contain',  
        
      },
      arrow: {
        position: 'absolute',
        top:'98%',
        transform: 'translateY(-50%)',
      
      },
      arrowLeft: {
        left: 0,
        
      },
      arrowRight: {
        right: 0,
       
      },
      indicatorContainer: {
        textAlign: 'center',
      },
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
            <CardContent className={classes.content}>
                <div className={classes.topPortion}>
                    <Avatar style={{height:175, width: 175, marginRight:10}} className={classes.avatar} src={props.info.logo ? props.info.logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'} alt="Logo"/>
                    <div className={classes.contact}>
                        <Typography variant="h5" style={{fontWeight:'bold'}}>{props.info.phoneNumber ? props.info.phoneNumber : 'No phone number available'}</Typography>
                        {/* <Link variant="h6" href={props.info.website}>{props.info.website ? props.info.website : 'No website available'}</Link>       */}
                        {props.info.website ?<a href={`https:${props.info.website}`}>{props.info.website}</a> : 'No website available'}
                        <Typography variant="h6">{props.info.address ? props.info.address : 'No address available'}</Typography>
                    </div>
                    
                    { props.info.owner?
                    <div className={classes.buttons}>
                   
                        <StyledButton onClick={props.handleProductOpen} startIcon={<AddIcon />} style={{marginBottom:10}}> Create New Product </StyledButton>
                        <Divider light/>
                        <StyledButton onClick={props.handleEditOpen} startIcon={<EditIcon />} style={{background: "linear-gradient(45deg, #019179 30%, #0074A7 90%)", boxShadow: '0 3px 5px 2px rgba(105, 135, 255, 0.3'}}>Edit Profile</StyledButton>
                      
                    </div>
                    :<div className={classes.buttons}>
                    <StyledButton startIcon={<ChatBubbleIcon />} style={{marginBottom:10}} onClick={(e)=>props.handleChat(e)}>Send Message</StyledButton>
                    </div> }
                    
                </div>
                <div className={classes.description}>
                    <Divider className={classes.divider} light />
                    <Grid container direction='row' display='flex' alignItems='center'>
                        <Grid item xs={4}>
                            <Typography variant="h4">Business Genre:</Typography> 
                            <Typography paragraph>{props.info.businessGenre ? props.info.businessGenre : 'Business genre not available'}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='h4'>Business Description:</Typography> 
                            <Typography paragraph>{props.info.businessDesc? props.info.businessDesc : 'Description not available'}</Typography>
                        </Grid>
                    </Grid>
                    
                   <Grid container direction="row" alignItems="center" justify="flex-start">
                       <Grid item xs={4}>
                        <Typography paragraph variant='h4' style={{textAlign:'center'}}>Business Certificates:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                         
                            {/* <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', flexDirection:'row'}}>
                                {props.info.certificates? props.info.certificates.map((value, key) => (
                                    <div key={key}>
                                        <img src={value} alt="certificates" height='300' />
                                    </div>
                                )) : 'No certificates available'}
                            </div> */}
                            {props.info.certificates?
                                <CertificatesDetail certificates={props.info.certificates}/>
                            : 'No Certificates Available'
                            }

                        </Grid>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    );
};


export default ProfileInfoCard;

const CertificatesDetail = (props) => {
    const classes = useStyles();
    const renderElements = ({ index, onChangeIndex }) => (
      <>
        <Button
          className={cx(classes.arrow, classes.arrowLeft)}
          disabled={index === 0}
          onClick={() => onChangeIndex(index - 1)}
        >
          <KeyboardArrowLeft />
        </Button>
        <Button
          className={cx(classes.arrow, classes.arrowRight)}
          disabled={index === props.certificates.length - 1}
          onClick={() => onChangeIndex(index + 1)}
        >
          <KeyboardArrowRight />
        </Button>
        <div className={classes.indicatorContainer}>
          {props.certificates.map((image, i) => (
            <DotIndicator
              key={i}
              active={i === index}
              onClick={() => onChangeIndex(i)}
            />
          ))}
        </div>
      </>
    );
    const renderChildren = () =>
      props.certificates.map((image, key) => (
        <div key={key} className={classes.slide}>
         
          <div className={classes.imageContainer}>
            <img className={classes.image} src={image} alt={'slide'} />
          </div>
        </div>
      ));
    return (
      <div className={classes.root}>
        <ParallaxSlide renderElements={renderElements}>
          {renderChildren}
        </ParallaxSlide>
      </div>
    );
  };
