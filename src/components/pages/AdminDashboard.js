import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import MaterialTable from "material-table";
import SalerProfile from './SalerProfile'
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
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: '100%',
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'5%'
        
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
            data: [     
                {
                    id: 1, name: 'Amazon', 
                    address: 'Amazon VN', email: 'amazon@email.com', 
                    pending: false,
                    products: [
                        {
                        id: '1',
                        product: 'Pen',
                        retailer: 'Allen'
                        },
                        {
                        id: '2',
                        product: 'Pen',
                        retailer: 'Adam'
                        },
                        {
                        id: '3',
                        product: 'Pen',
                        retailer: 'Allen'
                        },  {
                        id: '4',
                        product: 'Pen',
                        retailer: 'Bob'
                        },
                    ]
                },
                {
                    id: 2, name: 'Adidas', 
                    address: 'Adidas Hanoi', email: 'adidas@email.com', 
                    pending: false,
                    products: [
                        {
                        id: '1',
                        product: 'Pen',
                        retailer: 'Allen'
                        },
                        {
                        id: '2',
                        product: 'Pen',
                        retailer: 'Adam'
                        },
                        {
                        id: '3',
                        product: 'Pen',
                        retailer: 'Allen'
                        },  {
                        id: '4',
                        product: 'Pen',
                        retailer: 'Bob'
                        },
                        {
                        id: '5',
                        product: 'Pencil',
                        retailer: 'Rachel'
                        },
                        {
                        id: '6',
                        product: 'Pencil',
                        retailer: 'Wahlin'
                        },  {
                          id: '7',
                          product: 'Pencil',
                          retailer: 'Bob'
                        },
                        {
                          id: '8',
                          product: 'Camera',
                          retailer: 'Allen'
                        },
                        {
                          id: '9',
                          product: 'Alexa',
                          retailer: 'Wahlin'
                        }
                        ],
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2zwZyVeYZTsSm9eJcuzre2hYadL_-9xooEmXsXbKsItJzUreC&usqp=CAU"
                },
                {
                    id: 3, name: 'Bose', 
                    address: 'Bose HCMC', email: 'bose@email.com', 
                    pending: true,
                    logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2zwZyVeYZTsSm9eJcuzre2hYadL_-9xooEmXsXbKsItJzUreC&usqp=CAU"
                },
                {
                    id: 4, name: 'Tiki', 
                    address: 'tiki Hanoi', email: 'tiki@email.com', 
                    pending: true
                }
            ],
            open: false,
            index: '',

        });
        this.handleChange = this.handleChange.bind(this);
        this.handleApproved= this.handleApproved.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({ value: newValue });
        
    }

    handleOpen(event, id) {
        this.setState({ open: !this.state.open , index: id})
    }

    handleApproved(event, id){
        var selectItem = this.state.data.findIndex(item => item.id == event)
        // this.update()
        console.log("Change to Approved")
        
    }

    render() {
       
        const { classes, auth } = this.props;
        const { data, value, columns} = this.state
        const dataApprove = data.filter(comp =>{
            return comp.pending == false
        })
        const dataPending = data.filter(comp => {
            return comp.pending == true
        })
        
        const TableApproval = () => {
            return (
                <MaterialTable
                    title=""
                    columns={columns}
                    data={dataApprove}
                    actions={[
                        {
                            icon: "info",
                            tooltip: "detail",
                            onClick: (event, rowData) => {
                                this.handleOpen(event, rowData.id)
                            }
                        },
                        {
                            icon: "email",
                            tooltip: "email",
                            onClick: (event) => alert("Email Sent")
                        },
                
                        
                    ]}
                    options={
                        {
                            paging: false,
                            // actionsColumnIndex: -1
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
                    columns={columns}
                    data={dataPending}
                    options={
                        {
                            paging: false,
                            // actionsColumnIndex: -1
                        }
                    }
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
                                this.handleOpen(event, rowData.id)
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
                <Grid item xs={2} md={2} lg={2}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
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
                        <TabPanel value={value} index={0}>
                            <TableApproval />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TablePending />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {/* <NotiManage /> */}
                        </TabPanel>
                    </Grid>     
                   
                        {this.state.open ? 
                        <Grid container spacing={2} item xs={6} md={6} lg={6} >
                            <SalerProfile data={data} id={this.state.index}/>
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