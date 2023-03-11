import React from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Alert, CircularProgress } from '@mui/material';
import { getFetcher } from '../../utils/constants';
import DisplayUser from './DisplayUser';

const UsersList = () => {
	const session = useSession();
	const { data = [], isLoading, error } = useSWR('/api/users', getFetcher);

	if (!session || session.status === 'unauthenticated') {
		return '';
	}
	let content = '';
	if (isLoading) {
		content = (
			<CircularProgress color="customDark" className="align-self-center mt-3" disableShrink />
		);
	} else if (error) {
		content = (
			<Alert severity="error" variant="filled" color="error">
				{error}
			</Alert>
		);
	} else if (data) {
		content = data.map((u) => <DisplayUser user={u} key={u.id} />);
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			{content}
		</div>
	);
};

export default UsersList;
