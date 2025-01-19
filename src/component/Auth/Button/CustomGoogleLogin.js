import React from 'react'
import {Button} from "@material-ui/core";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
const CustomGoogleLogin = ({onClick}) => {
  return (
    <Button onClick={()=>onClick()} startIcon={<LockRoundedIcon />} variant='contained' color='primary' fullWidth>Login with Google</Button>
  );
};

export default CustomGoogleLogin;