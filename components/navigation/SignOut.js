import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';

const SignOut = ({ className = '' }) => (
	<Button
		onClick={signOut}
		color="customSemiDark"
		variant="contained"
		className={className}
	>
		Sign out
	</Button>
);

export default SignOut;
