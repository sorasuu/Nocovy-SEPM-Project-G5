import React, { Component } from 'react'
import { Button, withStyles, CardContent, Card, CardHeader, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Modal, Paper } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { createChatSession, sendMessage, changeChatSession } from '../store/actions/chatActions'
import { connect } from 'react-redux'
import { useFirestoreConnect, firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, NavLink } from 'react-router-dom';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
// import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
export const DefaultChatMsg = (props) => (

    <div>
        {props.messages ? props.messages.map(message => {
            if (message.sender === props.uid) {
                console.log(props)
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
                console.log(props)
                return (
                    <ChatMsg
                        key={message.id}
                        avatar={props.receiver.logo}
                        messages={[
                            message.context
                        ]}
                    />)
            }
        }) : null}

    </div>
);



const useStylesCard = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '350px',
        height: '400px',
        overflow: 'initial',
        background: '#ffffff',
        right: '30px',
        bottom: '30px',
    },
    content: {
        overflow: 'auto',
        marginLeft: "5%",
        // minHeight:'550px',
        // minWidth: '500px',
    },
    input: {

    },
    root: {
        width: '100%',


    },
    inline: {
        display: 'inline',
    },
}));
const ContactPanel = (props) => {
    console.log('chat props', props)

    const classes = useStylesCard();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "fixed", marginBottom: '2%', marginRight: '1%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Contact"}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content} style={{ maxHeight: 300, height: 300, overflow: 'auto', marginTop: '5%' }} >

                <div >
                    
                    <List className={classes.root}>
                    {props.chatsession&&props.chatusers?props.chatsession.map(chatse=>{
                        const chatses = props.chatsesiondata[chatse.id]
                        var receiver;
                        console.log("chatsesion",chatses)
                        if(chatses.user1===props.uid){
                            receiver = props.chatusers[chatses.user2]
                        }else{
                            receiver = props.chatusers[chatses.user1]
                        }
                        console.log(receiver)
                        return(
                        <div>
                           { receiver?
                        <ListItem 
                        button 
                        onClick={()=>props.handleChangeChatSession(chatse.id)}
                        alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="avatar" src={receiver.logo?receiver.logo:null} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={receiver.displayName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                             {chatses.lastchat?chatses.lastchat:null}
                                        </Typography>
                                       
                                    </React.Fragment>
                                }
                            />
                        </ListItem>:null}
                        <Divider variant="inset" component="li" />
                        </div>)
                    }):null}
                    </List>
                </div>

            </CardContent>

        </Card>
    );
};
//Long card
const ChatPanel = (props) => {
    console.log('chat props', props)
    const receiverId = props.chatId.replace(props.uid, '');
    const currentchatsession = props.chatsesiondata[props.chatId] ? props.chatsesiondata[props.chatId] : null
    var receiver
    if (currentchatsession !== undefined && currentchatsession !== null) {
        if (currentchatsession.user1 === receiverId) {
            receiver = props.chatusers[currentchatsession.user1]
        } else { receiver = props.chatusers[currentchatsession.user2] }
    }

    useFirestoreConnect(() => [
        {
            collection: 'chats',
            doc: props.chatId,

            // THIS IS BREAKING THE PAGE
            subcollections: [{ collection: 'chatDetail' }],
            orderBy: ['created', 'asc'],
            storeAs: 'thischatsesion'
        }
    ])
    let message = useSelector(({ firestore: { ordered } }) => ordered.thischatsesion)
    var messages = currentchatsession? currentchatsession.lastchat?message:null:null
    const classes = useStylesCard();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "fixed", marginBottom: '2%', marginRight: '1%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Chat"}
                subheader={receiver ? receiver.displayName : null}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-5%", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content} style={{ maxHeight: 300, height: 300, overflow: 'auto', marginTop: '5%' }} >

                <div >
                    <DefaultChatMsg messages={messages} uid={props.uid} receiver={receiver} />

                </div>

            </CardContent>
            <form onSubmit={(e) => props.handleSendMessage(e)}>
                <input
                    type='text'
                    className='form-control message-input'
                    placeholder='Send Message'
                    id='context'
                    value={props.context}
                    onChange={(e) => props.handleChange(e)}

                    required
                    style={{ marginTop: '2%', width: '90%' }}
                />
            </form>
        </Card>
    );
};

class ChatWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: '',
            context: '',
            chatId: '',
            open: true,
            chatwindow: true,
            contactwindow: false,
        }
    }
    handleSendMessage = event => {
        event.preventDefault();
        if (this.state.context !== null && this.state.context !== undefined && this.state.context.trim() !== '') {
            const receiver = this.props.chatId.replace(this.props.auth.uid, '');
            const chat = {
                id: this.props.chatId,
                message: {
                    context: this.state.context,
                    receiver: receiver
                }
            }
            console.log(chat)
            this.props.sendMessage(chat)
            this.setState({ context: '' })
        }
    };


    handleContactClicked = e => {
        this.setState({ contactwindow: !this.state.contactwindow, chatwindow: !this.state.chatwindow })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeChatSession=(id)=>{
        this.setState({chatId:id,contactwindow: !this.state.contactwindow, chatwindow: !this.state.chatwindow})
        this.props.changeChatSession(id)
    }
    // componentDidMount(){
    //     this.setState({chatId:sessionStorage.getItem('chatId')})

    // }
    componentDidUpdate(prevState, prevProps) {
        if (this.props.chatsession !== null && this.props.chatsession !== undefined && prevProps.chatsession !== this.props.chatsession) {
            if (this.props.chatsession.length > 0 && prevProps.chatsession < this.props.chatsession) {
                const chatId = this.props.chatsession[0].id
                this.props.changeChatSession(chatId)
                this.setState({ chatId: chatId })
            }
        }
        if (prevProps.chatId !== this.props.chatId) {
            this.setState({ chatId: this.props.chatId })
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.chatId !== prevState.chatId) {
            return { chatId: nextProps.chatId };
        }
        else return null;
    }
    render() {
        const { auth, classes } = this.props;
        const { search, users } = this.state;
        console.log("jjj",this.props)
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div>
                {this.props.chatId && this.state.chatId && this.props.chatsession && this.props.chatusers ? <div>
                    {this.state.chatwindow ? <ChatPanel handleChange={this.handleChange} chatId={this.state.chatId} context={this.state.context}
                        uid={this.props.auth.uid} handleSendMessage={this.handleSendMessage} chatsesiondata={this.props.chatsesiondata} chatusers={this.props.chatusers} /> : null}
                    <Paper style={{ width: '100px', right: '200px', bottom: '10px', position: 'fixed' }} >
                        <Button variant="outlined" color="primary" style={{ width: '100px' }} onClick={(e) => this.handleContactClicked(e)}>
                            {this.state.contactwindow? 'Chat' : 'Contacts'}
                    </Button></Paper>
                    {this.state.contactwindow ? <ContactPanel chatsession={this.props.chatsession} uid={this.props.auth.uid} chatsesiondata={this.props.chatsesiondata} chatusers={this.props.chatusers}
                     handleChangeChatSession={this.handleChangeChatSession}/> : null}
                </div>
                    : null}
               
                {/* <Container>
                    <Grid container spacing={3}>
                       

                    </Grid>
                </Container> */}
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createChatSession: (chat) => dispatch(createChatSession(chat)),
        sendMessage: (message) => dispatch(sendMessage(message)),
        changeChatSession: (id) => dispatch(changeChatSession(id))
    }
}
var loaded;
var userIdlist = new Set()
const mapStateToProps = (state, ownProps) => {
    console.log('chat widget', state)
    const chatsession = state.firestore.ordered.chatsesion ? state.firestore.ordered.chatsesion : null
    var id = sessionStorage.getItem('chatId')?sessionStorage.getItem('chatId'): ownProps.chatId ? ownProps.chatId : chatsession ? chatsession[0]?chatsession[0].id : null:null
    const status = state.firestore.status
    console.log(status.requesting.chatsesion)
    if (status.requested.chatsesion !== undefined && status.requesting.chatsesion !== undefined) {
        if (status.requested.chatsesion == true && status.requesting.chatsesion == false) {
            loaded = true
        }
    }
    

    if (chatsession !== undefined && chatsession !== null) {
        var u;
        for (u in chatsession) {
            if (chatsession[u].user1 === state.firebase.auth.uid) {
                userIdlist.add(chatsession[u].user2)
            } else {
                userIdlist.add(chatsession[u].user1)
            }
        }
    }
    console.log("asd",Array.from(userIdlist))
    return {
        auth: state.firebase.auth,
        chatuser: state.firestore.data.chatuser,
        chatId: id,
        chatsession: chatsession,
        loaded: loaded,
        userIdlist:Array.from(userIdlist),
        chatusers: state.firestore.data.chatuser,
        chatsesiondata: state.firestore.data.chatsesion
    }

}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        console.log("fetch data" ,props)
        if (props.userIdlist !==undefined && props.chatuser === undefined&&props.userIdlist !==null) {
            if(props.userIdlist.length>0){
            return [
                { collection: 'users', where: ['uid', 'in', props.userIdlist], storeAs: 'chatuser' }]
        }}
        return [
            {
                collection:'chats', where: [['chatsesion', 'array-contains', props.auth.uid]], queryParams: ['orderByChild=lastMod'], storeAs: 'chatsesion',orderBy: ['lastMod', 'desc']
            }]
    })
)(ChatWidget)