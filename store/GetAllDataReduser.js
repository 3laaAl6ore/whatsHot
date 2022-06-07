import {GET_DISCCUSION} from './GetAllDataAction';

const initialState = {
    allData :[]
}

export default (state = initialState , action)=>{

    switch (action.type) {
        case GET_DISCCUSION:
          return{
             ...state, // sprid operiation
             allData : action.data             
          }
        default:
            return state
    }

};

