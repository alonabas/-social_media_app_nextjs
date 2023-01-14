import { styled } from '@mui/system';
import COLORS from './colors';

const LightContainer = styled('main')({
	backgroundImage: `linear-gradient(to bottom right, ${COLORS.second}, ${COLORS.fifth})`,
});
export default LightContainer;
