import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalShipping as ShipmentsIcon,
  Notifications as AlertsIcon,
  Analytics as AnalyticsIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Shipments', icon: <ShipmentsIcon />, path: '/shipments' },
    { text: 'Alerts', icon: <AlertsIcon />, path: '/alerts' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          mt: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.dark,
              },
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.light }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.light,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
