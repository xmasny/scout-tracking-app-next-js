'use client';

import React, { useState } from 'react';
import ScrollToTop from 'react-scroll-up';
import { remove } from 'remove-accents';

import { useQuery } from '@apollo/client';
import { AddRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, CircularProgress, Fab, IconButton, TextField, Tooltip } from '@mui/material';

import Section from '../../components/Section/Section';
import VytvorNovuOdborkuDialog from '../../components/VytvorNovuOdborkuDialog/VytvorNovuOdborkuDialog';
import { VekKat } from '../../models/entities';
import { GetVekKatOdborkyQuery } from '../../queries.graphql';
import {
	BoxSpinner, FloatingButton, FloatingButtonLast, OdborkyBox, OdborkyContainer, OdporkyFab, OdporkyPaper,
	OdporkySearch
} from './odborky.styles';

const Odborky: React.FC = () => {
  const { data: vekKatData, loading: vekKatLoading } = useQuery(GetVekKatOdborkyQuery);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchField, setSearchField] = useState<string>('');

  if (vekKatLoading) {
    return (
      <BoxSpinner>
        <CircularProgress color="secondary" />
      </BoxSpinner>
    );
  }
  const textFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toLowerCase = e.target.value.toLowerCase();

    setSearchField(remove(toLowerCase));
  };

  console.log(vekKatData);

  const sections = vekKatData.vekovaKat.map((section: VekKat) => {
    return <Section key={section.id} id={section.id} name={section.name} searchField={searchField} />;
  });

  return (
    <Box>
      <OdborkyContainer sx={{ display: 'grid' }}>
        <OdporkyPaper>
          <IconButton>
            <OdporkySearch />
          </IconButton>
          <TextField variant="outlined" color="secondary" label="Hľadať" fullWidth onChange={textFieldHandler} />
        </OdporkyPaper>
        <OdborkyBox>{sections}</OdborkyBox>
      </OdborkyContainer>
      <OdporkyFab>
        <ScrollToTop style={{ position: 'static' }} showUnder={300} duration={2000} easing="easeInOutQuint">
          <FloatingButton>
            <Fab>
              <KeyboardArrowUpRounded />
            </Fab>
          </FloatingButton>
        </ScrollToTop>
        <FloatingButtonLast>
          <Tooltip title="Vytvoriť novú odborku" placement="left" arrow>
            <Fab onClick={handleOpen} color="primary">
              <AddRounded />
            </Fab>
          </Tooltip>
        </FloatingButtonLast>
      </OdporkyFab>
      <VytvorNovuOdborkuDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Odborky;
