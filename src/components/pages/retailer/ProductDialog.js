import React, { useState, Fragment } from 'react';
import {
    Dialog, DialogContent, DialogTitle,
    Button, Grid, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ProductDialogDetail from './ProductDialogDetail';


export default function ProductDialog(props) {
    const [open, setOpen] = useState(false)
    
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    // console.log('dialog open props', props)
    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddRoundedIcon />}
                onClick={handleOpen}

            >
                Invite
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
            >
                <ProductDialogDetail currentRetailer ={props.currentRetailer} currentUser={props.currentUser} handleClose={handleClose}/>
            

            </Dialog>
        </div>
    )
}