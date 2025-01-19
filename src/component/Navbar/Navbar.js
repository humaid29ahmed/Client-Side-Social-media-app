import React, {useEffect, useState} from 'react'
import useStyles from './styles.js';
import {Link} from "react-router-dom";
import { AppBar, Typography,Toolbar, Avatar, Button } from '@material-ui/core';
import memories from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(()=>{
        const token = user?.token;
        if(token)
        {
        const decodedToken = decode(token);
        if(decodedToken?.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        },[location]);

    const logOut = ()=>{
            dispatch({type:'LOGOUT'});
            setUser(null);
            history.push('/auth');
        }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={memoriesText} alt='memories-text' height="45px"/>
            <img className={classes.image} src={memories} alt="memories" height="40px" />
        </Link>
    <Toolbar className={classes.toolbar}>
        {user ? (
         <div className={classes.profile}>
            {console.log(user.result.picture," ",user.result.name)}
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture?user.result.picture:'/default.jpg'} imgProps={{ referrerPolicy: 'no-referrer' }}/>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut} >Log Out</Button>
         </div>
        ):(
                <Button component={Link} to="/auth"  color='primary' variant='contained' >Sign In</Button>
        )}
    </Toolbar>
   
   </AppBar>
  );
}

export default Navbar