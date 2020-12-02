
import {getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
export function add_m (newR){ console.log(newR)
    return (dispatch, getState, {getFirestore}  )=>{
        const firestore = getFirestore();
        firestore.collection('Missing').add({
            ...newR,
            createdAt: new Date(),
        }).then(() => {
            dispatch({
                    type:'add_m_Report',
                    payload: newR,
            })
        }).catch((err) => {
           
            dispatch({ type: 'create_err', err}); 
        })
}}
export function add_f(newR){
return dispatch => {
    const firestore = getFirestore();
    firestore.collection('Find_out').add({
        ...newR,
        createdAt: new Date()
    }).then(()=>{
        
        dispatch({
            type:'add_f_Report',
            payload:newR
        })
    }).catch((err)=>{
        dispatch({type: 'created_err', err})
    })
}
} 