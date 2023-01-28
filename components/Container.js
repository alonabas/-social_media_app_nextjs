import { styled } from '@mui/system';
import COLORS, { BG_COLORS } from './colors';

const Container = styled('main')({
	backgroundImage: `linear-gradient(to bottom right, ${BG_COLORS.start}, ${BG_COLORS.end})`,
	height: '100vh',
	width: '100vw',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'center',
	color: COLORS.second,
	borderColor: COLORS.second,
	'& > #__next': {
		height: '100vh',
		width: '100vw',
		display: 'flex',
	},
});
export default Container;
