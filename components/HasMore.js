import { Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

import COLORS from './colors';

const StyledButton = styled(Button)({
	color: COLORS.contrast2,
	'&:hover, &:focus': {
		color: COLORS.contrast,
	},
});

const HasMore = ({ more = false, children, onMore = () => {} }) => (
	<div className="d-flex flex-column w-100">
		{children}
		{more
			&& (
				<StyledButton onClick={onMore} variant="text">
					More...
				</StyledButton>
			)}
	</div>
);
export default HasMore;
