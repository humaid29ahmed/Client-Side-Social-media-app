import * as api from "../api/index.js";
import { AUTH, LOGOUT } from "../actiontypes.js";

export const getUserInfo = (access_token)=>async(dispatch)=>{
    try {
       const {data} =await api.googleUserInfo(access_token); 
       const{result,token} =data ;
       dispatch({type:AUTH, payload:{result,token} });
    } catch (error) {

        console.log(error);
        
    }
    
};

export const signIn=(formData,history)=>async(dispatch)=>{
 const {email, password} = formData;
 try{ 
 const {data} = await api.signIn({email, password});
 dispatch({type:AUTH, payload:data});
 history.push('/');
}catch(error)
{
    console.log(error);
}
};

export const signUp=(formData,history)=>async(dispatch)=>{
    try {
        const{data} = await api.signUp(formData);
        dispatch({type:AUTH, payload:data});
        history.push('/')
    } catch (error) {
        console.log(error);
    }
};
