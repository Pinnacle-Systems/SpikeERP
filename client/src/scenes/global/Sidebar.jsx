import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  ShoppingCart as ShoppingCartIcon,
  Build as BuildIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { push } from '../../redux/features/opentabs';
import { ColorContext } from './ColorContext';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: '50%',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5,1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarContainer = styled(Box)(({ theme, isCollapsed }) => ({
  width: isCollapsed ? '50px' : '200px',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#F9FAFB',
  transition: 'width 0.3s ease, background-color 0.3s ease',
  height: '100vh',
  boxShadow: isCollapsed ? 'none' : '2px 0 4px rgba(0, 0, 0, 0.1)',
  paddingTop: theme.spacing(1),
  paddingLeft: isCollapsed ? 0 : theme.spacing(1),
}));

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { color } = useContext(ColorContext);

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <List>
        {/* Dashboard */}
        <Tooltip title="Dashboard" placement="right" disableHoverListener={!isCollapsed}>
          <StyledListItemButton onClick={() => dispatch(push({ id: 1, name: 'DASHBOARD' }))}>
            <StyledListItemIcon>
              <DashboardIcon sx={{ color: color || '#CA8A04', fontSize: '28px' }} />
            </StyledListItemIcon>
            {!isCollapsed && <ListItemText primary="Dashboard" />}
          </StyledListItemButton>
        </Tooltip>

        {/* User */}
       

        {/* Order Management */}
        <Tooltip title="Order Management" placement="right" disableHoverListener={!isCollapsed}>
          <StyledListItemButton onClick={() => dispatch(push({ id: 3, name: 'Order Status' }))}>
            <StyledListItemIcon>
              <AssignmentIcon sx={{ color: color || '#CA8A04', fontSize: '28px' }} />
            </StyledListItemIcon>
            {!isCollapsed && <ListItemText primary="Order Management" />}
          </StyledListItemButton>
        </Tooltip>

        {/* Purchase Order Management */}
        <Tooltip title="Purchase Order Management" placement="right" disableHoverListener={!isCollapsed}>
          <StyledListItemButton onClick={() => dispatch(push({ id: 2, name: 'PO Register' }))}>
            <StyledListItemIcon>
              <ShoppingCartIcon sx={{ color: color || '#CA8A04', fontSize: '28px' }} />
            </StyledListItemIcon>
            {!isCollapsed && <ListItemText primary="Purchase Order Management" />}
          </StyledListItemButton>
        </Tooltip>

        {/* Production Management */}
        <Tooltip title="Production Management" placement="right" disableHoverListener={!isCollapsed}>
          <StyledListItemButton onClick={() => dispatch(push({ id: 5, name: 'Production Orders' }))}>
            <StyledListItemIcon>
              <BuildIcon sx={{ color: color || '#CA8A04', fontSize: '28px' }} />
            </StyledListItemIcon>
            {!isCollapsed && <ListItemText primary="Production Management" />}
          </StyledListItemButton>
        </Tooltip>
        <Tooltip title="User" placement="right" disableHoverListener={!isCollapsed}>
          <StyledListItemButton onClick={() => dispatch(push({ id: 4, name: 'User' }))}>
            <StyledListItemIcon>
              <PersonIcon sx={{ color: color || '#CA8A04', fontSize: '28px' }} />
            </StyledListItemIcon>
            {!isCollapsed && <ListItemText primary="User" />}
          </StyledListItemButton>
        </Tooltip>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
