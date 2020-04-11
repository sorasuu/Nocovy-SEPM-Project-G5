import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Paper, Typography} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '3% 10px 10px 10px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
    leftDetail:{
        width: 150,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
    },
    content: {
        transition: '0.3s',
        textAlign: 'left',
        overflowX: 'auto',
        marginLeft: "5%",
        margintTop: "5%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: 'auto',
        maxWidth: '500px',
        height: "400px",
        marginTop: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}));

export default function ProductDetailCard(props) {
    console.log("Product Detail", props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (

        <Card className={cx(classes.card, cardShadowStyles.root)}
            style={{ position: "relative", marginBottom: '5px' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", width: 'auto', minWidth: '200px' }}
                title={props.product.title}
            />
            <CardContent className={classes.content} >
                <Grid
                    className={classes.root}
                    container
                    alignItems="flex-start"
                    key={props.product.id}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <ProductImageCard product={props.product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ProductInfoCard product={props.product} />
                    </Grid>

                </Grid>


            </CardContent>
        </Card>
    );
};

// image design
const ProductImageCard = props => {
    const classes = useStyles();
    return (
        <div>
            <Grid style={{ padding: "10px 10px 10px 10px" }} container spacing={1}>
                {props.product.imageDetail.map(i => {
                    return (
                        // <Grid item xs={3} sm={3} md={3} key={i.imageId}>
                        <Card style={{ width: '50px', height: "75px" }} key={i.imageId}>
                            <img src={i.imageUrl} style={{ width: "100%" }} />
                        </Card>
                        // </Grid>
                    );
                })}
            </Grid>
            {props.product.imageDetail.map(i => {
                return (
                    // <Grid item xs={3} sm={3} md={3} key={i.imageId}>
                    <Card className={classes.imageCard} key={i.imageId}>
                        <img src={i.imageUrl} style={{ width: "50%", height: '350px' }} />
                    </Card>
                    // </Grid>
                );
            })}
        </div>
    )
}

// table detail
export const ProductInfoCard = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-between"
                
            >
                <h5>{props.product.company}</h5>

            </Grid>
            
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid 
                container 
                justify="space-between"
            >
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Price Calculator</Typography>
                </Grid>
                <Grid>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size='small'
                        startIcon={<SaveIcon/>}
                    >
                        Save
                    </Button>
                </Grid>

            </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid className={classes.leftDetail} item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    FOB point
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Freight Rate
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Freight Description
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Duty Rate
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                            </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

