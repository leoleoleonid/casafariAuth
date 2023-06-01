import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Logout from "../Auth/Logout";
import {AuthContext} from "../Auth/AuthProvider";

export const pages = [
    {
        path: '/profile',
        name: 'Profile',
        private: true
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        private: false
    },
    {
        path: '/login',
        name: 'Login',
        private: false
    }
];

function NavBar() {
    const {token} = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((page) => {
                                if (!token && page.private) return null;
                                return (
                                    <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                                        <Link to={page.path} style={{textDecoration: 'none'}}>
                                            <Typography
                                                variant="subtitle1"
                                                component="div"
                                                sx={{
                                                    color: 'text.primary',
                                                    py: 1,
                                                    textAlign: 'center',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                {page.name}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => {
                            if (!token && page.private) return null;
                            return (
                                <Link to={page.path} style={{textDecoration: 'none'}}>
                                    <Button
                                        key={page.path}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            mx: 2,
                                            color: '#FFFFFF',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            )
                        })}
                    </Box>
                    {token && <Box sx={{flexGrow: 0}}>
                        <Logout/>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
