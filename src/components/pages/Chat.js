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
                    {DUMMY_DATA.map((message) => 
                        <ListItem divider dense button alignItems="flex-start" selected={selectedIndex === message.senderId} onClick={(event) => handleListItemClick(event, message.senderId)}>
                            <ListItemAvatar>
                                <Avatar src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'/>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={
                                    <Typography variant='h6'>{message.senderId}</Typography>} 
                                secondary={
                                    <Typography variant='subtitle'> {message.text}</Typography>}
                            />
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export const MessageList = (props) => {
    console.log(props)
    return (
        <div>
        <br/>
        <p>Messages go here</p>
        <br/>
        </div>
        // <ul className="message-list">                 
        //     {this.state.messages.map(message => {
        //       return (
        //        <li key={message.id}>
        //          <div>
        //            {message.senderId}
        //          </div>
        //          <div>
        //            {message.text}
        //          </div>
        //        </li>
        //      )
        //    })}
        //  </ul>
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

  

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.message !== this.state.message && this.props.typingListener) {
    //         this.props.typingListener();
    //     }
    //     // this.scrollToBottom();
    // }

    // dunno where to place this handleSendMessage
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
                        <Grid item xs={4}><ChatContact props={this.props} handleChange={this.handleChange} currentchatsession={this.props.currentchatsession} chatsesion={this.props.currentchatsession}  search={search} /></Grid>
                        <Grid item xs={8}><Paper>
                            <div className='chat-box'>
                                <div className='msg-page'>
                                <h5 style={{alignContent:'center'}}>Messages</h5>
                                    <MessageList messages={this.props.messages} />
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
    const id = ownProps.match.params.id
    const messages= state.firestore.ordered.thischatsesion
    const chatsession = state.firestore.data.chatsesion
    const currentchatsession= chatsession? chatsession[id]: null
    return{
        auth: state.firebase.auth,
        messages: messages,
        currentchatsession: currentchatsession,
        // chatsession:state.firestore.ordered.chatsesion
    }

  }


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        // console.log(props.match.params.id)
        if(props.match.params.id!==undefined){
        return [{
            collection: 'chats', 
            doc:props.match.params.id,
            
            // THIS IS BREAKING THE PAGE
            subcollections: [{ collection: 'chatDetail' }],
            orderBy: ['created', 'asc'],
            storeAs:'thischatsesion' },]
        }else{
            return []
        }
    })
  )((Chat))
