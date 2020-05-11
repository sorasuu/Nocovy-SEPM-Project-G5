import React  from 'react'
import { MenuItem, FormControl, InputLabel, Select} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { checkArray } from './Dashboard'
export function getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])
  
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
  
      .map(e => arr[e]);
  
    return unique;
  }

const useStyles = makeStyles((theme) => ({
button: {
    display: 'block',
    marginTop: theme.spacing(2),
},
formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
},
}));

export default function FilterForm(props){
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    console.log(props.products)
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
    return(
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.item}
          onChange={props.filter}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {checkArray(props.products).map((product, key)=>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={product.category}
                onChange={props.filter}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                {checkArray(props.product).map((product, key)=>
                <MenuItem key={key} value ={ product.category }>{product.category}</MenuItem>
                )}
                
            </Select>
        </FormControl>)}
        </Select>
      </FormControl>
    )
}