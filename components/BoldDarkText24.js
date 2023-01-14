import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import COLORS from './colors';

const BoldDarkText24 = styled(Typography)({
	fontWeight: 600,
	color: COLORS.contrast2,
	fontSize: '24px',
});

export default BoldDarkText24;
