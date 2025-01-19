import { Button, Divider, TextField, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { postComments } from '../../actions/post.js';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const[comments, setComments] = useState(post?.comments);
    const[comment, setComment] = useState('');
    const currentComment = useRef();
    const dispatch = useDispatch();
    const user  = JSON.parse(localStorage.getItem('profile'));
    const handleSubmitComment=async()=>{
        const userComment = `${user?.result?.name}:${comment}`;
        const userComments = await dispatch(postComments(userComment, post.id));
        setComment('');
        setComments(userComments);
        currentComment.current.scrollIntoView({ behavior:'smooth'});
    };
  return (
    <div>
        <Typography variant='h6'>Comments</Typography>
        <Divider/>
        <div className={classes.commentsOuterSection}>
            <div className={classes.commentsInnerSection}>
                {comments.map((comment,i)=><Typography variant='subtitle1' key={i}><strong>{comment.split(':')[0]}</strong> {comment.split(':')[1]}</Typography>)}
                <div ref={currentComment}/>
            </div>
            <div style={{width:'60%'}}>
            <Typography variant='h6'>Write a Comment</Typography>
            <TextField
            minRows={5}
            label='Comment'
            multiline={true}
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            fullWidth
            />
            <Button style={{marginTop:'10px'}} fullWidth variant='contained' color='primary' disabled={!comment} onClick={handleSubmitComment}>
                submit
            </Button>
            </div>
        </div>
    </div>
  )
}

export default CommentSection