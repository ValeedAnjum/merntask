import React from "react";
import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const { name, email } = data;
            const reqData = JSON.stringify({ name, email });
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/register`, reqData, customConfig);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }; // your form submit function which will invoke after successful validation

    const goTosignInView = () => {
        navigate('/login')
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
                        Sign Up
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        error={errors.name ? true : false}
                        {...register("name", {
                            validate: (value) => value.length > 5
                        })}
                    />
                    {errors.name && <Typography component="p" variant="p">
                        Name Must Contains at least 5 characters
                    </Typography>}
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Button
                        onClick={goTosignInView}
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>

            </Container>

        </form>
    );
}
export default SignUp;