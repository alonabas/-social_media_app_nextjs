import { styled } from '@mui/system';
import { BG_COLORS } from './colors';

const Container = styled('main')({
	backgroundImage: `linear-gradient(to bottom right, ${BG_COLORS.start}, ${BG_COLORS.end})`,
	height: '100vh',
	width: '100vw',
});
export default Container;
