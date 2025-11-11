import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FolderPresent from '../components/FolderPresent';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import fileSystemData from '../data/data.json';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [activeFolderKey, setActiveFolderKey] = React.useState('downloads');
    const [listView, setListView] = React.useState(true); 

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const NavigationList = [
        { id: 1, name: "Downloads", key: "downloads", icon: <GetAppOutlinedIcon /> },
        { id: 2, name: "Documents", key: "documents", icon: <ArticleOutlinedIcon /> },
        { id: 3, name: "Pictures", key: "pictures", icon: <ImageOutlinedIcon /> },
        { id: 4, name: "Music", key: "music", icon: <PlayCircleFilledOutlinedIcon /> },
        { id: 5, name: "Videos", key: "videos", icon: <PlayCircleFilledOutlinedIcon /> },
    ];

    const MainFilesList = [
        { id: 1, name: "OS (C:)", icon: <FolderSpecialOutlinedIcon /> },
        { id: 2, name: "New Volume (D:)", icon: <FolderOutlinedIcon /> },
    ];

    const handleItemChange = (folderKey) => {
        setActiveFolderKey(folderKey);
    };

    const currentFolderData = fileSystemData[activeFolderKey] || [];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            { mr: 2 },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {NavigationList.find(item => item.key === activeFolderKey)?.name || 'File Explorer'}
                    </Typography>
                    <IconButton color="inherit" onClick={() => setListView(!listView)}>
                        {listView ? <ViewModuleIcon titleAccess="Switch to Card View" /> : <ViewListIcon titleAccess="Switch to List View" />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {NavigationList.map(item => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton 
                                onClick={() => handleItemChange(item.key)}
                                selected={activeFolderKey === item.key}
                            >
                                <ListItemIcon sx={{minWidth: "40px"}}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {/* <List>
                    {MainFilesList.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{minWidth: "40px"}}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Box>
                    <FolderPresent 
                        data={currentFolderData} 
                        listView={listView} 
                    />
                </Box>
            </Main>
        </Box>
    );
}
