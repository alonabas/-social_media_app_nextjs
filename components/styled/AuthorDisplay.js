import { styled } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import COLORS from '../colors';

const StyledLink = styled(Link)({
	color: COLORS.contrast2,
	'&:hover, &:focus': {
		color: COLORS.contrast,
	},
});

const Author = ({ author = {} }) => (
	<StyledLink href={`/user${author.id}`} className="align-self-end mt-2">
		{author.email}
	</StyledLink>
);

export default Author;
