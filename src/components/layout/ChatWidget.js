import React, { Component } from 'react'
import { Fab,withStyles,CardContent,Card, CardHeader,TextField ,List,ListItem,Divider,ListItemText,ListItemAvatar,AvatarTypography} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {createChatSession,sendMessage, changeChatSession} from '../store/actions/chatActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, NavLink } from 'react-router-dom';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export const DefaultChatMsg = (props) => (
  <div>

    <ChatMsg
      avatar={''}
      messages={[
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ]}
    />
    <ChatMsg
      side={'right'}
      messages={[
        "Great! What's about you?",
        'Of course I did. Speaking of which check this out',
      ]}
    />
    <ChatMsg avatar={''} messages={['Im good.', 'See u later.']} />
    <ChatMsg
      avatar={''}
      messages={[
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ]}
    />
  </div>
);


 
const useStyles = theme => ({
root:{
    right: '20px',
    bottom: '20px',
    display: 'block',
    position: 'fixed',
}

  });

  const useStylesCard = makeStyles(() => ({
    card: {
        marginTop: "10%",
        transition: '0.3s',
        width: '500px',
        height: '550px',
        overflow: 'initial',
        background: '#ffffff',
        right:'30px',
        bottom:'30px',
    },
    content: {
        overflow: 'auto',
        marginLeft: "5%",
        // minHeight:'550px',
        // minWidth: '500px',
    },
    input:{
        
    }
}));

//Long card
const ChatPanel = (props) => {
    console.log('chat props',props)
    const receiverId = props.chatId.replace(props.uid,'');
    const receiver = props.chatuser[receiverId]
    const classes = useStylesCard();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles =  useOverShadowStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Card className={cx(classes.card, cardShadowStyles.root)} style={{ position: "fixed", marginBottom: '2%',marginRight: '1%' }}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={"Chat"}
                subheader={receiver.displayName}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-5%", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content}style={{maxHeight: 450, overflow: 'auto', marginTop:'5%'}} >
                
                <div >
                    <DefaultChatMsg/>
                   
                </div>
                
            </CardContent>
            <form onSubmit={(e)=> props.handleSendMessage(e)}>
            <input
                    type='text'
                    className='form-control message-input'
                    placeholder='Send Message'
                    id='context'
                    value={props.context}
                    onChange={(e)=> props.handleChange(e)}
                    
                    required
                    style={{marginTop:'2%', width:'90%'}}
                />
                </form>
        </Card>
    );
};
  
class ChatWidget extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            search: '',
            context:'',
            chatwindow: false,
            chatId:'',

        }
    }
    handleSendMessage = event => {
        event.preventDefault();
        if(this.state.context!==null&&this.state.context!==undefined&&this.state.context.trim()!==''){
        const receiver = this.props.chatId.replace(this.props.auth.uid,'');
        const chat ={
            id : this.props.chatId,
            message:{
            context: this.state.context,
            receiver: receiver
            }
        }
        console.log(chat)
        this.props.sendMessage(chat)
        this.setState({context:''})}
      };

    handleClicked = e => {
       this.setState({chatwindow:!this.state.chatwindow,chatId: this.props.chatId })
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('run',this.props.chatId)
    //     if (prevProps.chatId !== this.props.chatId||prevState.chatId !== this.props.chatId) {
    //         this.setState({ chatId: this.props.chatId })
    //     }
    // }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.chatId !== prevState.chatId) {
    //         return { chatId: nextProps.chatId };
    //     }
    //     else return null;
    // }
    render() {
        const { auth, classes } = this.props;
        const { search, users } = this.state;

          if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div>
                <Fab className= {classes.root} onClick={(e)=>{this.handleClicked(e)}} >
                <ChatBubbleIcon/>
                </Fab>
                {this.state.chatwindow?<ChatPanel handleChange={this.handleChange} chatId={this.state.chatId} context={this.state.context}
                currentchatsession={this.props.currentchatsession} chatuser={this.props.chatuser} uid={this.props.auth.uid} handleSendMessage={this.handleSendMessage}/>:null}
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
      createChatSession:(chat)=> dispatch(createChatSession(chat)),
      sendMessage:(message) => dispatch(sendMessage(message)),
      changeChatSession:(id)=> dispatch(changeChatSession(id))
    }
  }
  
const mapStateToProps = (state,ownProps) => {
    console.log(state)
    const messages= state.firestore.ordered.thischatsession
    const chatsession = state.firestore.data.chatsesion
    const chatsessionorder = state.firestore.ordered.chatsesion
    const id = chatsessionorder?ownProps.chatReducer? ownProps.chatReducer.chatid:chatsessionorder[0].id:null
    const currentchatsession= chatsession? chatsession[id]: null
    
    var userIdlist=[]
    if(chatsessionorder!== undefined&& chatsessionorder!== null&& state.firebase.auth!== undefined&& state.firebase.auth!== null){
        var u;
        for (u in chatsessionorder){
            if(chatsessionorder[u].user1===state.firebase.auth.uid){
                userIdlist.push(chatsessionorder[u].user2)
            }else{
                userIdlist.push(chatsessionorder[u].user1)
            }
        }
    }

    return{
        auth: state.firebase.auth,
        messages: messages,
        currentchatsession: currentchatsession,
        chatsessionorder:chatsessionorder,
        userIdlist:userIdlist,
        chatuser: state.firestore.data.chatuser,
        chatId: id
    }

  }


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        console.log(props)
        if(props.currentchatsession!==undefined&&props.currentchatsession!==null){
            console.log("hello anh Tung",props.currentchatsession)
        return [
    {
            collection: 'chats', 
            doc:props.chatId,   
            // THIS IS BREAKING THE PAGE
            subcollections: [{ collection: 'chatDetail' }],
            orderBy: ['created', 'asc'],
            storeAs:'thischatsession' }
        ]}
            else{
                return[]
            }
        }
    )
  )((withStyles(useStyles)(ChatWidget)))