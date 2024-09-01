'use client';

import React, { useEffect, useState } from 'react';

import { collect } from 'collect.js';
import { remove } from 'remove-accents';

import { useQuery } from '@apollo/client';
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from '@mui/material';

import { ActivityCard, Subsection } from '@/components';
import { ExpertskeOdborky, Program } from '@/models';
import { ProgKatEnum, VekKatEnum } from '@/models/enums';
import { GetExpertskeOdborkyQuery, GetProgramOdborkyQuery } from '@/queries.graphql';

const { SKAUTI } = VekKatEnum;
const { ODBORKY } = ProgKatEnum;

type Props = {
	name: string;
	id: number;
	searchField: string;
};

type Data = {
	program: Program[];
};

const Section: React.FC<Props> = ({ name: vekKatName, id: vekKatId, searchField }) => {
	const { data: expertskeOdborkyData, loading: expertskeOdborkyLoading } = useQuery(GetExpertskeOdborkyQuery);

	const { data: programData, loading: programLoading } = useQuery(GetProgramOdborkyQuery, {
		variables: { programId: ODBORKY, vekovaKatId: vekKatId },
	});

	const [filteredProgram, setFilteredProgram] = useState<Program[]>();

	useEffect(() => {
		if (!programLoading) {
			const filter = programData.program.filter((value: Program) =>
				remove(value.name.toLowerCase()).includes(searchField)
			);

			setFilteredProgram(filter);
		}
	}, [programData, searchField, programLoading]);

	if (expertskeOdborkyLoading || programLoading) {
		return (
			<Box>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	const collection = collect(filteredProgram);
	const program = collection.groupBy('name').toArray();

	const subsections = () =>
		expertskeOdborkyData.expertskeOdborky.map((subsection: ExpertskeOdborky) => {
			const expFiltered = program.filter(
				(odborka: any) => odborka.items[0].expertske_odborky.id === subsection.id
			);

			return <Subsection key={subsection.id} id={subsection.id} name={subsection.name} program={expFiltered} />;
		});

	const programMapped = program.map((aktivita: any) => {
		return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
	});

	return (
		<Box className={css.box}>
			{programMapped.length !== 0 && (
				<Accordion expanded>
					<AccordionSummary>
						<Typography variant="h4">{vekKatName}</Typography>
					</AccordionSummary>
					<AccordionDetails className={vekKatId === SKAUTI ? null : css.sectionOther}>
						{programMapped.length === 0 && <p>V danej kategorii sa nenachadza ziadna aktivita</p>}
						{vekKatId === SKAUTI ? subsections() : programMapped}
					</AccordionDetails>
				</Accordion>
			)}
		</Box>
	);
};

export default Section;
