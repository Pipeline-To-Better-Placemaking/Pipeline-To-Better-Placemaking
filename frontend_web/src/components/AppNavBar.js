import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Image from 'react-bootstrap/Image';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import './controls.css';
import logo1 from '../images/PtBPLogo.png';

// pages left incase of need for additional route info
// uses hamburger on small viewports
const pages = [
    {
        page: 'Teams',
        route: '/home'
    },
    {
        page: 'Projects',
        route: '/home/teams/:id'
    }];

// Routes according to React-Router relative urls
const settings = [
    {
        page: 'Account',
        route: 'settings'
    },
    {
        page: 'Logout',
        route: '/'

    }
];

//SVG Home icon link button
const home = <Link className='homeButton' to='/home'><Image src={logo1} className='icon-shadow' alt='logo' height='50px'/></Link>;

const AppNavBar = (props) => {
    const userName = {
        fN: props.passToken.user?.firstname ? props.passToken.user.firstname : 'Abc',
        lN: props.passToken.user?.lastname ? props.passToken.user.lastname : 'Bcd',
        full: props.passToken.user?.lastname ? `${props.passToken.user.firstname} ${props.passToken.user.lastname}` : 'Abc Bcd'
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleLogOut() {
        setAnchorElUser(null);
        props.passLogout(false);
    }

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        id='siteName'
                        variant='h6'
                        noWrap
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        { home }
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={ handleOpenNavMenu }
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={ anchorElNav }
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={ Boolean(anchorElNav) }
                            onClose={ handleCloseNavMenu }
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/*{pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))}*/}
                        </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        { home }
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/*{pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}*/}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={ handleOpenUserMenu } sx={{ p: 0 }}>
                                <Avatar>{`${userName.fN[0]}${userName.lN[0]}`}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={ anchorElUser }
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={ Boolean(anchorElUser) }
                            onClose={ handleCloseUserMenu }
                        >
                            { settings.map((setting) => (
                                <MenuItem 
                                    component={ Link } 
                                    to={ setting.route } 
                                    key={ setting.page } 
                                    onClick={ setting.page === 'Account' ? handleCloseUserMenu : handleLogOut }
                                >
                                    <Typography textAlign='center'>{ setting.page }</Typography>
                                </MenuItem>
                            )) }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default AppNavBar;