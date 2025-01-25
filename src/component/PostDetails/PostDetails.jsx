import React, { useEffect } from 'react';
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import moment from 'moment';
import { getPost,getPostBySearch } from '../../actions/post.js';
import CommentSection from './CommentSection.jsx';
import useStyles from './styles.js';
const PostDetails = () => {
  const {post, posts, isLoading}= useSelector((state)=>state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  const classes = useStyles();
  console.log('Post id:', id);
  useEffect(()=>{
    console.log('INSIDE THE USE EFFECT');
    dispatch(getPost(id));
    
  },[id]);
  
  useEffect(()=>{
    if(post?.tags){
    console.log('INSIDE THE USEEFFECT for SEARCH');
    dispatch(getPostBySearch({search:'none', tags: post?.tags.join(',')}));
    }
  },[post]);
  
  if(!post)return null;
  // console.log('The recommended posts 1:',posts);
  if(isLoading)
    {
      return (<Paper className={classes.loadingPaper} elevation={6}><CircularProgress size='7rem' /></Paper>);
    }
  console.log('The recommended posts 2:',posts);
  const openPost=(id)=>history.push(`/posts/${id}`);
  let recommendedPosts = posts.filter((rpost)=>rpost.id !== post.id);
   
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom:'30px' }} elevation={6}>
      {console.log('INSIDE HTML')}
   <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom={true} variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom={true} variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedfile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length &&(
        <div className={classes.section}>
          <Typography variant='body1'>You might also like this:</Typography>
          <Divider style={{ margin: '20px 0' }}/>
        <div className={classes.recommendedPosts}>
        {recommendedPosts.map(post =>{

        return(
           <div style={{margin:'20px', cursor:'pointer'}} key={post.id} onClick={()=>openPost(post.id)}>
             <Typography gutterBottom={true} variant="h6" >{post.title}</Typography>
             <Typography gutterBottom={true} variant='subtitle2' >{post.name}</Typography>
             <Typography gutterBottom={true} variant='subtitle2' >{post.message}</Typography>
             <Typography gutterBottom={true} variant='subtitle1'>Likes :{post.likes.length}</Typography>
             <img src={post.selectedfile} alt="image" width='200px'/>
           </div>
           )}
          )}
          </div>
          </div>)
        }
      </Paper>
  )
};

export default PostDetails;