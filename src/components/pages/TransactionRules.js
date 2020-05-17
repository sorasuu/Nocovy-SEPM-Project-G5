import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Grid } from '@material-ui/core'
// import AddIcon from '@material-ui/icons/Add';
// import StyledButton from '../layout/StyledButton'
// import ProductDetailCard from '../layout/ProductDetailCard'
// import ColorLinearProgress from '../layout/ColorLinearProgress'
// import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class TransactionRules extends Component {

    render() {
        return (
            <div style={{ width: "60%", marginLeft: '20%' }}>
                <h1> Transaction Rules </h1>
                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Suppliers</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Wholesalers</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Retailers</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

        

            



            </div>
        )
    }
}

export default TransactionRules
