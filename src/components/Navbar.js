import { Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../App.css';
import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MosqueIcon from '@mui/icons-material/Mosque';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        grey: {
            main: '#000000',
            light: '#EEEEEE',
            dark: '#000000',
            contrastText: '#EEEEEE',
        },
    },
});

function Navbar() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 840);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const pages = [{ name: "About", reference: "/about" }, { name: "Quran", reference: "/quran" }, { name: "Hadeeth", reference: "/hadeeth" }]
    const open = Boolean(anchorElNav);

    const handleClick = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElNav(null);
    };

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 840);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='Navbar'>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='sitelogo'>
                    <MosqueIcon />
                    <h1 className='logo'>Blessed Path</h1>
                </div>
            </Link>
            <div className='links'>
                {isSmallScreen ? (
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
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
                            onClose={handleClose}
                        >
                            {pages.map((page) => (
                                <MenuItem component={Link} to={page.reference} key={page} onClick={handleClose}>
                                    <h1 className='dropdown-navbar'>{page.name}</h1>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : (
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="grey" sx={{ textTransform: 'none' }} component={Link} to={'/about'}>About</Button>
                        <Button variant="contained" color="grey" sx={{ textTransform: 'none', marginLeft: '20px' }} component={Link} to={'/quran'}>Quran</Button>
                        <Button variant="contained" color="grey" sx={{ textTransform: 'none', marginLeft: '20px' }} component={Link} to={'/hadeeth'}>Hadeeth</Button>
                    </ThemeProvider>
                )
                }
            </div>
        </div>
    )
}

export default Navbar