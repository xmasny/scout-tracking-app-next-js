import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Program } from '../../../../models/entities';
import ProgramInfo from './ProgramInfo/ProgramInfo';

type Props = {
	open: boolean;
	program: any;
	handleClose: () => void;
};

const ActivityModal: React.FC<Props> = ({ handleClose, open, program }) => {
	const [stupenProgram, setStupenProgram] = useState<Program>(program[0]);
	const [stupenButtonName, setStupenButtonName] = useState<string>('červený');
	const [buttonCollor, setButtonCollor] = useState<'error' | 'success'>('error');

	const { program_name, program_photo, ulohy, info, stupen, program_id } = stupenProgram;

	const programUlohyMap = ulohy.map((uloha: any) => {
		const programPodulohyMap = uloha.podulohy?.map((poduloha: any) => {
			return <li key={poduloha}>{poduloha}</li>;
		});
		return (
			<li key={uloha.uloha_id}>
				{uloha.text_ulohy}
				<ul>{programPodulohyMap}</ul>
			</li>
		);
	});

	useEffect(() => {
		if (stupen?.id === 1) {
			setStupenButtonName('Zobraziť červený stupeň');
			setButtonCollor('error');
		}
		if (stupen?.id === 2) {
			setStupenButtonName('Zobraziť zelený stupeň');
			setButtonCollor('success');
		}
	}, [stupen?.id]);

	const handleChangeStupen = () => {
		if (stupen?.id === 1) setStupenProgram(program[1]);
		if (stupen?.id === 2) setStupenProgram(program[0]);
	};

	const handleChoose = () => {
		console.log(program_id);
	};

	return (
		<Box>
			<Dialog open={open} onClose={handleClose} closeAfterTransition onBackdropClick={handleClose}>
				<DialogTitle>
					<Image src={program_photo} alt={program_name} />
					{program_name}
				</DialogTitle>
				<DialogContent>
					<ol>{programUlohyMap}</ol>
					{info && <ProgramInfo info={info} />}
				</DialogContent>
				<DialogActions>
					{program.length === 2 && (
						<Button variant="contained" color={buttonCollor} onClick={handleChangeStupen}>
							{stupenButtonName}
						</Button>
					)}
					<Button variant="contained" color="primary" onClick={handleChoose}>
						Pridať odborku
					</Button>
					<Button variant="contained" color="inherit" onClick={handleClose}>
						Zavrieť
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ActivityModal;
