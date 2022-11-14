import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Footer from './Footer';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import useGetUser from '../hooks/useGetUser';
import Link from 'next/link';
import Image from 'next/image';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Main({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user] = useGetUser()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handelLogout = () => {

  }

  return (
    <>
      <Box className="flex">
        <CssBaseline />

        <AppBar className="fixed" open={open}>
          <Toolbar className="flex flex-row justify-between items-center ">
            <Box className="flex flex-row items-center">
              <IconButton onClick={handleDrawerOpen}
                className={`ml-[-10px] text-inherit none mr-[5] ${open && 'hidden'}`} >
                <MenuIcon />
              </IconButton>

              <Link href="/" className='ml-4'>
                <Image src='/images/logo.svg' width={40} height={30} alt="logo bug"></Image>
              </Link>
            </Box>
            <Box className="flex flex-row items-center">


              <div className="relative rounded-md mr-2 hover:bg-white/[0.25] ml-0 w-full sm:ml-2 sm:w-auto bg-white/[0.15]">

                <div className="px-4 h-full absolute pointer-events-none flex items-center justify-center">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search', 'className': "ml-5 bg-inherit py-2 pr-2 pl-4 w-full sm:w-['12ch'] focus:w-['20ch']" }}
                />
              </div>

              {user ? (
                <Button onClick={handelLogout} className="bg-white text-blue-600 hover:bg-slate-100 hover:text-blue-500 ">
                  Logout
                </Button>
              ) : (
                <Button className="bg-white text-blue-600 hover:bg-slate-100 hover:text-blue-500 ">
                  <Link href='/login'>Login</Link>
                </Button>
              )}

            </Box>
          </Toolbar>

        </AppBar>

        <Drawer variant="permanent" open={open}>
          <div className='flex items-center justify-end px-3 mb-4'>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>

            <ListItem className="p-0 block" >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} >
                <Link href='/admin/create-project'>
                  <ListItemIcon
                    className={`min-w-[0] mr-${open ? '["3px"]' : "auto"} justify-center`} >
                    <DesignServicesIcon />
                  </ListItemIcon>
                </Link>
                <ListItemText primary="Create Project" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem className="p-0 block" >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} >
                <Link href='/admin/mange-users-roles'>
                  <ListItemIcon
                    className={`min-w-[0] mr-${open ? '["3px"]' : "auto"} justify-center`} >
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                </Link>
                <ListItemText primary="Mange Users Roles" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            {['Send email', 'Drafts'].map((text, index) => (
              <ListItem key={index} className="p-0 block" >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }} >
                  <ListItemIcon
                    className={`min-w-[0] mr-${open ? '["3px"]' : "auto"} justify-center`} >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    className={`min-w-[0] mr-${open ? '["3px"]' : "auto"} justify-center`} >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className='flex items-center justify-end px-3 mb-4'></div>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};
