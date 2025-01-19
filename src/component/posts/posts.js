import React from "react";
import {useSelector} from "react-redux";
import{Grid, CircularProgress} from "@material-ui/core"
import Post from "./post/post.js";
import makeStyles from "./styles.js";

const Posts = ({currentId,setCurrentId})=>{
    const classes = makeStyles();
    const {posts,isLoading} = useSelector((state)=>state.posts);
    console.log(posts);
    return(
       isLoading? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post)=>(<Grid item key={post.id} xs={12} sm={12} md={6} lg={3}>
                <Post key={post.id} currentId={currentId} setCurrentId={setCurrentId} post={post}/>
                </Grid>))}

        </Grid>
       )
    );
};

export default Posts;