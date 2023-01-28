import { styled } from '@mui/system';
import React from 'react';
import COLORS from '../colors';
import LogInOut from './LogInOut';
import UsersList from './UsersList';

const StyledDiv = styled('div')({
	backgroundColor: COLORS.second,
	color: COLORS.contrast2,
	minWidth: '200px',
});

const Navigation = () => (
	<StyledDiv className="d-flex flex-column overflow-auto px-2 py-3">
		<LogInOut />
		<UsersList />
	</StyledDiv>
);

export default Navigation;
