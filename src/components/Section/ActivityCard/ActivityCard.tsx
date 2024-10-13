import React, { useState } from 'react';

import { Box, CardContent, CardMedia } from '@mui/material';

import { Program } from '@/models';

import { Card, CardTypography } from './ActivityCard.styles';
import ActivityModal from './ActivityModal/ActivityModal';

interface Props {
	program: Program[];
}

const ActivityCard: React.FC<Props> = ({ program }) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { program_id, program_name, program_photo } = program[0];

	return (
		<>
			<Box onClick={handleOpen}>
				<Card variant="outlined" sx={{ borderColor: 'white' }}>
					<CardMedia component="img" image={program_photo} alt={program_name}/>
					<CardContent>
						<CardTypography sx={{ fontWeight: 'bold' }} variant="h6">
							{program_name}
						</CardTypography>
					</CardContent>
				</Card>
			</Box>
			<ActivityModal key={program_id} open={open} handleClose={handleClose} program={program} />
		</>
	);
};

export default ActivityCard;
