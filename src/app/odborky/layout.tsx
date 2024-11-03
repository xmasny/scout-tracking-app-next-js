'use client';

import React, { ReactNode } from 'react';
import ScrollToTop from 'react-scroll-up';

import { AddRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';

import VytvorNovuOdborkuDialog from '@/components/VytvorNovuOdborkuDialog/VytvorNovuOdborkuDialog';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {children}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <ScrollToTop showUnder={300} duration={2000} easing="easeInOutQuint">
          <Fab color="secondary" size="small">
            <KeyboardArrowUpRounded />
          </Fab>
        </ScrollToTop>
        <Tooltip title="Vytvoriť novú odborku" placement="left" arrow>
          <Fab onClick={handleOpen} color="primary" sx={{ ml: 2 }}>
            <AddRounded />
          </Fab>
        </Tooltip>
      </Box>
      <VytvorNovuOdborkuDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default MainLayout;
