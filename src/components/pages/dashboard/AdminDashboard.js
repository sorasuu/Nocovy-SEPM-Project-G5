import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect, populate } from "react-redux-firebase";
import { compose } from "redux";
import MaterialTable from "material-table";
import { NavLink } from 'react-router-dom';
import {
    Tab, Tabs, Box, Card, Button, Icon,
    Typography, withStyles, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import { approveUser, declineUser, createEmail } from '../../store/actions/adminAction';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    DialogContentText,
    TextField
} from "@material-ui/core";
import { checkArray } from './Dashboard';
import moment from 'moment'


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
        minHeight: 800,
        width: '90%',
        justifyContent: 'left',
        alignItems: 'top',
        marginLeft: '5%'

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
                { title: "Name", field: 'displayName' },
                { title: "Email", field: "email" },
                { title: 'Type', field: 'type' },
                { title: "Address", field: "address" },
            ],
            openApprove: false,
            openPending: false,
            index: 0,
            email: false,
            id: '',
            displayName: '',
            content: '',
            subject: '',
            emailAddress:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleApproved = this.handleApproved.bind(this);
        this.handleClickNoti = this.handleClickNoti.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeTextField= this.handleChangeTextField.bind(this)
        this.handleSendEmail = this.handleSendEmail.bind(this)
    }

    handleChange(e, newValue) {
        console.log("Admin Change Value", e)
        console.log('new value', newValue)
        this.setState({ value: newValue });
    }
    handleChangeTextField(e){
        this.setState({
            [e.target.id]: e.target.value
          })
    }

    handleOpenApprove(event, id) {
        this.setState({ openApprove: true, openPending: false, index: id })
    }
    handleOpenPending(event, id) {
        this.setState({ openPending: true, openApprove: false, index: id })
    }

    handleApproved(event, uid) {
        // this.update()    
        this.props.approveUser(uid)
    }

    handleCancel(id) {
        this.props.declineUser(id)
    }
    handleClickNoti() {
        this.setState({ openApprove: false, openPending: false })
    }
    handleSendEmail(e) {
        this.setState({email: false})
        var email = { emailTo: this.state.emailAddress , displayName: this.state.displayName, content: this.state.content, subject: this.state.subject}
        
        this.props.createEmail(email)
    }
    handleOpenEmail(data) {
        console.log('send email', data)
        this.setState({ email: true, id: data.id, displayName: data.displayName, emailAddress:data.email })
    }
    handleClose(e) {
        this.setState({ email: false })
    }


    render() {

        const { classes, users } = this.props;
        console.log("users admin dashboard: ", users)
        const usersApprove = checkArray(users).filter(user => user.pending === false)
        const usersPending = checkArray(users).filter(user => user.pending === true)
        const { value, columns, index } = this.state

        const TableApproval = () => {
            return (
                <MaterialTable
                    title=""
                    columns={columns}
                    data={usersApprove}
                    actions={[
                        {
                            icon: "image",
                            tooltip: "Applied Files",
                            onClick: (event, rowData) => {
                                this.handleOpenApprove(event, rowData.tableData.id)
                            }
                        },
                        {
                            icon: "email",
                            tooltip: "Email",
                            onClick: (event, rowData) => { this.handleOpenEmail(rowData) }
                        },
                        {
                            icon: 'cancel',
                            tooltip: 'Cancel',
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
                            icon: "image",
                            tooltip: "Applied Files",
                            onClick: (event, rowData) => {
                                this.handleOpenPending(event, rowData.tableData.id)
                            }
                        },
                        {
                            icon: 'cancel',
                            tooltip: 'Cancel',
                            onClick: (event, rowData) => {
                                this.handleCancel(rowData.id)
                            }
                        }

                    ]}

                />
            );
        };

        const NotiManage = () => {
            const { notifications ,notificationsdata} = this.props;
            console.log(notifications,notificationsdata)
            return notifications&&notificationsdata? notifications.map(noti => {
                return (
                    <List key={noti.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={notificationsdata[noti.id].uid.logo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            className={classes.inline}
                                            color="textPrimary"
                                        > {notificationsdata[noti.id].uid.displayName}</Typography>
                                                  
                                    { "        "+ moment(noti.time.toDate()).fromNow()} 
                                    
                                    </React.Fragment>
                                }
                                secondary={
                                    
                                        <Typography
                                            component="span"
                                            variant="body2"
                                
                                            color="textPrimary"
                                        >
                                            {noti.content} 
                              
                                        </Typography>
                                       
                                
                                }
                            />
                        </ListItem>
                    </List>
                );
            }):null;
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
                            <Tab label="Notification" {...a11yProps(2)} onClick={this.handleClickNoti} />

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
                            <NotiManage />
                        </TabPanel>
                    </Grid>

                    {this.state.openApprove ?
                        <Grid container item xs={3} md={3} lg={3} direction="row" style={{ margin: '1%' }}>
                            <Grid item xs={3} md={3} lg={3}>
                                <div style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'bold' }}>Detail:</div>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                                <NavLink to={`/${usersApprove[index].type}/${usersApprove[index].id}`}>
                                    <Button variant="contained" color="secondary">Profile Page</Button>
                                </NavLink>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3}>
                                <div style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'bold' }}>Name:</div>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                                <div style={{ textAlign: 'right', fontSize: '30px' }}>{usersApprove[index].businessName}</div>

                            </Grid>
                            <Grid item xs={3} md={3} lg={3}>
                                <div style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'bold' }}>Logo:</div>
                            </Grid>
                            <Grid item xs={7} md={7} lg={7}>
                                <ImageDialog title="Logo" image={usersApprove[index].logo} maxWidth="100px" />
                            </Grid>
                            <Grid>
                                <h4>Certification</h4>
                                {usersApprove[index].certificates.map((item, key) => <ImageDialog key={key} title="Certification" image={item} maxWidth="300px" />
                                )}

                            </Grid>


                        </Grid>
                        : null}
                    {this.state.openPending ?
                        <Grid container item xs={3} md={3} lg={3} direction="row" style={{ margin: '1%' }}>
                            <Grid item xs={3} md={3} lg={3}>
                                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', fontSize: '20px', fontFamily: 'bold' }}>Name:</div>
                            </Grid>
                            <Grid item xs={7} md={7} lg={7}>
                                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'right', fontSize: '30px' }}>{usersApprove[index].businessName}</div>

                            </Grid>
                            <Grid item xs={3} md={3} lg={3}>
                                <div style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'bold' }}>Logo:</div>
                            </Grid>
                            <Grid item xs={7} md={7} lg={7}>
                                <ImageDialog title="Logo" image={usersPending[index].logo} maxWidth="100px" />
                            </Grid>

                            <Grid>
                                <h4>Certification</h4>
                                {usersPending[index].certificates.map((item, key) => <ImageDialog key={key} title="Certification" image={item} maxWidth="300px" />)}
                            </Grid>

                        </Grid>
                        : null}

                </Grid>

                {this.state.email ?
                    <Dialog open={this.state.email} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'sm'}>
                        <DialogTitle id="form-dialog-title">New Email</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <div>To: {this.state.displayName}</div>
                                <TextField
                                    onChange={this.handleChangeTextField}

                                    autoFocus
                                    margin="dense"
                                    id="subject"
                                    label="Subject"
                                    type="text"
                                    fullWidth
                                    disableUnderline='true'
                                />
                            </DialogContentText>

                            <TextField
                                onChange={this.handleChangeTextField}
                                label="Email Content"
                                id='content'
                                multiline
                                rows={4}
                                style={{ width: '99%' }}
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                        </Button>

                            <Button
                                onClick={this.handleSendEmail}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<Icon>send</Icon>}
                            >
                                Send
      </Button>
                        </DialogActions>
                    </Dialog> : null
                }
            </div>
        );
    }
}

function ImageDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <img style={{ width: 'fit-content', maxWidth: `${props.maxWidth}` }} src={props.image} />
            </Button>
            <Dialog
                style={{ width: 'fit-content', direction: 'flex' }}
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <img style={{ direction: 'flex', justifyContent: 'center', alignItems: 'center' }} src={props.image} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
            </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
const populates = [
    { child: 'uid', root: 'users' }
]
const collection = 'notifications';

const mapStateToProps = (state) => {
    // console.log("haha", state.product);
    const notifications = populate(state.firestore, 'adminNotifications', populates)
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.allusers,
        notificationsdata: notifications,
        notifications: state.firestore.ordered.adminNotifications
       
    }
};

const mapDispatchToProps = dispatch => {
    return {
        approveUser: id => dispatch(approveUser(id)),
        declineUser: id => dispatch(declineUser(id)),
        createEmail: (email) => dispatch(createEmail(email))
    };
};

export default compose(

    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.auth.uid) {
            props.history.push("/")
        }
        else {
            return [
                { collection: 'users' , storeAs:'allusers'},
                {collection,where:[["tag","==","admin"]],populates,orderBy: [['time', 'desc']],storeAs:"adminNotifications"}

            ]
        }
    })
)(withStyles(useStyles)(AdminDashboard))