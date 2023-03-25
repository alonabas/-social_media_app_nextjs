import React from 'react';
import useSWR from 'swr';
import { Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { getFetcher } from '../../utils/constants';
import Author from '../styled/AuthorDisplay';

const UsersList = () => {
	const { data = [], isLoading, error } = useSWR('/api/users', getFetcher);
	const router = useRouter();
	const { userid } = router.query;
	let content = '';
	if (isLoading) {
		content = (
			<CircularProgress color="customDark" className="align-self-center mt-3" disableShrink />
		);
	} else if (error) {
		content = (
			<Alert severity="error" variant="filled" color="error">
				{error.message}
			</Alert>
		);
	} else if (data) {
		content = data.map((u) => <Author author={u} key={u.id} selected={userid === `user${u.id}`} className="align-self-start" />);
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			{content}
		</div>
	);
};

export default UsersList;
