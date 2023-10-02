import styled from '@emotion/styled'
import { NotificationsNoneRounded } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { grey, orange } from "@mui/material/colors"
import { Outlet, useNavigate } from "react-router-dom"

import logo from '@/assets/logo.png'
import InternalLink from "@/components/internal-link"

import config from './index.config'
import useAuthStore from '@/stores/auth'
import { useCallback } from 'react'

const MainAppBar = styled(AppBar)`
    padding: 0 1em;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${grey[300]};
`

const AppLogo = styled.img`
    width: 3em;
    height: 3em;
    margin-right: 1em;
`

const MainLayout = () => {
    const logout = useAuthStore(state => state.clearAuth)
    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        logout()
        navigate('/auth', { replace: true })
    }, [logout, navigate])

    return <>
        <Box sx={{ display: 'flex' }}>
            <MainAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar disableGutters>
                    <AppLogo src={logo} />
                    <Typography
                        variant="h6" noWrap component="a" href="/" color={orange[700]}>
                        Dynomo
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <NotificationsNoneRounded style={{ color: `${orange[700]}` }} />
                    <Button onClick={handleLogout} sx={{ color: orange[700], cursor: 'pointer', mx: 3 }} variant='text'>Log out</Button>
                </Toolbar>
            </MainAppBar>
            <Drawer
                component="nav"
                anchor="left"
                variant="persistent"
                open={true}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {config.menu.map(menu => (
                            <InternalLink key={menu.title} to={menu.href}>
                                <ListItem>
                                    <ListItemButton sx={{ borderRadius: '.5em' }}>
                                        <ListItemIcon>
                                            <menu.icon style={{ color: `${orange[700]}` }} />
                                        </ListItemIcon>
                                        <ListItemText primary={menu.title} />
                                    </ListItemButton>
                                </ListItem>
                            </InternalLink>
                        ))}
                    </List>
                </Box>
            </Drawer >
            <Box component="main" sx={{ my: 4, flexGrow: 1, overflow: 'auto' }}>
                <Toolbar />
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    </>
}

export default MainLayout