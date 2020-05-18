import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card, CardContent, CardHeader, Typography, Divider, Link, Avatar, CardActions, Button, Grid, CardMedia, CardActionArea} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import StyledButton from '../../layout/StyledButton'
import { Redirect, NavLink } from 'react-router-dom';

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
        marginTop: "10%",
        width:'100%'
    },
    header:{
        background: "linear-gradient(45deg, #019179 30%, #0074A7 90%)",
        position: "absolute",
        left: "50%",
        width: 'auto',
        transform: 'translate(-50%, 15%)'
    },
    media: {
        justify: 'center',
        alignItems: 'center',
        direction: 'flex',
      },
}));

const RetailerDetailCard = (props) => {
    console.log('foobar' + props.info.businessName)
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
            <CardContent className={classes.content}>
                  {/* <CardMedia
                    className={classes.media}
                    title="Business Logo"
                  > */}
                  <Avatar style={{height:'100%', width:'100%', maxHeight:300}} src={props.info.logo} />
                  {/* </CardMedia> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* {retailer.displayName} */}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {props.info.businessDesc? props.info.businessDesc : 'No business description available'}
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Grid
                    container
                    justify='space-between'
                  >
                      <Button size="large" color="primary" href={"/profile"+props.info.id}>Profile</Button>
                      <Button size="large" color="primary" href={"/"}>Partner</Button>
                  </Grid>

                </CardActions>
            </CardContent>
        </Card>
    );
};


export default RetailerDetailCard;