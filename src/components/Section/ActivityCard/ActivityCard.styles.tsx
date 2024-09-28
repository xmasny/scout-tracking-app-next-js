import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';

const StyledCard = styled(Card)`
	display: grid;
	justify-content: center;
	padding: 1rem;
	margin: 0.5rem;
	width: 192px;
	background-color: solid;
	transition: transform 1s;
	cursor: pointer;
	border-color: white;

	&:hover {
		transform: scale(1.2);
		filter: drop-shadow(0px 14px 28px rgba(0, 0, 0, 0.25));
	}
`;

const StyledCardTypography = styled(Typography)`
	display: grid;
	justify-content: center;
	text-align: center;
`;


export { StyledCard as Card, StyledCardTypography as CardTypography };
