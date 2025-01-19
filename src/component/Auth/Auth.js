import React,{useEffect, useState} from 'react'
import {Avatar, Paper, Container,TextField,Button, Typography, Grid} from "@material-ui/core";
import LockedOutlinedIcon from "@material-ui/icons/LockOutlined";
import { googleLogout, useGoogleLogin} from "@react-oauth/google";
import Input from "./Input.js";
import useStyles from "./styles";
import CustomGoogleLogin from './Button/CustomGoogleLogin.js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { getUserInfo, signUp, signIn } from '../../actions/auth.js';

const Auth = () => {
  let intialFormData = {firstName:'', lastName:'', email:'', password:'', confirmPassword:'',};
  const [formData, setFormData] = useState(intialFormData);
  const classes =useStyles();
  const [isSignUp, setSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history=useHistory();


  const handleShowPassword = ()=>setShowPassword((prevShowPassword)=> !prevShowPassword);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(isSignUp)
      {
        await dispatch(signUp(formData,history));
      }else{
        await dispatch(signIn(formData,history));
      }
    console.log(formData);
  };

  const google = useGoogleLogin({
    onSuccess: async(tokenResponse)=>{console.log(tokenResponse); await dispatch(getUserInfo(tokenResponse.access_token));history.push('/');},
    onError: error =>console.log(error),
  });
  const switchMode=()=>{
    setSignUp((prevIsSignUp)=> !prevIsSignUp);
    setShowPassword(false);
  }

  const handleChange=async(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});

  };
  return (
    <Container component="main" maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockedOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignUp?'Sign Up' : 'Sign In'}</Typography>
       <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignUp &&(

                <>
                  <Input type='text' half={true} autoFocus name="firstName" label="First Name" handleChange={handleChange} />
                  <Input type='text' half name="lastName" label="Last Name" handleChange={handleChange} />
                </>
                  )}
                  <Input type='email' name="email" label="Email Address" handleChange={handleChange}/>
                  <Input type={showPassword?'text' : 'password'} name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} showPassword={showPassword} passwordVisibility={true} />
                {isSignUp && (<Input type='password' name='confirmPassword' label='Repeat Password' handleChange={handleChange} />)}
              
            </Grid>
            <Button className={classes.submit} type='submit' fullWidth variant="contained" color="primary">{isSignUp?'Sign Up':'Sign In'}</Button>
            
           <CustomGoogleLogin onClick={()=>google()}/>
            <Grid container justifyContent='flex-end'>
                  <Grid item>
                      <Button onClick={switchMode}>{isSignUp?'Already have an account? Sign Up ': 'Dont have an Account? Please Sign Up'}</Button>
                  </Grid>
            </Grid>
       </form>
      </Paper>

    </Container>
  )
}

export default Auth