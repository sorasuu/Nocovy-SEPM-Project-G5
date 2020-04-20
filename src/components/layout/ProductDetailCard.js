import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardContent, CardHeader,
    Paper, Typography
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
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

    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: '5px',
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
    '&.MuiTableCell-head': {
        border: `1px solid red`
    }

}));

export default function ProductDetailCard(props) {
    console.log("Product Price", props.product.price)
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
        <TableContainer className={classes.root}>

            <Table aria-label="simple table">
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}><h4>PRICE</h4></Grid>
                    <Grid item xs={6} md={6} lg={6}><Button color="primary">Edit</Button></Grid>
                </Grid>

                {props.product.price ? props.product.price.map(price => {
                    return (
                        <TableBody key={price.id}>
                            {price.cost ? price.cost.map((cost, key) => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{cost.name}</TableCell>
                                        <TableCell>{cost.value}</TableCell>
                                    </TableRow>

                                )
                            }) : null}

                        </TableBody>
                    )
                }) : null}

            </Table>




            {/* <Table style={{marginTop:'2%'}}>
                <TableBody>
                    {props.product.details ? props.product.details.map(detail => {
                        return (
                            <TableRow key={detail.name}>
                                <TableCell>{detail.name}</TableCell>
                                <TableCell>
                                    {detail.value}
                                </TableCell>    
                            </TableRow>
                        )
                    }) : null}
                </TableBody>
            </Table> */}
            <DetailTable details={props.product.details} />

            {/* <Grid container spacing={2}>
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

            </Grid> */}
        </TableContainer>
    )
}
function DetailTable(props) {
    console.log('detail table props', props.details)

    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Name', field: 'name',
                cellStyle: {
                  backgroundColor: '#039be5',
                  color: '#FFF',
                  width:'auto'
                },
                headerStyle: {
                  backgroundColor: '#039be5',
                  fontSize:15,
                  fontFamily:'Open Sans'
                }
              },
            { title: 'Value', field: 'value' },         
        ],
        data: [
            { name: 'Origin', value: 'China'},
            {
                name: 'Brand',
                value: 'Fashionista',        
            },
        ],
       
    });

    return (
        <div>
        <h4>Detail Table</h4>
        <MaterialTable
            title={' '}
            columns={state.columns}
            data={state.data}
            options={{
                searchFieldAlignment: "left",
                paging:false,
                
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
        </div>
    );
}