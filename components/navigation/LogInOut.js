import React from 'react';
import { useSession } from 'next-auth/react';
import SignOut from './SignOut';
import Register from './Register';
import LogIn from './LogIn';

const LogInOut = () => {
	const session = useSession();
	if (session && session.data) {
		return (
			<SignOut className="mx-3 my-2" />
		);
	}

	return (
		<div className="d-flex flex-column">
			<Register className="mx-3 my-2" />
			<LogIn className="mx-3 my-2" />
		</div>
	);
};

export default LogInOut;
