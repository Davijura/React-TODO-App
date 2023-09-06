import React, { useContext } from 'react'
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/system';
import BuildIcon from '@mui/icons-material/Build'
import { useAppDispatch } from '@/redux/store'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'
import { ThemeSwitchContext } from '@/theme/theme'
import { Link } from 'react-router-dom'; // Importování komponenty Link

export const Header = () => {
    const themeMaterial = useTheme();
    const dispatch = useAppDispatch();
    const { toggleColorMode } = useContext(ThemeSwitchContext);
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <Stack direction={`row`} spacing={3} alignItems={`center`} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <BuildIcon />
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => navigate('/sign-in')}
                    >
                        <AccountCircle />
                    </IconButton>
                </Stack>
                <Stack direction={`row`} alignItems={`center`} gap={5}>
                    <Typography variant={'h6'} component={'div'}>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Todo App</Link>
                    </Typography>
                    <Typography variant={'h6'} component={'div'} color="#ffcb05">
                        <Link to="/pokemon" style={{ textDecoration: 'none', color: '#ffcb05' }}>Pokemons</Link>
                    </Typography>
                </Stack>
                <Stack direction={`row`} alignItems={`center`}>
                    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                        {themeMaterial.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
