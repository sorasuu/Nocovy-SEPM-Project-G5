import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import MaterialTable from "material-table";
import CompanyProduct from '../layout/CompanyProduct'
import {
    Tab, Tabs, Box, Card,
    Typography, withStyles, Grid
} from "@material-ui/core";

import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: '100%',
        width:'100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
    imageCard: {
        width: 'auto',
        maxWidth: '500px',
        height: 'auto',
        marginTop: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
});

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        (this.state = {
            value: 0,
            columns: [
                { title: "Name", field: "name" },
                { title: "Address", field: "address" },
                { title: "Email", field: "email" },
            ],
            dataApprove: [
               
                {
                    name: 'Amazon', address: 'Amazon VN', email: 'amazon@email.com'
                },
                {
                    name: 'Adidas', address: 'Adidas Hanoi', email: 'adidas@email.com'
                },
                {
                    name: 'Bose', address: 'Bose HCMC', email: 'bose@email.com'
                },
                {
                    name: 'Tiki', address: 'tiki Hanoi', email: 'tiki@email.com'
                }
            ],
            dataPending: [
                {
                    name: 'Tung', address: 'BaDinh HaNoi', email: 'tunglala@email.com'
                }
            ],
            open: false,

        });
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event, newValue) {
        this.setState({ value: newValue });
        console.log(this.state.value);
    }
    handleOpen(event) {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes, auth } = this.props;

        const TableApproval = () => {
            return (
                <MaterialTable
                    title=""
                    columns={this.state.columns}
                    data={this.state.dataApprove}
                    actions={[
                        {
                            icon: "info",
                            tooltip: "detail",
                            onClick: (event) => {
                                this.handleOpen(event)
                            }
                        },
                        {
                            icon: "email",
                            tooltip: "email",
                            onClick: (event) => alert("Email Sent")
                        }
                    ]}
                    options={
                        {
                            paging: false,
                            actionsColumnIndex: -1
                        }
                    }
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const dataApproval = [...prevState.dataApproval];
                                        dataApproval.push(newData);
                                        return { ...prevState, dataApproval };
                                    });
                                }, 600);
                            }),
                    
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const dataApproval = [...prevState.dataApproval];
                                        dataApproval.splice(dataApproval.indexOf(oldData), 1);
                                        return { ...prevState, dataApproval };
                                    });
                                }, 600);
                            })
                    }}
                />
            );
        };
        const TablePending = () => {
            return (
                <MaterialTable
                    title=""
                    columns={this.state.columns}
                    data={this.state.dataPending}
                    actions={[
                        {
                            icon: "check",
                            tooltip: "approve",
                            onClick: (event, rowData) => {
                                this.handleApproved(rowData.id);
                            }
                        },
                        {
                            icon: "info",
                            tooltip: "detail",
                            onClick: (event, rowData) => {


                            }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const dataPending = [...prevState.dataPending];
                                        dataPending.push(newData);
                                        return { ...prevState, dataPending };
                                    });
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const dataPending = [...prevState.dataPending];
                                        dataPending.splice(dataPending.indexOf(oldData), 1);
                                        return { ...prevState, dataPending };
                                    });
                                }, 600);
                            })
                    }}
                />
            );
        };


        const NotiManage = () => {
            const { notifications } = this.props;
            return notifications.map(noti => {
                return (
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://firebasestorage.googleapis.com/v0/b/sepm-nocovy.appspot.com/o/LogoNocovy.png?alt=media&token=d9ea6b4b-27c5-4bb6-83b0-06d9dc1d38e1" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={noti.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {noti.user}
                                        </Typography>
                                : {noti.content} at {noti.address}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                );
            });
        };
        return (
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={1} md={1} lg={1}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Approved" {...a11yProps(0)} />
                        <Tab label="Pending" {...a11yProps(1)} />
                        <Tab label="Notification" {...a11yProps(2)} />

                    </Tabs>
                </Grid>
             
                    <Grid item xs={4} md={4} lg={4}>
                        <TabPanel value={this.state.value} index={0}>
                            <TableApproval />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            <TablePending />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <NotiManage />
                        </TabPanel>
                    </Grid>     
                   
                        {this.state.open ? 
                        <Grid container spacing={2} item xs={7} md={7} lg={7}>
                            <Grid item xs={4} md={4} lg={4} style={{padding:"1% 1% 1% 1%"}}>
                                <h4>Logo</h4>
                                <img src="data:image/png;base64,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" />
                                <h4>Business Certification</h4>
                                <img src="https://thanhlapdoanhnghiepvn.vn/Uploads/images/dang-ky-giay-phep-kinh-doanh-doanh-nghiep(1).jpg" />
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                                <CompanyProduct/>
                            </Grid>
                        </Grid>

                    : null}
               
            </Grid>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log("haha", state.product);
    return {
        auth: state.firebase.auth,
    }
};

export default compose(

    connect(mapStateToProps),

)(withStyles(useStyles)(AdminDashboard))