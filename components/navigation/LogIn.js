import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const LogIn = ({ className = '' }) => {
	const router = useRouter();
	if (router.pathname === '/login') {
		return '';
	}
	const logInRedirect = () => {
		router.push('/login');
	};
	return (
		<Button
			onClick={logInRedirect}
			color="customSemiDark"
			variant="contained"
			className={className}
		>
			Sign in
		</Button>
	);
};

export default LogIn;
