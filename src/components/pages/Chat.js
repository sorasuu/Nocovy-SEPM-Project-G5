import React, { Component } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { Redirect, NavLink } from 'react-router-dom';
import { Grid, InputBase, withStyles, Container, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles'
import StyledButton from '../layout/StyledButton'
import {createChatSession,sendMessage} from '../store/actions/chatActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import _ from 'lodash'
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
    },
    content: {
        textAlign: 'left',
        overflowX: 'auto',
        marginLeft: "5%",
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginTop: "2%",
        // marginRight: theme.spacing(2),
        justify: 'center',
        alignItems: 'center',
        direction: 'flex',
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing(3),
        //   width: 'auto',
        // },
    },
    searchIcon: {
        // padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    }
}));


//Long card
export const ChatContact = (props) => {
    console.log(props)
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "relative", marginBottom: '2%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Contact"}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-5%", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content} >
                <div >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        //   onChange={this.onChange}
                        />
                    </div>
                </div>
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
                        <Grid item xs={4}><ChatContact props={this.props} /></Grid>
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
    
    var sortedMessages = null 
    const messages= state.firestore.ordered.thischatsesion
    if (messages!==undefined){
        if(messages.length>0)
        sortedMessages = _.orderBy(messages, function(o) { return new moment(o.created); }, ['desc']);

    }
    return{
        auth: state.firebase.auth,
        messages: sortedMessages
    }

  }


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        return [{ collection: 'chats', doc:props.match.params.id,subcollections: [{ collection: 'chatDetail' }],storeAs:'thischatsesion' },]
        
    })
  )((Chat))
