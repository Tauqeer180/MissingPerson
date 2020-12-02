export default (states = INITIAL_STATE, action)=>{
    switch(action.type){
        case 'add_m_Report':
            return( {
                ...states,
                mReports: [...states.mReports, action.payload]

                } )
        case 'create_err':
                    console.log( action.err);
                    alert('err');
                    return states;
        case 'add_f_Report':
            return({
                ...states,
                fReports: [...states.fReports, action.payload]
                })
        default:
            return states;
    }
}
const INITIAL_STATE = {
    mReports:[  
        
        {id:2, image:'anay body',name:'Tauqeer',fName:'Abbas',age:20,address:'Sillanwali, Dist Sargodha',date:'08/06/2020', gender:'male'}
    ],
    fReports:[
        {id:3,  name:'Churrail ',fName:'Jin', gender:'Female'},
        {id:4, name:'Muhammad Qasim Ali',fName:'Abdul Ghafar',gender: 'male'}
    ]
}