'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { AppBar, Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { Navbar, StickNavBar } from './NavBar.style';

const NavBar: React.FC = () => {
  const [alignment, setAlignment] = useState('odborky');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const links: string[] = ['odborky', 'vyzvy', 'moje-aktivity'];

  return (
    <StickNavBar>
      <AppBar>
        <Navbar>
          <Box>
            <Typography variant="h6">Slovensky skauting - odborky</Typography>
          </Box>
          <Box>
            <ToggleButtonGroup color="standard" exclusive value={alignment} onChange={handleChange}>
              {links.map((link) => (
                <Link href={`/${link}`} key={link}>
                  <ToggleButton value={link}>{link.split('-').join(' ')}</ToggleButton>
                </Link>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Navbar>
      </AppBar>
    </StickNavBar>
  );
};

export default NavBar;
