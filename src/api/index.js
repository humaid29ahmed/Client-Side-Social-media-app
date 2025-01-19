import axios from "axios";

const API = axios.create({baseURL:'https://server-side-social-media-app.onrender.com'});


/* Before any request this interceptor sets the req.headers.Authorization 
with a token for the Authentication Middleware to set the userId*/
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        console.log(JSON.parse(localStorage.getItem('profile')).token);
    req.headers.authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

//For managing posts
export const fetchPosts = (page)=>API.get(`/posts?page=${page}`);
export const fetchPost = (id)=>API.get(`/posts/post/${id}`);
export const searchPosts = (searchQuery)=>API.get(`/posts/search?search=${searchQuery.search}&tags=${searchQuery.tags}`);
export const createPosts = (newPost)=>API.post('/posts', newPost);
export const updatePost = (id,newPost)=>API.patch(`/posts/${id}`, newPost);
export const deletePost = (id)=>API.delete(`/posts/${id}`);
export const likePost = (id)=>API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment,id)=>API.post(`/posts/${id}/commentPost`,{comment});

//For Authorization and Authentication

export const googleUserInfo = (accessToken)=>(API.post(`/auth/gAuth`,{accessToken}));
export const signIn = (userData)=>(API.post(`/auth/signIn`, userData));
export const signUp = (userData)=>(API.post(`/auth/signUp`, userData));

