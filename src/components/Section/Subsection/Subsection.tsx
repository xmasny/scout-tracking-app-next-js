import { Accordion, AccordionSummary, Typography } from '@mui/material';

import { StyledBox, StyledSubsection } from './Subsection.styles';

interface Props {
	id: number;
	name: string;
	children: React.ReactNode;
}

const Subsection: React.FC<Props> = ({ id: expId, name: expName, children }) => {


	return (
		<StyledBox>
				<Accordion expanded>
					<AccordionSummary>
						<Typography variant="h5">{expName}</Typography>
					</AccordionSummary>
					<StyledSubsection>{children}</StyledSubsection>
				</Accordion>
		</StyledBox>
	);
};

export default Subsection;
