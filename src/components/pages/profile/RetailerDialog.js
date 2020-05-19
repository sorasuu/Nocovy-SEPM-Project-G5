import React, { useState, Fragment } from 'react';
import {
    Dialog, DialogContent, DialogTitle,
    Button, Grid, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RetailerDetail from './RetailerDetail';


export default function RetailerDialog(props) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const registered = props.registered ? props.registered : ['No Register Retailer']
    const all = props.allRetailers ? props.allRetailers.map(retailer => retailer.id) : []

    const available = all.filter(function (item) {
        return !registered.includes(item);
    });


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddRoundedIcon />}
                onClick={handleOpen}

            >
                Retailer
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}

            >
                <Grid container direction='row'>
                    <Grid item xs={6}>
                        <DialogTitle>
                            Retailer List
                        </DialogTitle>
                        <DialogContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Detail</TableCell>
                                        <TableCell>Logo</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Address</TableCell>
                                    </TableRow>
                                </TableHead>

                                {registered.map((retailer,key) => <RetailerDetail key={key} id={retailer}/>)}

                            </Table>

                        </DialogContent>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogTitle>
                            Available Retailers
                        </DialogTitle>
                        <DialogContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Detail</TableCell>
                                        <TableCell>Logo</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                {available.map((retailer,key) => <RetailerDetail key={key} id={retailer} />)}
                            </Table>
                        </DialogContent>
                    </Grid>


                </Grid>
            </Dialog>
        </div>
    )
}