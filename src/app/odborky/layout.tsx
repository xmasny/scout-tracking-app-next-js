import React, { ReactNode } from 'react';
import ScrollToTop from 'react-scroll-up';

import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';

interface Props {
	children: ReactNode;
}

const OdborkyLayout: React.FC<Props> = ({ children }) => {
	return (
		<Box>
			{children}
			<Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
				<ScrollToTop showUnder={300} duration={2000} easing="easeInOutQuint">
					<Fab color="secondary" size="small">
						<KeyboardArrowUpRounded />
					</Fab>
				</ScrollToTop>
			</Box>
		</Box>
	);
};

export default OdborkyLayout;
