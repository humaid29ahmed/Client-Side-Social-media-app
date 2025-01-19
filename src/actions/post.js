import{FETCH_ALL, DELETE, UPDATE, CREATE, FETCH_ALL_BY_SEARCH, POST_COMMENTS, FETCH_POST, START_LOADING, STOP_LOADING } from "../actiontypes";
import * as api from "../api/index.js";

// Action Creators

export const getPosts = (page)=>async(dispatch)=>{
    try{
          dispatch({type:START_LOADING});
          const {data} = await api.fetchPosts(page);
          dispatch({type:FETCH_ALL, payload:data});
          dispatch({type:STOP_LOADING});
    }catch(error){
        console.log(error);
    }
};

export const getPost = (id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type:FETCH_POST, payload:data});
        dispatch({type:STOP_LOADING});
    } catch (error) {
        console.log(error);
    }
};

export const getPostBySearch = (searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.searchPosts(searchQuery);
        dispatch({type:FETCH_ALL_BY_SEARCH, payload:data})
        dispatch({type:STOP_LOADING});
    } catch (error) {
        console.log(error);
    }
 
};
export const postComments = (comment, id)=>async(dispatch)=>{
try {
    const{data} = await api.commentPost(comment, id);
    dispatch({type:POST_COMMENTS, payload:{data,id}});
    return data

} catch (error) {
    console.log(error);
}
};
export const createPosts = (post,history)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const {data} = await api.createPosts(post);
        dispatch({type:CREATE, payload:data});
        history.push(`/posts/${data.id}`);
        dispatch({type:STOP_LOADING});

    }catch(error){
            console.log(error);
    }
};

export const updatePost = (id,post)=>async(dispatch)=>{
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE, payload:data});

    }catch(error){
        console.log(error);
    }
};

export const deletePost = (id)=>async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE, payload:id});
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type:UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }
};
