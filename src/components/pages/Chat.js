import React, { Component } from 'react';
import cx from 'clsx';
import {createChatSession,sendMessage} from '../store/actions/chatActions'
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
import { fade } from '@material-ui/core/styles'
import firebase from 'firebase/app';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
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
    ListItem 
} from '@material-ui/core'
import StyledButton from '../layout/StyledButton'

const useStyles = makeStyles((theme) => ({
    contactsCard: {
        marginTop: "10%",
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
        display: 'flex',
        height:'100%',
        position: "relative"
    },
    contactsContent: {
        textAlign: 'center',
        overflowX: 'auto',
        paddingTop: '12%',
        width:'100%'
    },
    contactsHeader:{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        position: "absolute",
        top: "2%",
        left: "50%",
        width:'40%',
        transform: 'translate(-50%)'
    },
}));

//CONTACTS COMPONENT
export const ChatContact = (props) => {
    console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

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
                    onChange={(e)=> props.handleChange(e)}
                />
                <Divider style={{marginTop:'3%', marginBottom:'1%'}} />
                <List>
                    {props.chatsesion&&props.chatuser?props.chatsesion.map((contact) => {
                        // console.log(props.uid)
                        var receiver;
                        if(contact.user1!==props.uid){
                             receiver = props.chatuser[contact.user1]
                             
                        }else{
                            receiver = props.chatuser[contact.user2]
                            }
                    
                        if(receiver!==undefined&& receiver!==null){
                        return(

                        <ListItem divider dense button alignItems="flex-start" selected={selectedIndex === contact.id} onClick={(event) => handleListItemClick(event, contact.id)}>
                            <ListItemAvatar>
                                <Avatar src={receiver.logo}/>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={
                                    <Typography variant='h6'>{receiver.displayName}</Typography>} 
                                secondary={
                                    <Typography variant='subtitle'> {contact.lastchat}</Typography>}
                            />
                        </ListItem>
                     )} }):null}
                </List>
            </CardContent>
        </Card>
    );
};

export const MessageList = (props) => {

    const receiverId = props.chatId.replace(props.uid, '');
    const currentchatsession = props.currentchatsession ? props.currentchatsession : null
    var receiver
    if (currentchatsession !== undefined && currentchatsession !== null &&props.chatuser!==undefined) {
        if (currentchatsession.user1 === receiverId) {
            receiver = props.chatuser[currentchatsession.user1]
        } else { receiver = props.chatuser[currentchatsession.user2] }
    }
    console.log(props)
    return (
        <div>
        {props.messages ? props.messages.map(message => {
            if (message.sender === props.uid) {
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
                return (
                    <ChatMsg
                        key={message.id}
                        avatar={receiver? receiver.logo:null}
                        messages={[
                            message.context
                        ]}
                    />)
            }
        }) : null}

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
                    onChange={(e)=> props.handleChange(e)}
                    required
                />
</Grid>
                <Grid item xs={2}>
                    <StyledButton onClick={(e)=>props.handleSendMessage(e)}>Send</StyledButton>
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
            context:''
        }
    }

    handleSendMessage = event => {
        event.preventDefault();
        const receiver = this.props.match.params.id.replace(this.props.auth.uid,'');
        const chat ={
            id : this.props.match.params.id,
            message:{
            context: this.state.context,
            receiver: receiver
            }
        }
        console.log(chat)
        this.props.sendMessage(chat)
        this.setState({context:''})
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

        return (
            <div>
                <Container>
                    <h3>Chat menu</h3>
                    <Grid container spacing={3}>
                        <Grid item xs={4}><ChatContact props={this.props} handleChange={this.handleChange} currentchatsession={this.props.currentchatsession} chatsesion={this.props.chatsessionorder}  search={search} chatuser={this.props.chatuser}uid={this.props.auth.uid} /></Grid>
                        <Grid item xs={8}><Paper>
                            <div className='chat-box'>
                                <div className='msg-page'>
                                <h5 style={{alignContent:'center'}}>Messages</h5>
                                    <MessageList messages={this.props.messages} uid={this.props.auth.uid} chatId={this.props.match.params.id} currentchatsession={this.props.currentchatsession}  chatsesion={this.props.chatsessionorder}chatuser={this.props.chatuser}/>
                                </div>
                                <div className='msg-footer'>
                                    <SendMessageForm handleSendMessage={this.handleSendMessage} handleChange={this.handleChange} context={this.state.context}/>
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
      createChatSession:(chat)=> dispatch(createChatSession(chat)),
      sendMessage:(message) => dispatch(sendMessage(message))
    }
  }
  
const mapStateToProps = (state,ownProps) => {
    // console.log(ownProps)
    const id = ownProps.match.params.id
    const messages= state.firestore.ordered.thischatsesion
    const chatsession = state.firestore.data.allchatsesion
    const chatsessionorder = ownProps.chatsession
    const currentchatsession= chatsession? chatsession[id]: null
    
    var userIdlist=[]

    if(chatsessionorder!== undefined&& chatsessionorder!== null){
        var u;
        for (u in chatsessionorder){
            if(chatsessionorder[u].user1===state.firebase.auth.uid){
                userIdlist.push(chatsessionorder[u].user2)
            }else{
                userIdlist.push(chatsessionorder[u].user1)
            }
        }
    }
    // console.log(userIdlist)
    // console.log(state.firestore.ordered.chatuser)
    return{
        auth: state.firebase.auth,
        messages: messages,
        currentchatsession: currentchatsession,
        chatsessionorder:chatsessionorder,
        chatsesiondata: state.firestore.data.chatsesion,
        userIdlist:userIdlist,
        chatuser: state.firestore.data.chatuser
    }

  }


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        console.log(props)
        if(props.match.params.id!==undefined){
        if(props.userIdlist.length>0&& props.chatuser=== undefined &&props.match.params.id!==undefined){

                return [
                    {collection:'users',where:['uid','in', props.userIdlist], storeAs:'chatuser'}]}
        return [{
            collection: 'chats', 
            doc:props.match.params.id,
            
            // THIS IS BREAKING THE PAGE
            subcollections: [{ collection: 'chatDetail' }],
            orderBy: ['created', 'asc'],
            storeAs:'thischatsesion' },]
        }
        else {return[]}
    })
  )((Chat))
