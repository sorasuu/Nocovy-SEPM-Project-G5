import React, { Component } from 'react'
import { Fab,withStyles,CardContent,Card, CardHeader,TextField ,List,ListItem,Divider,ListItemText,ListItemAvatar,AvatarTypography} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {createChatSession,sendMessage, changeChatSession} from '../store/actions/chatActions'
import { connect } from 'react-redux'
import { useFirestoreConnect, firestoreConnect,populate } from 'react-redux-firebase'
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
      {props.messages?props.messages.map(message=>{
          if (message.sender===props.uid){
          return(
            <ChatMsg
            key={message.id}
            side={'right'}
            messages={[
              message.context
            ]}
          />
          )
          }else{
              return(
            <ChatMsg
            key={message.id}
            avatar={props.receiver.logo}
            messages={[
                message.context
            ]}
          />)
          }
      }):null}
    
  </div>
);



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
    const currentchatsession = props.chatsesiondata[props.chatId]?props.chatsesiondata[props.chatId]:null
    var receiver
    if(currentchatsession!== undefined&&currentchatsession!== null){
    if(currentchatsession.user1.id===receiverId){
        receiver=currentchatsession.user1
    }else{receiver=currentchatsession.user2}}
    
    useFirestoreConnect(() => [
            {collection: 'chats', 
            doc:props.chatId,
            
            // THIS IS BREAKING THE PAGE
            subcollections: [{ collection: 'chatDetail' }],
            orderBy: ['created', 'asc'],
            storeAs:'thischatsesion' } 
          ])
    let message = useSelector(({ firestore: { ordered } }) => ordered.thischatsesion)
          console.log(message)
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
                subheader={receiver?receiver.displayName:null}
                style={{ background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", position: "absolute", top: "-5%", left: "5%", width: '200px', }}
            />
            <CardContent className={classes.content}style={{maxHeight: 450, overflow: 'auto', marginTop:'5%'}} >
                
                <div >
                    <DefaultChatMsg messages={message} uid={props.uid} receiver={receiver}/>
                   
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
       this.setState({chatwindow:!this.state.chatwindow })
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    
    // componentDidMount(){
    //     this.setState({chatId:sessionStorage.getItem('chatId')})
 
    // }
    componentDidUpdate(prevState,prevProps){
        if(this.props.chatsession!==null&&this.props.chatsession!==undefined&&prevProps.chatsession!==this.props.chatsession){
            if(this.props.chatsession.length>0 && prevProps.chatsession<this.props.chatsession){
            const chatId = this.props.chatsession[0].id
            this.props.changeChatSession(chatId)
            this.setState({chatId:chatId})}
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
        console.log(this.props)
          if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div>
                {this.props.chatId&&this.state.chatId&&this.props.chatsession&&this.props.chatsesiondata?
               <ChatPanel handleChange={this.handleChange} chatId={this.state.chatId} context={this.state.context}
                  uid={this.props.auth.uid} handleSendMessage={this.handleSendMessage} chatsesiondata={this.props.chatsesiondata}/>:null}
                {/* <Container>
                    <Grid container spacing={3}>
                       

                    </Grid>
                </Container> */}
            </div>
        )
    };
}
const populates = [
    { child: 'user1', root: 'users' },{child: 'user2', root: 'users'}
  ]
  const collection = 'chats';
const mapDispatchToProps = dispatch => {
    return {
      createChatSession:(chat)=> dispatch(createChatSession(chat)),
      sendMessage:(message) => dispatch(sendMessage(message)),
      changeChatSession:(id)=> dispatch(changeChatSession(id))
    }
  }

const mapStateToProps = (state,ownProps) => {
    console.log(state,ownProps)
    const chatsession =state.firestore.ordered.chatsesion? state.firestore.ordered.chatsesion:null
    var id
     id =ownProps.chatReducer? ownProps.chatReducer.chatid?ownProps.chatReducer.chatid:null:sessionStorage.getItem('chatId')?sessionStorage.getItem('chatId'):null
    if (id===null &&chatsession!==undefined&&chatsession!==null&& ownProps.chatId===null){
        if(chatsession.length>0){
            id = chatsession[0].id
        }
    }
    return{
        auth: state.firebase.auth,
        chatuser: state.firestore.data.chatuser,
        chatId: id,
        chatsession:chatsession,
        chatsesiondata: populate(state.firestore, 'chatsesion', populates),
    }

  }


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => {
        // console.log("fetch data" ,props)
  
        return  [
        {
          collection, where:[['chatsesion', 'array-contains',  props.auth.uid]],queryParams:['orderByChild=lastMod'] ,storeAs:'chatsesion',
          populates,
        }]
    })
  )(ChatWidget)