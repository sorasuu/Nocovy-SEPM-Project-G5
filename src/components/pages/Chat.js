import React, { Component } from 'react';
import cx from 'clsx';
import { createChatSession, sendMessage } from '../store/actions/chatActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { Redirect, NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { fade } from '@material-ui/core/styles'
import firebase from 'firebase/app';
import {
    Card,
    CardContent,
    CardHeader,
    Divider, Grid,
    Container,
    Paper,
    TextField,
    InputAdornment,
    Typography,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    ListItem,
    withStyles
} from '@material-ui/core'
import StyledButton from '../layout/StyledButton'

const useStyles = makeStyles((theme) => ({
    contactsCard: {
        marginTop: "10%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
        display: 'flex',
        height: '100%',
        position: "relative"
    },
    contactsContent: {
        textAlign: 'center',
        overflowX: 'auto',
        paddingTop: '12%',
        width: '100%'
    },
    contactsHeader: {
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        left: "50%",
        width:'40%',
        transform: 'translate(-50%, 15%)'
    },

}));

const useStyles1 = theme => ({
    chatMenu: {
        // marginTop: "10%",
        // display: 'flex',
        // position: "relative"
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
        // height: '100%',
        paddingTop: "5px",
        paddingLeft: "5%",
        paddingRight: "5%",

    },
    

})
export const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "who'll win?",
    },
    {
        senderId: "janedoe",
        text: "who'll win?",
    },
    {
        senderId: "placeholder",
        text: "hello world",
    }
]

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

//CONTACTS COMPONENT
export const ChatContact = (props) => {
    console.log('CHAT contact', props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card className={cx(classes.contactsCard, cardShadowStyles.root)}>
            <CardHeader
                className={cx(classes.contactsHeader, cardHeaderShadowStyles.root)}
                classes={cardHeaderStyles}
                title={"Contacts"}
            />
            <CardContent className={classes.contactsContent} >
                <TextField
                    variant='outlined'
                    fullWidth
                    id="search"
                    label="Search contacts"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => props.handleChange(e)}
                />
                <Divider style={{ marginTop: '3%', marginBottom: '1%' }} />
                <List>
                    {props.chatsesion && props.chatuser ? props.chatsesion.map((contact) => {
                        var receiver;
                        if (contact.user1 === props.uid) {
                            receiver = props.chatuser[contact.user2]
                        } else {
                            receiver = props.chatuser[contact.user1]
                        }

                        return (
                            // <NavLink to={'/chat/'+contact.id}>
                            <ListItemLink href={'/chat/'+contact.id} divider dense button alignItems="flex-start" selected={contact.id === props.currentchatsession.id}>
                                <ListItemAvatar>
                                    <Avatar src={receiver?receiver.logo:null} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant='h6'>{receiver?receiver.displayName:null}</Typography>}
                                    secondary={
                                        <Typography variant='subtitle'> {receiver?contact.lastchat:null}</Typography>}
                                />
                            </ListItemLink>
                            // </NavLink>
                        )
                    }) : null}
                </List>
            </CardContent>
        </Card>
    );
};

export const MessageList = (props) => {
    console.log(props)
    var receiver;

   
    return (
        <div style={{maxHeight:'400px', height:'400px'}}>
            {props.messages && props.chatuser ? props.messages.map(message => {
                console.log(message)

                if (message.sender === props.uid) {
                    receiver = props.chatuser[message.receiver]
                    console.log(receiver)
                    return (
                        <ChatMsg
                            key={message.id}
                            side={'right'}
                            messages={[
                                message.context
                            ]}
                        />
                    )
                } else {
                    receiver = props.chatuser[message.sender]
                    console.log(receiver)
                    return (
                        <ChatMsg
                            key={message.id}
                            avatar={receiver?receiver.logo:null}
                            messages={[
                                message.context
                            ]}
                        />)
                }
               
                
            })
                : null
            }

        </div>
    )

}

export const SendMessageForm = (props) => {

    return (
        <form
            className='message-form'
        // onSubmit={this.handleSendMessage}
        >
            <div className='input-group'>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <input
                            type='text'
                            className='form-control message-input'
                            placeholder='Type something'
                            id='context'
                            value={props.context}
                            onChange={(e) => props.handleChange(e)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <StyledButton onClick={(e) => props.handleSendMessage(e)}>Send</StyledButton>
                    </Grid>
                </Grid>
            </div>
        </form>
    )
}

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            search: '',
            context: ''
        }
    }



    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.message !== this.state.message && this.props.typingListener) {
    //         this.props.typingListener();
    //     }
    //     // this.scrollToBottom();
    // }

    // dunno where to place this handleSendMessage
    handleSendMessage = event => {
        event.preventDefault();
        const receiver = this.props.match.params.id.replace(this.props.auth.uid, '');
        const chat = {
            id: this.props.match.params.id,
            message: {
                context: this.state.context,
                receiver: receiver
            }
        }
        console.log(chat)
        this.props.sendMessage(chat)
        this.setState({ context: '' })
    };

    onChange = e => {
        this.setState({ search: e.target.value })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        const { auth, classes } = this.props;
        const { search, users } = this.state;
        // somehow search function broke dafuk
        // const filteredUsers = users.filter(product => {
        //     return product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        // })
        
        if (!auth.uid) return <Redirect to='/signin' />
        console.log(this.props.match.params.id)
        return (
            <div>
                <Container>
                    <h3>Chat menu</h3>
                    <Grid container spacing={3}>
                        <Grid item xs={4}><ChatContact style={{maxHeight:'400px', height:'400px'}} props={this.props} handleChange={this.handleChange} currentchatsession={this.props.currentchatsession} chatsesion={this.props.chatsessionorder} search={search} chatuser={this.props.chatuser} uid={this.props.auth.uid} /></Grid>
                        <Grid item xs={8} style={{marginTop:"3%"}}><Paper className={classes.chatMenu}>
                            <div className='chat-box'>
                                <div className='msg-page'>
                                {this.props.chatuser&&this.props.auth&&this.props.match.params.id?
                                
                                    <h5 style={{ alignContent: 'center' }}>{this.props.chatuser[this.props.match.params.id.replace(this.props.auth.uid, '')]?this.props.chatuser[this.props.match.params.id.replace(this.props.auth.uid, '')].displayName:null}</h5>:null
                                }
                                
                                    <MessageList messages={this.props.messages} chatuser={this.props.chatuser} uid={this.props.auth.uid} />
                                </div>
                                <div className='msg-footer'>
                                    <SendMessageForm handleSendMessage={this.handleSendMessage} handleChange={this.handleChange} context={this.state.context} />
                                </div>

                            </div>
                        </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        )
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createChatSession: (chat) => dispatch(createChatSession(chat)),
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps)
    const id = ownProps.match.params.id
    const messages = state.firestore.ordered.thischatsesion
    const chatsession = state.firestore.data.allchatsesion
    const chatsessionorder = ownProps.chatsession
    const currentchatsession = chatsession ? chatsession[id] : null

    var userIdlist = []

    if (chatsessionorder !== undefined && chatsessionorder !== null) {
        var u;
        for (u in chatsessionorder) {
            if (chatsessionorder[u].user1 === state.firebase.auth.uid) {
                userIdlist.push(chatsessionorder[u].user2)
            } else {
                userIdlist.push(chatsessionorder[u].user1)
            }
        }
    }
    // console.log(userIdlist)
    // console.log(state.firestore.ordered.chatuser)
    return {
        auth: state.firebase.auth,
        messages: messages,
        currentchatsession: currentchatsession,
        chatsessionorder: chatsessionorder,
        userIdlist: userIdlist,
        chatuser: state.firestore.data.chatuser
    }

}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        console.log(props)
        if (props.match.params.id !== undefined) {
            if (props.userIdlist.length > 0 && props.chatuser === undefined && props.match.params.id !== undefined) {

                return [
                    { collection: 'users', where: ['uid', 'in', props.userIdlist], storeAs: 'chatuser' }]
            }
            return [{
                collection: 'chats',
                doc: props.match.params.id,

                // THIS IS BREAKING THE PAGE
                subcollections: [{ collection: 'chatDetail' }],
                orderBy: ['created', 'asc'],
                storeAs: 'thischatsesion'
            },]
        }
        else { return [] }
    })
)(withStyles(useStyles1)(Chat))
