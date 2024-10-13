import Image from 'next/image';

import styled from '@emotion/styled';
import { DialogTitle } from '@mui/material';

const StyledDialogTitle = styled(DialogTitle)`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-grow: 1;
	font-size: 3rem;
`;

const StyledImage = styled(Image)`
	display: grid;
	justify-self: center;
	max-width: 250px;
	max-height: 200px;
`;

export { StyledDialogTitle as DialogTitle, StyledImage };
