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
import {TextField, InputAdornment} from '@material-ui/core'

//SET DEFAULT VALUES FOR DROPZONE AND NEW INFO. SHIT DON'T GET RESET WHEN YOU CLICK OFF THE PAGE AND CLICK ON AGAIN

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

const EditProductCard = (props) => {
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cx(classes.header, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title='Edit Product'
            />
            <CardContent className={classes.content}>
            <div>
                <div className={classes.form}>
                    <form style={{margin:'2%', textAlign:'left'}}>
                        <TextField style={{marginBottom:'2%'}} label='Product Name' defaultValue={props.values.newProductName} onChange={props.handleChange('newProductName')}></TextField>
                        <ChipInput
                            style={{marginBottom:'2%'}}
                            label='Categories'
                            fullWidth
                            defaultValue={props.values.newCategory}
                            onChange={(chips) => props.handleCatChange(chips)}
                        />
                        <TextField multiline style={{marginBottom:'2%'}} fullWidth label='Product Description' defaultValue={props.values.newProductDesc} onChange={props.handleChange('newProductDesc')}></TextField>
                        <TextField type='number' style={{marginBottom:'2%'}} label='Unit Cost' defaultValue={props.values.newUnitCost} onChange={props.handleChange('newUnitCost')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField type='number' style={{marginBottom:'2%'}} label='Duty Rate (%)' defaultValue={props.values.newDutyRate} onChange={props.handleChange('newDutyRate')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField type='number' style={{marginBottom:'2%'}} label='Margin (%)' defaultValue={props.values.newMargin} onChange={props.handleChange('newMargin')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField><br/>
                        <TextField type='number' style={{marginBottom:'2%'}} label='Unit Price' disabled value={Number(props.values.newUnitCost) * ((100 + Number(props.values.newMargin) + Number(props.values.newDutyRate))/100)}
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
                        <StyledButton onClick={(e) =>{props.closeModal()}} style={{marginRight:10}}>Cancel</StyledButton>
                        <StyledButton onClick={(e) =>{props.saveEdit()}}>Save</StyledButton>
                </div>
            </div>
            </CardContent>
        </Card>
    );
};


export default EditProductCard;