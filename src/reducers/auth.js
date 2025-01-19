import { AUTH, LOGOUT } from "../actiontypes";
const reducers = (state={authData:null}, action)=>{
    switch (action.type) {
        case AUTH:
            console.log(action?.payload);
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            return {...state, authData:action?.payload};
            break;
        case LOGOUT:
            localStorage.clear();
            return {...state, authData:null};
            break;
        default:
            return state;
            break;
    }
};

export default reducers;