// import users from './users';
import {  firestoreReducer } from 'redux-firestore';
import reports from './reports';
import {combineReducers} from 'redux';
export default combineReducers({
    // users:users,
    report:reports,
    firestore:firestoreReducer,
    
})