import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class FAQ extends Component {

    render() {
        return (
            <div style={{ width: "60%", marginLeft: '20%' }}>
                <h1> FAQ </h1>
                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Am I eligible for wholesale/retail terms?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            To be eligible for wholesale/retail terms, you must be a business or organization (not an individual) with a physical or online sales location and sell a range of products from multiple vendors.
                            Examples of retail accounts include bookstores, gift stores, museum shops, children's specialty stores and teacher supply stores. Examples of wholesale accounts include library suppliers, literacy organizations and book distributors.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>How do I sign up as a wholesaler or retailer?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        In order to become a retail customer, please complete the retail inquiry form and upload a current reseller certificate.  
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Do you have an order minimum for wholesalers/retailers?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        We do not have a minimum order requirement for online orders.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Do you offer special terms for bulk orders?</Typography>
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
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Do you accept backorders?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            We currently do not accept backorders on our website.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>What payments do you accept?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        We accept orders online with Visa and MasterCard.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>What is your return policy?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        We do not offer returnable terms for online orders.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>What do I do if I'm having trouble with this website?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        Email Nocovy with a description of the problem.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography style={{ fontsize: "theme.typography.pxToRem(15)" }}>Where can I find your site's privacy policy and terms of service?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        Click <Link to="/privacypolicy">here</Link> for our privacy policy and <Link to="/tos">here</Link> for terms of service.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

export default FAQ
