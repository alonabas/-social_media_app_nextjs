import React from 'react';
import useSWR, { mutate } from 'swr';
import { Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { getFetcher, getFetcherWithCursorId } from '../../utils/constants';
import Author from '../styled/AuthorDisplay';
import HasMore from '../HasMore';

const UsersList = () => {
	const { data = {}, isLoading, error } = useSWR('/api/users', getFetcher, { revalidateOnFocus: false });
	const [users, setUsers] = React.useState([]);
	const router = useRouter();
	const { userid } = router.query;
	let content = '';
	const cursorId = data?.users?.[(data?.users?.length ?? 1) - 1]?.id;
	React.useEffect(() => {
		setUsers((prev) => [...prev, ...(data.users ?? [])]
			.filter((e, i, all) => all.findIndex((el) => el.id === e.id) === i));
	}, [cursorId]);
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
	} else if (users) {
		content = (
			<HasMore
				more={data?.hasMore}
				onMore={() => mutate(
					'/api/users',
					getFetcherWithCursorId('/api/users', cursorId),
					false,
				)}
			>
				{users.map((u) => <Author author={u} key={u.id} selected={userid === `user${u.id}`} className="align-self-start" />)}
			</HasMore>
		);
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			{content}
		</div>
	);
};

export default UsersList;
