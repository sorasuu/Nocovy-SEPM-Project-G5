import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider,useSelector} from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';
import { createStore, compose ,applyMiddleware} from 'redux'
import { ReactReduxFirebaseProvider,getFirebase,isLoaded  } from 'react-redux-firebase'
import { createFirestoreInstance,getFirestore } from 'redux-firestore' 

import ColorLinearProgress from './components/layout/ColorLinearProgress'
import thunk from 'redux-thunk';
import rootReducer from './components/store/reducers/rootReducer'
const fbConfig = {
  apiKey: "AIzaSyBtUJtrxFAiL06xfxey92cfYQkRldODuSg",
  authDomain: "sepm-nocovy.firebaseapp.com",
  databaseURL: "https://sepm-nocovy.firebaseio.com",
  projectId: "sepm-nocovy",
  storageBucket: "sepm-nocovy.appspot.com",
  messagingSenderId: "110375007293",
  appId: "1:110375007293:web:128c32d83c23de38b0e654",
  measurementId: "G-WQY5VFTZVL"
  };
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true 
}
const middlewares = [
    thunk.withExtraArgument(getFirebase,getFirestore)
  ]

firebase.initializeApp(fbConfig)
firebase.firestore()

const  storageRef = firebase.storage();
export default (storageRef)

function AuthIsLoaded({ children }) {


    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div style={{textAlign:"center"}} ><h1 style={{fontFamily:'Muli', marginBottom:"5%"}}>Loading...</h1> <ColorLinearProgress style={{padding:"0.3%"}}/></div>;
    return children
  }



const initialState = window && window.__INITIAL_STATE__ 
const store = createStore(
    rootReducer, initialState,
    compose(
    applyMiddleware(...middlewares),)
    )

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance 
}

ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}><div id='bckgrd' className = 'bckgrd'><AuthIsLoaded><App /></AuthIsLoaded></div>  </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
