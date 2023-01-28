import { Alert, Button, TextField } from '@mui/material';
import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import axios from 'axios';
import BoldTypography from '../components/BoldTypography';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';
import { me, UNAUTHORIZED_CODE } from '../utils/constants';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const signInFunc = () => {
		setIsLoading(true);
		signIn('credentials', {
			redirect: false, email, password, signUp: false,
		}).then((r) => {
			setIsLoading(false);
			if (r.ok) {
				redirect('/');
			} else {
				setError('Failed to login');
			}
		}).catch((e) => {
			console.debug(e);
			setError('Failed to login');
			setIsLoading(false);
		});
	};
	return (
		<React.Fragment>
			<LocalHead name="Enter to your account" />
			<Main className="d-flex flex-column m-auto align-items-center align-self-center my-auto">
				<BoldTypography color="custom" className="my-2">
					Login with your credentials
				</BoldTypography>
				{error
					&& (
						<Alert severity="error" variant="filled" color="error">
							{error}
						</Alert>
					)}
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
					onClick={signInFunc}
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
	if (!session || session.status === 'unauthenticated') {
		return {
			props: {},
		};
	}
	try {
		const response = await axios.post(
			process.env.GRAPHQL_BACKEND_URL,
			{
				query: me,
			},
			{
				headers: {
					Authorization: session?.user?.backendToken,
				},
			},
		);
		if (response.status === UNAUTHORIZED_CODE) {
			return {
				props: {},
			};
		}
		return {
			redirect: {
				destination: '/',
			},
		};
	} catch (e) {
		if (e.response.status === UNAUTHORIZED_CODE) {
			return {
				props: {},
			};
		}
	}

	return {
		props: {
			session,
		},
	};
}

export default Login;
