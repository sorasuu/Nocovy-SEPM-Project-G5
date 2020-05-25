import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained'
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import StyledButton from '../../layout/StyledButton'
import {DropzoneArea} from 'material-ui-dropzone'
import ChipInput from 'material-ui-chip-input'
import {TextField, InputAdornment, InputLabel, Select, Input, Chip, MenuItem, FormControl, FormHelperText} from '@material-ui/core'
import { MenuProps } from '../dashboard/Dashboard'
//SET DEFAULT VALUES FOR DROPZONE AND NEW INFO. SHIT DON'T GET RESET WHEN YOU CLICK OFF THE PAGE AND CLICK ON AGAIN
import { allCategories } from '../dashboard/Dashboard'
const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        marginTop: "2%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
    header:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        left: "50%",
        width: 'auto',
        textAlign:'center',
        transform: 'translate(-50%, 15%)'
    },
    content: {
        margin: "2%",
        marginTop:'4%',
        width:'100%',

    },
    form: {
        textAlign:'center',
        overflowY: 'auto',
        maxHeight: '65vh',
    },
    buttonGroup: {
        display:'flex',
        justifyContent:'flex-end',
        marginTop: '3%',
    }
}));

const AddProductCard = (props) => {
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title='Create Product'
            />
            <CardContent className={classes.content}>
            {{ 1: <div>
                <div className="form-group">
                    <label htmlFor="image" >Image(s)</label>
                    <br/>
                    <DropzoneArea
                            onChange={props.handleChangeImg}
                            acceptedFiles={['image/*']}
                            maxFileSize={500000}
                            filesLimit = {4}
                            dropzoneText={'Upload your product Image here'}
                    />
                </div>
                <div className={classes.buttonGroup}>
                    <StyledButton onClick={(e) =>{props.closeModal()}} style={{marginRight:10}}>Cancel</StyledButton>
                    <StyledButton onClick={(e) =>{props.handleUpload(e)}}>Next</StyledButton>
                </div>
            </div>,
            
            2: <div>
                <div className={classes.form}>
                    <form style={{margin:'2%', textAlign:'left'}}>
                        <TextField error={props.values.nameError} helperText='Product name must be between 0 and 256 characters' required multiline style={{marginBottom:'2%'}} label='Product Name' onChange={props.handleChange('productName')}></TextField><br/>
                        <FormControl error={props.values.categoriesError}>
                            <InputLabel htmlFor="circle">
                                Category Selection
                            </InputLabel>
                            <Select
                                multiple
                                displayEmpty
                                defaultValue={props.values.productCategories}
                                value={props.values.productCategories}
                                onChange={props.handleCatChange}
                                input={<Input name="category" id='category-chip' />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            MenuProps={MenuProps}
                            >
                                {allCategories.map((name, key) => (
                                    <MenuItem key={key} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Product must belong to at least one or multiple categories chosen from the list</FormHelperText>
                        </FormControl>
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Product Description' onChange={props.handleChange('productDesc')}></TextField>
                        <TextField error={(props.values.unitCostError !== '')} helperText={props.values.unitCostError} required type='number' style={{marginBottom:'2%'}} label='Unit Cost' value={props.values.unitCost} onChange={props.handleChange('unitCost')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField error={(props.values.dutyRateError !== '')} helperText={props.values.dutyRateError} type='number' style={{marginBottom:'2%'}} label='Duty Rate (%)' value={props.values.dutyRate} onChange={props.handleChange('dutyRate')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField error={(props.values.marginError !== '')} helperText={props.values.marginError} type='number' style={{marginBottom:'2%'}} label='Margin (%)' value={props.values.margin} onChange={props.handleChange('margin')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField type='number' style={{marginBottom:'2%'}} label='Unit Price' disabled value={(Number(props.values.unitCost) * ((100 + Number(props.values.margin) + Number(props.values.dutyRate))/100)).toFixed(2)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>
                    </form>    
                </div>
                <div className={classes.buttonGroup}>
                        <StyledButton onClick={(e) =>{props.prevStep()}} style={{marginRight:10}}>Back</StyledButton>
                        <StyledButton onClick={(e) =>{props.formSubmit(e)}}>Create</StyledButton>
                </div>
            </div>
            }[props.step]}
            </CardContent>
        </Card>
    );
};


export default AddProductCard;