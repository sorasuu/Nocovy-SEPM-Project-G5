import React, {Component} from 'react';
import {
  compose,
  withHandlers,
  lifecycle,
  withContext,
  getContext,
} from 'recompose';
import { connect } from 'react-redux'
import { firestoreConnect, populate } from 'react-redux-firebase';
class Upload extends Component {
  
  render() {
    console.log(this.props)
    return (
      <div >
  
      </div>
    )
  }
}
const populates = [{ child: 'user1', root: 'users' },{ child: 'user2', root: 'users' }];
const collection = 'chats';


const withPopulatedProjects = compose(
  firestoreConnect(props => [
    {
      collection, where:[['chatsesion', 'array-contains',  '0MHTxW6ritOKqcA1shP3X9msgAz1']],queryParams:['orderByChild=lastMod'] ,storeAs:'chatsesion',
      populates,
    },
  ]),
  connect((state, props) => ({
    chats: populate(state.firestore, 'chatsesion', populates),
  })),
);
export default withPopulatedProjects(Upload);