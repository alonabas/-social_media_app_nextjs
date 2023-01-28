import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const Register = ({ className = '' }) => {
	const router = useRouter();
	if (router.pathname === '/register') {
		return '';
	}
	const register = () => {
		router.push('/register');
	};

	return (
		<Button
			onClick={register}
			color="customSemiDark"
			variant="contained"
			className={className}
		>
			Register
		</Button>
	);
};

export default Register;
