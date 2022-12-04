import React, { useState } from 'react';
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Appbar from './appbar/Appbar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Redirect from 'react-router';

const drawerWidth = 240;

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { authenticated } = useSelector(state => state.auth)
    if (!authenticated) return <Navigate to="/login" />;
    const navigate = useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const navigateTo = (path) => {
        navigate(path)
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem onClick={() => navigateTo('/')} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ textTransform: 'uppercase' }} primary="dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigateTo('/categories')} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ textTransform: 'uppercase' }} primary="categories" />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigateTo('/car')} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ textTransform: 'uppercase' }} primary="cars" />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigateTo('/addcar')} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ textTransform: 'uppercase' }} primary="Add Car" />
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Appbar handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}



export default Dashboard;
