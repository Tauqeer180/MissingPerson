import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
// import { reactReduxFirebase , getFirebase } from 'react-redux-firebase/app';
import { reduxFirestore, getFirestore } from 'redux-firestore';
// import {  getFirebase } from 'react-redux-firebase';
// import {firestoreReducer} from 'redux-firestore';

// import fbConfig from '../config/fbConfig';


let store = createStore(
    allReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//    compose(
    // applyMiddleware(thunk.withExtraArgument( {getFirebase, getFirestore} ) ),
    // reduxFirestore(fbConfig),
    // reactReduxFirebase( fbConfig,  
        // {  enableRedirectHandling: false } 
        // )
//    )
);

// let store = createStore(
//     allReducers,
   
//     applyMiddleware(thunk)
    
  
// );
export default store;