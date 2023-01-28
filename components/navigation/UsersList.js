import React from 'react';
import { useSession } from 'next-auth/react';

const UsersList = () => {
	const session = useSession();
	if (!session || session.status === 'unauthenticated') {
		return '';
	}
	return (
		<div>
			users
		</div>
	);
};

export default UsersList;
