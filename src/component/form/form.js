import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64"
import makeStyles from "./styles.js";
import {createPosts, updatePost} from "../../actions/post.js";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
const Form = ({currentId, setCurrentId})=>{
    const classes = makeStyles();
    const dispatch = useDispatch();
    const history=useHistory();
    const[postData, setPostData]=useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state)=>currentId?state.posts.posts.find((post)=>post.id == currentId) : null) ;
    console.log("POSTDATA:",post);
    console.log(currentId);
    useEffect(()=>{
       
        if(post){ console.log("IN USEEEFECT");setPostData(post)}},[post]);
    console.log('postdata :', postData);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId)
        {
            console.log("DISPATCH UPDATE");
            dispatch(updatePost(currentId, {...postData, name:user?.result?.name}));
        }else{
            
            console.log('IN CREATE POST');
        dispatch(createPosts({...postData, name:user?.result?.name},history));
            
        }
        clear();

    };
    const clear=()=>{
        setCurrentId(null);
        console.log("Current Id :",currentId);
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        });
        console.log("SET POST DATA :",postData);

    };

    console.log(user?.result?.name); 
    return(
       user?.result?.name ? <Paper className={classes.paper} elevation={6}>
        
        <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
            
            <Typography variant="h6">{currentId?'Editing':'Creating'} a Memories</Typography>
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
            <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})}/>
            <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags: e.target.value})}/>    
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData, selectedFile:base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
          
    </form>
        
       </Paper> : <Paper className={classes.paper}><Typography variant="h6" align="center">Please Sign Up or Sign In to use the platform.</Typography></Paper>
    );
};

export default Form;