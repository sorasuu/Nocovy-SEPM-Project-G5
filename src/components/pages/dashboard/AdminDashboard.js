import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import MaterialTable from "material-table";
import {NavLink} from 'react-router-dom';
import {
    Tab, Tabs, Box, Card, Button,
    Typography, withStyles, Grid
} from "@material-ui/core";
import { approveUser, declineUser } from '../../store/actions/adminAction';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from "@material-ui/core";
import { checkArray } from './Dashboard';


export function TabPanel(props) {
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

export function a11yProps(index) {
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
        minHeight:800,
        width:'90%',
        justifyContent:'left',
        alignItems:'top',
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
        this.state = {
            value: 0,
            columns: [
                { title: "Business", field: "businessName" },
                { title: "Name", field:'displayName'},
                { title: "Email", field: "email" },
                { title: 'Type', field: 'type'},
                { title: "Address", field: "address" },
            ],
            openApprove: false,
            openPending: false,
            index: 0,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleApproved= this.handleApproved.bind(this);
        this.handleClickNoti= this.handleClickNoti.bind(this);
       
    }

    handleChange(e, newValue) {
        console.log("Admin Change Value", e)
        console.log('new value', newValue)
        this.setState({ value: newValue });
        
    }

    handleOpenApprove(event, id) {
        this.setState({ openApprove: true , openPending: false, index: id})  
    }
    handleOpenPending(event, id){
        this.setState({ openPending: true, openApprove: false, index : id})
    }

    handleApproved(event, uid){
        // this.update()    
        this.props.approveUser(uid)
    }

    handleCancel(id){
        this.props.declineUser(id)
    }
    handleClickNoti(){
        this.setState({openApprove: false, openPending:false})
    }
    
    render() {
       
        const { classes, users} = this.props;
        console.log("users admin dashboard: ", users)
        const usersApprove = checkArray(users).filter(user => user.pending === false)
        const usersPending = checkArray(users).filter(user => user.pending === true)
        const {value, columns, index} = this.state
        
        console.log("users A", usersApprove, "users P", usersPending)
        const TableApproval = () => {
            return (
                <MaterialTable
                    title=""
                    columns={columns}
                    data={usersApprove}
                    actions={[
                        {
                            icon:"image",
                            tooltip: "Applied Files",
                            onClick: (event, rowData) => {
                                this.handleOpenApprove(event, rowData.tableData.id)
                            }
                        },
                        {
                            icon: "email",
                            tooltip: "Email",
                            onClick: (event) => alert("Email Sent")
                        },
                        {
                            icon:'cancel',
                            tooltip:'Cancel',
                            onClick: (event, rowData) => {
                                this.handleCancel(rowData.id)
                            } 
                        }
                    ]}
                   
                    options={
                        {
                            paging: false,
                            // actionsColumnIndex: -1
                        }
                    }
                    
                />
            );
        };
        const TablePending = () => {
            return (
                <MaterialTable
                    title=""
                    columns={columns}
                    data={usersPending}
                    options={
                        {
                            paging: false,
                            // actionsColumnIndex: -1
                        }
                    }
                    actions={[
                        {
                            icon: "check",
                            tooltip: "Approve",
                            onClick: (event, rowData) => {
                                // alert("Approved " + rowData.id + "but dont change haha")
                                this.handleApproved(event, rowData.id 
                                    // rowData.tableData.id
                                    )
                            }
                        },
                        {
                            icon:"image",
                            tooltip: "Applied Files",
                            onClick: (event, rowData) => {
                                this.handleOpenPending(event, rowData.tableData.id)
                            }
                        },
                        {
                            icon:'cancel',
                            tooltip:'Cancel',
                            onClick: (event, rowData) => {
                                this.handleCancel(rowData.id)
                            } 
                        }
                        
                    ]}
                   
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
            <Grid container spacing={1}>
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
                        <Tab label="Notification" {...a11yProps(2)} onClick={this.handleClickNoti}/>

                    </Tabs>
                </Grid>
             
                    <Grid item xs={6} md={6} lg={6}>
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
                   
                    {this.state.openApprove ?
                        <Grid container item xs={4} md={4} lg={4} justify='center' alignItems="center">
                                <div>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <NavLink to={`/${usersApprove[index].type}/${usersApprove[index].id}`}>
                                            <Button>Profile</Button>
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <h4>{usersApprove[index].businessName}</h4>
                                       
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <h4>Logo</h4>
                                        <img style={{width:'auto', maxHeight:200}} src={usersApprove[index].logo}/>
                                    </Grid>
                                    <Grid>
                                        <h4>Certification</h4>
                                        <img style={{width:'auto', height:'auto',maxHeight:400}} src={usersApprove[index].certificates}/>
                                    </Grid>
                                </div>
                                
                        </Grid> 
                    : null}
                    {this.state.openPending ?
                        <Grid container item xs={4} md={4} lg={4} >
                                <div>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <h4>Logo</h4>
                                        <img src={usersPending[index].logo}/>
                                    </Grid>
                                    <Grid>
                                        <h4>Certification</h4>
                                        <img src={usersPending[index].certificate}/>
                                    </Grid>
                                </div> 
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
        users: state.firestore.ordered.users,
        // usersPending: state.firestore.ordered.usersPending,
        // usersApprove: state.firestore.ordered.usersApprove,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        approveUser: id => dispatch(approveUser(id)),
        declineUser: id => dispatch(declineUser(id))
    };
};

export default compose(

    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props)=>{
        if(!props.auth.uid){
            props.history.push("/")
        }
        else{
            return[
                {collection:'users'}, 
                // { collection: 'users', where:[["pending","==",true]], storeAs:'usersPending' },
                // { collection: 'users', where:[["pending","==",false]], storeAs:'usersApprove' },
                
            ]
        }
    })
)(withStyles(useStyles)(AdminDashboard))