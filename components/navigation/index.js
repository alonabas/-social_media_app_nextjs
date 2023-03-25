import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import COLORS from '../colors';
import IsLoggedIn from '../IsLoggedIn';
import StyledLink from '../styled/StyledLink';
import LogInOut from './LogInOut';
import UsersList from './UsersList';

const StyledDiv = styled('div')({
	backgroundColor: COLORS.second,
	color: COLORS.contrast2,
	minWidth: '200px',
});

const HomeLink = () => (
	<StyledLink href="/" className="align-self-center mt-2">
		Main page
	</StyledLink>
);

const Navigation = () => {
	const router = useRouter();
	const { userid } = router.query;

	return (
		<StyledDiv className="d-flex flex-column overflow-auto px-2 py-3">
			<LogInOut />
			<IsLoggedIn>
				{userid && <HomeLink />}
				<UsersList />
			</IsLoggedIn>
		</StyledDiv>
	);
};

export default Navigation;
