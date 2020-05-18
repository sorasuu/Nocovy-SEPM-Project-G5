import React, { useState } from 'react'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
    Paper, Button, DialogTitle,
    Dialog, Input, FormControl,
    InputLabel, Select, Chip,
    MenuItem, Switch, Grid, Typography
} from '@material-ui/core';
import SortByAlphaOutlinedIcon from '@material-ui/icons/SortByAlphaOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
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
    },
    
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
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
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title"><h6>Filter Products</h6></DialogTitle>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
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
                <br />
                <label>Sort by</label>

                <Grid container justify='center' alignItems="center" display="flex" spacing={2}>
                    <Grid item xs={6} ><Button onClick={props.handleSortKind}>{props.sortName ?
                        <p><SortByAlphaOutlinedIcon />Sort by Alphabet</p>
                        : <p><AttachMoneyOutlinedIcon />Sort by Price</p>}</Button></Grid>
                    <Grid item xs={6} >
                        {props.sortName ?
                            <Button onClick={props.handleSort}>{props.sortAsc ? <>A to Z</> : <>Z to A</>}</Button>
                            : <Button onClick={props.handleSort}>{props.sortAsc ? <p><TrendingUpOutlinedIcon />Low to High</p> : <p><TrendingDownOutlinedIcon />High to Low</p>}</Button>}
                    </Grid>
                </Grid>
                <Button onClick={props.onCancel}><Typography>Cancel</Typography></Button>
                <Button onClick={props.onSubmit} style={{backgroundColor:"#008CBA"}}><Typography style={{color:"white"}}>Submit</Typography></Button>
            </FormControl>

        </Dialog>
    );
}
export default function FilterForm(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const [selectedCategories, setCategory] = React.useState([]);

    // const allCategories = props.allCategories
    const handleClickOpen = () => {
        setOpen(true);
        props.handleFilterForm()
    };
    const handleSubmit = (value) => {
        setOpen(false);
        props.handleFilter(selectedCategories);

    };
    const handleCancel = () => {
        setOpen(false)
        setCategory([])
        props.handleCancelFilter()
    }
    const handleDelete = (chipToDelete) => () => {
        setCategory((chips) => chips.filter((chip) => chip !== chipToDelete)
        );
    };

    return (
        <div>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Filter
            </Button>
            <Form
                categories={props.allCategories}
                category={selectedCategories}
                setCategory={setCategory}
                sortAsc={props.sortAsc}
                sortName={props.sortName}
                handleSort={props.handleSort}
                handleSortKind={props.handleSortKind}
                open={open} onSubmit={handleSubmit} onCancel={handleCancel} />
            <Paper className={classes.root}>
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