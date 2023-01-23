import { Card } from '@mui/material';
import { styled } from '@mui/system';
import COLORS from '../colors';

const StyledCard = styled(Card)({
	// fontWeight: 600,
	backgroundColor: COLORS.first,
	color: COLORS.contrast2,
	// fontSize: '24px',
});

export default StyledCard;
