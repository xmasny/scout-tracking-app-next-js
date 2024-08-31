import styled from '@emotion/styled';
import { Toolbar } from '@mui/material';

export const StickNavBar = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
`;

export const Navbar = styled(Toolbar)`
	background: linear-gradient(to right, #32ac6d, #d1fb9b);
	justify-content: space-between;
`;
