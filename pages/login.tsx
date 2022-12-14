import { useState, FormEvent } from 'react';
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NextPage } from 'next';
import { ILogin } from '../types/user';
import Swal from 'sweetalert2';
import { login } from '../api';
import CircularProgress from '@mui/material/CircularProgress'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();


    await login({ email: email, password: password } as ILogin).then(({ data }) => {
      Swal.fire({ title: 'Sing Up Success', icon: 'success', html: `<h2>${data.massage}</h2>`, timer: 1500 })

      localStorage.setItem("user", JSON.stringify(data.data))
    
    }).catch(({ response }) => {
      Swal.fire("something want wrong", response.data.error, 'error')
    })

    setPassword("")
    setEmail("")
    setIsLoading(false)
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" className='w-full   h-full mt-20 flex justify-center items-center'>
      <CssBaseline />
      <Box
        className='rounded-md bg-slate-100 shadow-lg p-8 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-full flex justify-center items-center flex-col mt-2'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <FormControl  className="w-full">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              className="w-full"
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              required
              fullWidth
              name="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            type={(isLoading) ? "reset" : "submit"}
            fullWidth
            variant="contained"
            className='mt-3 mb-4 bg-[#1976d2] hover:bg-[#1d81e6] text-white'
          >
            {(isLoading) ? (
              <CircularProgress size={28} className='text-white ' />
            ) : "Login"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href='sing-up'>
                <p className='link'>Don&apos;t have an account? Sign Up</p>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;