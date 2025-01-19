import { START_LOADING,STOP_LOADING, DELETE,UPDATE, CREATE, FETCH_POST, FETCH_ALL_BY_SEARCH, POST_COMMENTS, FETCH_ALL } from "../actiontypes";
const reducers = (state={isLoading:true, posts:[]}, action)=>{

    switch(action.type)
    {
        case START_LOADING:
            return {...state, isLoading:true};

        case STOP_LOADING:
            return {...state, isLoading:false};

        case DELETE:
            return state.posts.filter((post)=>post.id !== action.payload);
        case UPDATE:
            return{...state,posts: state.posts.map((post)=>post.id == action.payload.id ? action.payload : post)};

        case CREATE:
            let newPosts = [...state.posts, action.payload];
            return {...state,posts:newPosts};
        case FETCH_POST:
            return{...state, post:action.payload};
        case POST_COMMENTS:
            let postData = state.posts.find((post)=>post.id == Number(action.payload.id));
            postData.comments =action.payload.comments ;
            return {...state, posts: [...state.posts.filter((post)=>post.id!=Number(action.payload.id)), postData]};
        case FETCH_ALL_BY_SEARCH:
            return {...state, posts:action.payload};
        case FETCH_ALL:
            return {...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                noOfPages:action.payload.noOfPages,
            };
        default:
            return state;
    }

}
export default reducers;