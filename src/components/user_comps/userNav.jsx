// import React from 'react'
// import { Link } from 'react-router-dom'
// import Greeting from '../general_comps/greeting'

// export default function UserNav() {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid d-flex justify-content-between align-items-center">
//                 <a className="navbar-brand" href="#">Logo</a>
//                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div className="navbar-nav">
//                         <Link className="nav-link active" aria-current="page" to={"/user/myInfo"}>My Info</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/rideOffer"}>Ride Offer</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/rideRequest"}>Ride Request</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/myRides"}>My Rides</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/messages"}>Messages</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/ridesHistory"}>Rides History</Link>
//                         <Link className="nav-link active" aria-current="page" to={"/user/logout"}>Logout</Link>
//                     </div>
//                 </div>

//                 <div className="p-0 align-items-center">
//                     <Greeting/>
//                 </div>
//             </div>
//         </nav>
//     )
// }


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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        LOGO
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
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
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
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                            to="/user/rideOffer"
                        >
                            Ride Offer
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                            to="/user/rideRequest"
                        >
                            Ride Request
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                            to="/user/myRides"
                        >
                            My Rides
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                            to="/user/messages"
                        >
                            Messages
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                            to="/user/ridesHistory"
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
