import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Appbar = ({ handleDrawerToggle }) => {
    const dispatch = useDispatch();
    const naviagte = useNavigate()
    const logOutHan = () => {
        dispatch({ type: "CLEAR_PROFILE" });
        naviagte('/login');
    }
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: `240px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: '1' }} variant="h6" noWrap component="div">
                    Ropstam
                </Typography>
                <Button variant="outlined" sx={{ color: 'white' }} onClick={logOutHan} >Log out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar