import { Alert, Button, TextField } from '@mui/material';
import React from 'react';
import { signIn, getSession } from 'next-auth/react';

import BoldTypography from '../components/BoldTypography';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	// TODO: status of login - loading, errors etc
	const errors = [];
	const isLoading = false;
	return (
		<React.Fragment>
			<LocalHead name="Enter to your account" />
			<Main className="d-flex flex-column m-auto align-items-center align-self-center my-auto">
				<BoldTypography color="custom" className="my-2">
					Login with your credentials
				</BoldTypography>
				{errors
					&& (
						<Alert severity="error" variant="outlined" color="error">
							{errors}
						</Alert>
					)					}
				<TextField
					label="E-mail"
					variant="outlined"
					size="small"
					color="custom"
					className="my-2"
					value={email}
					onChange={(e) => setEmail(e?.target?.value)}
				/>
				<TextField
					label="Pasword"
					variant="outlined"
					color="custom"
					size="small"
					type="password"
					className="my-2"
					value={password}
					onChange={(e) => setPassword(e?.target?.value)}

				/>
				<Button
					color="custom"
					variant="contained"
					onClick={() => signIn('credentials', { redirect: false, email, password })}
					disabled={isLoading}
				>
					{isLoading ? 'Signing in...' : 'Sign in'}
				</Button>

			</Main>
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}

export default Login;
