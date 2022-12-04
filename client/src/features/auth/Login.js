import React from "react";
import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from "../../store/actions/authActions";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth)
    if (authenticated) return <Navigate to="/" />;
    const onSubmit = async (data) => {
        try {
            const success = await dispatch(signIn(data));
            success && navigate('/')
        } catch (error) {
            console.log(error)
        }
    };

    const goTosignUpView = () => {
        navigate('/signup')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.email ? true : false}
                        {...register("email", {
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password ? true : false}
                        {...register("password", { required: true })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={goTosignUpView}
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>

            </Container>

        </form>
    );
}
export default SignIn;