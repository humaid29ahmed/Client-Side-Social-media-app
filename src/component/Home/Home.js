import React from 'react'
import {useEffect, useState} from "react";
import {Container, Grow, Grid,Paper, AppBar, TextField, Button} from "@material-ui/core";
import Posts from "../posts/posts";
import Form from "../form/form";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import {getPosts,getPostBySearch} from "../../actions/post.js";
import makeStyles from "./styles.js";
import Paginate from '../Pagination/Pagination.jsx';
const useQuery = ()=>{
    return new URLSearchParams(useLocation().search);
};
const Home = () => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId]=useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const page = useQuery().get('page') || 1 ;
    const searchQuery = useQuery().get('search');

    const posts = useSelector((state)=>state.posts);
    const handleSearchPost=async()=>{
        if(search.trim()||tags)
        {
            //dispatch fetch search action
             dispatch(getPostBySearch({search:search.trim(),tags:tags.join(',')}));
            history.push(`/posts/search?search=${search.trim()||'none'}&tags=${tags.join(',')||'none'}`);
        } else {

            history.push('/');

    }
};
      const handleKeyPress = (e)=>{

        if(e.keyCode == 13)
        {
            handleSearchPost();
        }

    };

    const handleAdd = (tag)=>setTags(([...tags, tag]));
    const handleDelete = (tagToDelete)=>setTags(tags.filter((tag)=>tagToDelete!==tag));

  return (
    <Grow in>
    <Container maxWidth='xl'>
        <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <TextField
                    onKeyPress={handleKeyPress}
                    name='search'
                    label='Search your Memories'
                    onChange={(e)=>{setSearch(e.target.value)}}
                    value={search}
                    fullWidth
                    variant='outlined'
                    />
                    <ChipInput
                    label='Search Tags'
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    value={tags}
                    style={{margin:'10px 0'}}
                    variant='outlined'/>

                    <Button variant='contained' style={{margin:'10px 0'}} color='primary'onClick={handleSearchPost} fullWidth >Search</Button>
                </AppBar>

                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                {(!searchQuery && !tags.length)&&(<Paper className={classes.pagination} elevation={6}>
                    <Paginate page={page}/>
                </Paper>)}
                
                
            </Grid>
        </Grid>
    </Container>
   </Grow>
  )
}

export default Home