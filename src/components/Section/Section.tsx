"use client"

import { collect } from 'collect.js';
import React, { useEffect, useState } from 'react';
import { remove } from 'remove-accents';

import { useQuery } from '@apollo/client';
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from '@mui/material';

import { ExpertskeOdborky, Program } from '../../models/entities';
import { ProgKatEnum } from '../../models/enums/prog-kat.enum';
import { VekKatEnum } from '../../models/enums/vek-kat.enum';
import { GetExpertskeOdborkyQuery, GetProgramOdborkyQuery } from '../../queries.graphql';
import ActivityCard from './ActivityCard/ActivityCard';
import Subsection from './Subsection/Subsection';

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

const Section: React.FC<Props> = ({
	name: vekKatName,
	id: vekKatId,
	searchField,
}) => {
	const { data: expertskeOdborkyData, loading: expertskeOdborkyLoading } =
		useQuery(GetExpertskeOdborkyQuery);

	const {
		data: programData,
		loading: programLoading,
	}: { data: Data; loading: boolean } = useQuery(GetProgramOdborkyQuery, {
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
			<Box className={css.spinner}>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	const collection = collect(filteredProgram);
	const program = collection.groupBy("name").toArray();

	//console.log(program);

	const subsections = () =>
		expertskeOdborkyData.expertskeOdborky.map(
			(subsection: ExpertskeOdborky) => {
				const expFiltered = program.filter(
					(odborka: any) =>
						odborka.items[0].expertske_odborky.id === subsection.id
				);

				return (
					<Subsection
						key={subsection.id}
						id={subsection.id}
						name={subsection.name}
						program={expFiltered}
					/>
				);
			}
		);

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
					<AccordionDetails
						className={vekKatId === SKAUTI ? null : css.sectionOther}>
						{programMapped.length === 0 && (
							<p>V danej kategorii sa nenachadza ziadna aktivita</p>
						)}
						{vekKatId === SKAUTI ? subsections() : programMapped}
					</AccordionDetails>
				</Accordion>
			)}
		</Box>
	);
};

export default Section;

