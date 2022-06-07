export const GET_DISCCUSION = 'GET_DISCCUSION';
import {baseURL} from "../src/utility/consts";

export const get_disccusion_dispatch = (data)=>{
    return dispatch =>{
        dispatch({type :GET_DISCCUSION , data }); // this is the action in redusers
    };
};

export const get_disccusion_action = () =>{
    return async dispatch=>{
        const response = await fetch(baseURL+'/dis/getAllDisccusions',

       );
       const data = await response.json();
       if(data.status)
       {
        dispatch(get_disccusion_dispatch(data));
       
       }else{
            let message = data.message;
            throw new Error(message); 
       }
    }
}