import { collect } from 'collect.js';

import { Accordion, AccordionSummary, CircularProgress, Typography } from '@mui/material';

import { useGetAllCategories, useGetProgramOdborky } from '@/features/queries';

import { ExpertskeOdborky } from '../../models/entities';
import { ProgKatEnum } from '../../models/enums/prog-kat.enum';
import { VekKatEnum } from '../../models/enums/vek-kat.enum';
import ActivityCard from './ActivityCard/ActivityCard';
import { AccordionDetails, StyledBox, StyledBoxSpinner } from './Section.styles';
import Subsection from './Subsection/Subsection';

const { SKAUTI } = VekKatEnum;
const { ODBORKY } = ProgKatEnum;

interface Props {
	name: string;
	id: number;
	searchField?: string;
}

const Section: React.FC<Props> = ({ name: vekKatName, id: vekKatId, searchField }) => {
	const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategories();
	const { data: programData, isLoading: programLoading } = useGetProgramOdborky(ODBORKY, {
		id: vekKatId,
		name: vekKatName,
	});


	if (categoriesLoading || programLoading) {
		return (
			<StyledBoxSpinner>
				<CircularProgress color="secondary" />
			</StyledBoxSpinner>
		);
	}

	const collection = collect(programData);
	const program = collection.groupBy('program_name').toArray();

	const subsections = () =>
		categoriesData?.expertskeOdborky.map((subsection: ExpertskeOdborky) => {
			const expFiltered = program.filter(
				(odborka: any) => odborka.items[0].expertske_odborky.id === subsection.id
			);

			const programMapped = expFiltered.map((aktivita: any) => {
				return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
			});

			return <Subsection key={subsection.id} id={subsection.id} name={subsection.name}>
				{programMapped}
			</Subsection>
		});

	const programMapped = program.map((aktivita: any) => {
		return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
	});

	return (
		<StyledBox>
			{programMapped.length !== 0 && (
				<Accordion expanded>
					<AccordionSummary>
						<Typography variant="h4">{vekKatName}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{programMapped.length === 0 && <p>V danej kategorii sa nenachadza ziadna aktivita</p>}
						{vekKatId === SKAUTI ? subsections() : programMapped}
					</AccordionDetails>
				</Accordion>
			)}
		</StyledBox>
	);
};

export default Section;
