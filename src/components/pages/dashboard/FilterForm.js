import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Button, DialogTitle, Dialog, Input, FormControl, InputLabel, Select, Chip, MenuItem } from '@material-ui/core';
import { checkArray } from './Dashboard'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    display: {
        margin: theme.spacing(0.5)
    }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function Form(props) {
    const classes = useStyles()
    const { open } = props;
    const theme = useTheme();

    const handleChange = (event) => {
        props.setCategory(event.target.value);
    };

    // const handleListItemClick = (value) => {
    //   onClose(value);
    // };


    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choose Product Categories:</DialogTitle>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={props.category}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.categories.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, props.category, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={props.onClose}>Submit</Button>
            </FormControl>
            
        </Dialog>
    );
}
export default function FilterForm(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const [selectedCategories, setCategory] = React.useState([]);
    const allCategories = props.allCategories
    const handleClickOpen = () => {
        setOpen(true);
    };

    
    const handleClose = (value) => {
        setOpen(false);
        props.handleFilter(selectedCategories)
    };
    const handleDelete = (chipToDelete) => () => {
        setCategory((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    
    return (
        <div>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Filter dialog
            </Button>
            <Form
                categories={allCategories}
                category={selectedCategories}
                setCategory={setCategory}
                open={open} onClose={handleClose} />
                <Paper component="ul" className={classes.root}>
                {selectedCategories.map((data, key) => {
                    let icon;
                    return (
                        <li key={key}>
                            <Chip
                                icon={icon}
                                label={data}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
        </div>
    );
}