'use client';

import React, { useState } from 'react';
import ScrollToTop from 'react-scroll-up';

import { remove } from 'remove-accents';

import { AddRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, CircularProgress, Fab, IconButton, TextField, Tooltip } from '@mui/material';

import { useGetAllCategories } from '@/features/queries';
import { VekKat, VekKatEnum } from '@/models';

import Section from '../../components/Section/Section';
import VytvorNovuOdborkuDialog from '../../components/VytvorNovuOdborkuDialog/VytvorNovuOdborkuDialog';
import {
	BoxSpinner,
	FloatingButton,
	FloatingButtonLast,
	OdborkyBox,
	OdborkyContainer,
	OdborkyFab,
	OdborkyPaper,
	OdborkySearch,
} from './odborky.styles';

const { VLCATA, SKAUTI, ROVERI } = VekKatEnum;

const Odborky: React.FC = () => {
	const { data, isLoading } = useGetAllCategories();

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [searchField, setSearchField] = useState<string>('');

	if (isLoading) {
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

	const sections = data?.vekovaKat
		.filter((vekKat) => [VLCATA, SKAUTI, ROVERI].includes(vekKat.id))
		.map((section: VekKat) => {
			return <Section key={section.id} id={section.id} name={section.name} searchField={searchField} />;
		});

	return (
		<Box>
			<OdborkyContainer sx={{ display: 'grid' }}>
				<OdborkyPaper>
					<IconButton>
						<OdborkySearch />
					</IconButton>
					<TextField
						variant="outlined"
						color="secondary"
						label="Hľadať"
						fullWidth
						onChange={textFieldHandler}
					/>
				</OdborkyPaper>
				<OdborkyBox>{sections}</OdborkyBox>
			</OdborkyContainer>
			<OdborkyFab>
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
			</OdborkyFab>
			<VytvorNovuOdborkuDialog open={open} handleClose={handleClose} />
		</Box>
	);
};

export default Odborky;
