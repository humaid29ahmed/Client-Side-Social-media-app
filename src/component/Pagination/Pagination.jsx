import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/post.js';
import  useStyles from './styles.js';
import { Link } from 'react-router-dom';
import {Pagination, PaginationItem} from '@material-ui/lab';

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {noOfPages, currentPage} = useSelector((state)=>state.posts);
    console.log(noOfPages, currentPage);
    useEffect(() => {
      console.log('INSIDE THE USE EFFECT');
        dispatch(getPosts(page));
    }, [page]);
  return (
    <Pagination
    classes={{ul:classes.ul,}}
    count={noOfPages}
    page={Number(page)||1}
    variant="outlined"
    renderItem={(item)=>(<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>)}
    />
  )
}

export default Paginate