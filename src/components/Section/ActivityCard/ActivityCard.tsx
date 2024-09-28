import React, { useState } from 'react';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Program } from '@/models';

import ActivityModal from './ActivityModal/ActivityModal';

type Props = {
	program: Program[];
};

const ActivityCard: React.FC<Props> = ({ program }) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { program_id, program_name, program_photo } = program[0];

	return (
		<>
			<Box onClick={handleOpen}>
				<Card variant="outlined" sx={{ borderColor: 'white' }}>
					<CardMedia component="img" image={program_photo} alt={program_name} />
					<CardContent>
						<Typography sx={{ fontWeight: 'bold' }} variant="h6">
							{program_name}
						</Typography>
					</CardContent>
				</Card>
			</Box>
			<ActivityModal key={program_id} open={open} handleClose={handleClose} program={program} />
		</>
	);
};

export default ActivityCard;
