
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import Greeting from '../general_comps/greeting';
import styles from './css/userNav.module.css'

function UserNav() {
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

    return (

        <AppBar position="static" style={{ background: 'transparent', position: 'fixed', minHeight: '70px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/user"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <i className='bx bxs-car bx-tada' style={{ fontSize: '60px', color: '#ffffff' }}></i>
                    </Typography>

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
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/user/rideOffer" className="nav-link active" aria-current="page">Ride Offer</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/user/rideRequest" className="nav-link active" aria-current="page">Ride Request</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/user/myRides" className="nav-link active" aria-current="page">My Rides</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/user/ridesHistory" className="nav-link active" aria-current="page">Rides History</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    {/* <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ fontWeight: 'bold', my: 2, color: 'white', display: 'block', fontSize: '14px', fontFamily: '"Permanent Marker", cursive' }}
                            component={Link}
                            to="/user/rideOffer"
                            className={`${styles.link}`}
                        >
                            Ride Offer
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ fontWeight: 'bold', my: 2, color: 'white', display: 'block', fontSize: '14px', fontFamily: '"Permanent Marker", cursive' }}
                            component={Link}
                            to="/user/rideRequest"
                            className={`${styles.link}`}
                        >
                            Ride Request
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ fontWeight: 'bold', my: 2, color: 'white', display: 'block', fontSize: '14px', fontFamily: '"Permanent Marker", cursive' }}
                            component={Link}
                            to="/user/myRides"
                            className={`${styles.link}`}
                        >
                            My Rides
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ fontWeight: 'bold', my: 2, color: 'white', display: 'block', fontSize: '14px', fontFamily: '"Permanent Marker", cursive' }}
                            component={Link}
                            to="/user/messages"
                            className={`${styles.link}`}
                        >
                            Messages
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ fontWeight: 'bold', my: 2, color: 'white', display: 'block', fontSize: '14px', fontFamily: '"Permanent Marker", cursive' }}
                            component={Link}
                            to="/user/ridesHistory"
                            className={`${styles.link}`}
                        >
                            Rides History
                        </Button>
                    </Box>
                    <Greeting />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/user/myInfo" className="nav-link active" aria-current="page">My Info</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/user/messages" className="nav-link active" aria-current="page">Messages</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/user/logout" className="nav-link active" aria-current="page">Logout</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default UserNav;
