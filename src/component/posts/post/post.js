import React, { useState } from "react";
import makeStyles from "./styles.js";
import { Card, CardActions, CardContent, Typography, CardMedia, Button, ButtonBase } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { deletePost, likePost } from "../../../actions/post.js";
import moment from "moment";


const Post = ({post, setCurrentId, currentId})=>{
    const classes = makeStyles();
    const tagsData = Object.values(post.tags);
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(post);
    const openPost = ()=>history.push(`/posts/${post.id}`);
    const hadLikedPost = likes.find((id)=>Number(id)===Number(user?.result?.id));
    const handleLike=()=>{
        dispatch(likePost(post.id));
        if(hadLikedPost)
        {
            setLikes(prevLikes=>prevLikes.filter(like=>like!==user?.result?.id));
        }else{
            setLikes(prevLikes=>[...prevLikes,user?.result?.id]);
        }
    }
    const Like = ()=>{
       if(likes.length > 0)
       {
        return likes.find((like)=>Number(like) === Number(user?.result?.id))?(
            <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length > 2 ? `You and ${likes.length-1} others`:`${likes.length} like${likes.length>1 ? 's' : ''}`}</>
        ):(<><ThumbUpAltOutlined fontSize="small"/>&nbsp;{likes.length} {likes.length == 1 ?' Like':' Likes'}</>);
       }

       return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>; 
    }
    return(
        
        <Card className={classes.card} raised elevation={6}>
           <ButtonBase component='span' className={classes.cardAction} onClick={openPost}>
            <CardMedia className={classes.media} image={post.selectedfile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdate).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(Number(user?.result?.id) ===Number(post.creator))&&
                <Button style={{color:'white'}} size="small" onClick={(e)=>{e.stopPropagation();setCurrentId(post.id);}}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>}
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{tagsData.map((tag)=>`#${tag}`)}</Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary"  component="p" >{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
                    <Like/>
                </Button>
         
                {(Number(user?.result?.id) ===Number(post.creator))&&
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post.id))}>
                    <DeleteIcon fontSize="small"/>
                    &nbsp; Delete
                </Button>}
                
            </CardActions>

        </Card>
    );
};

export default Post;