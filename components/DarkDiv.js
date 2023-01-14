import { styled } from '@mui/system';
import COLORS, { BG_COLORS } from './colors';

const DarkDiv = styled('div')({
	backgroundImage: `linear-gradient(to bottom right, ${BG_COLORS.start}, ${BG_COLORS.end})`,
	display: 'flex',
	alignItems: 'center',
	color: COLORS.second,
	borderColor: COLORS.second,
	borderRadius: '6px',
});
export default DarkDiv;
