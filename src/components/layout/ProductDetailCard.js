import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardContent, CardHeader,
    Paper, Typography, Input,
    InputAdornment, FormControl, TextField, InputLabel,
    FilledInput, OutlinedInput
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
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
        '& .MuiTableCell-root': {
            border: `1px solid black`,
            padding: '2% 2% 2px 10px'
        },

       
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },

    leftDetail: {
        width: 150,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop:'5px',
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
    },
    margin: {
        margin: theme.spacing(1),
    },
    innerCell: {
        width: 'auto',
        padding: '3% 10px 10px 10px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,

    },
    priceCaculator:{
        '& .MuiTableCell-root': {
            border: `1px solid white`,
            padding: '2% 2% 2px 10px'
        },

    }

}));

function PriceCalculator() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        FOBpoint: '',
        FreightRate: '',
        DutyRate: '',
        UnitCost: '',
        ListPrice: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.root}>
            <div>

                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input

                        id="standard-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </div>
            <div>

                <FormControl className={classes.margin} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </div>
            <div>

                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        labelWidth={60}
                    />
                </FormControl>
            </div>
        </div>
    );
}


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
                    <Grid item xs={12} sm={6} md={6} >
                        <ProductImageCard product={props.product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
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
                            // startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                <Table>
                    <TableBody className={classes.priceCaculator}>
                        <TableRow>
                            <TableCell

                                variant="head">FOB Point</TableCell>
                            <TableCell >
                                <Input
                                    className={classes.innerCell}
                                    disableUnderline={true}
                                    id="standard-adornment-amount"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    labelWidth={0}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Freight Rate</TableCell>
                            <TableCell>
                                <Input
                                    className={classes.root}
                                    style={{ width: '30%' }}

                                    disableUnderline={true}
                                    id="standard-adornment-amount"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}

                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                /> / <Input
                                    className={classes.root}
                                    style={{ width: '30%' }}
                                    disableUnderline={true}
                                    id="standard-adornment-amount"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    labelWidth={0}
                                    endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                                /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Freight Description</TableCell>
                            <TableCell>
                                <Input
                                    className={classes.innerCell}
                                    disableUnderline={true}
                                    id="standard-adornment-amount"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                               
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Duty Rate</TableCell>
                            <TableCell><Input
                                className={classes.innerCell}
                                disableUnderline={true}
                                id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            <Paper className={classes.paper}>
                <TableBody>
                    {props.product.details ? props.product.details.map(detail => {
                        return(
                            <TableRow key={detail.name}>
                                <TableCell>{detail.name}</TableCell>
                                <TableCell>
                                    {detail.value}
                                </TableCell>
                            </TableRow>
                        )
                    }) : null}
                </TableBody>
            </Paper>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h6">Components</Typography> 
                  
                </Grid>
                <Grid item xs={8}>
                    <Button>Edit</Button>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Attachment</Typography> 
                  
                </Grid>
                <Grid item xs={8}>
                    <Button>Add</Button>
                </Grid>
            
            </Grid>
        </div>
    )
}

