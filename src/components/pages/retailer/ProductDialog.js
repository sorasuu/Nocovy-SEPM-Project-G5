import React, { useState, Fragment } from 'react';
import {
    Dialog, Modal, DialogContent, DialogTitle,
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
                Request
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={{maxWidth:'70%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',}}>
                    <ProductDialogDetail currentRetailer ={props.currentRetailer} currentUser={props.currentUser} handleClose={handleClose}/>   
                </div>
            </Modal>
        </div>
    )
}