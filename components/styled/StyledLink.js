import { styled } from '@mui/system';
import Link from 'next/link';
import COLORS from '../colors';

const StyledLink = styled(Link)(({ $selected }) => ({
	color: COLORS.contrast2,
	'&:hover, &:focus': {
		color: COLORS.contrast,
	},
	...($selected ? {
		fontWeight: 'bold',
	} : {}),
}));

export default StyledLink;
