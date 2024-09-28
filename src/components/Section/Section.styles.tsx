import styled from '@emotion/styled';
import { AccordionDetails, Box } from '@mui/material';

const StyledBoxSpinner = styled(Box)`
	display: grid;
	justify-content: center;
	margin: 1rem;
`;

const StyledBox = styled(Box)`
	margin: 1rem;
	z-index: -1;
`;
const AccordionDetailsStyled = styled(AccordionDetails)`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: top;
`;

export { AccordionDetailsStyled as AccordionDetails, StyledBoxSpinner, StyledBox };
