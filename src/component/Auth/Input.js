import React from 'react'
import { TextField, InputAdornment, Grid, IconButton } from '@material-ui/core'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const Input = ({name,label,half,autoFocus,handleChange,type, handleShowPassword,passwordVisibility, showPassword}) => {
  return (
      <Grid item xs={12} sm={ half ? 6 : 12}>
        <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={passwordVisibility&& {endAdornment:(<InputAdornment position='end'>
            <IconButton onClick={handleShowPassword}>
                {showPassword?<VisibilityOff/> :<Visibility/>}
            </IconButton>
        </InputAdornment>)}}
        />
        </Grid>
    
  );
}

export default Input