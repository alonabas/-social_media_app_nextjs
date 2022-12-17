import { Alert, Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';

import BoldTypography from '../components/BoldTypography';
import Container from '../components/Container';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';
import theme from '../components/MuiTheme';
import { loginQuery } from '../utils/constants';
import useRequest from '../utils/RequestHook';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const router = useRouter();
	const {
		data, isLoading, error, refetch: login,
	} = useRequest({
		query: loginQuery,
		variablesObj: {
			auth: {
				email,
				password,
			},
		},
		params: {
			initiallyDisabled: true,
			disabled: false,
		},
	});
	const token = data?.signin?.token;
	const errors = data?.signin?.errors?.[0]?.message ?? error;
	React.useEffect(() => {
		if (token) {
			window.sessionStorage.setItem('token', token);
			router.push('/');
		}
	}, [token]);
	return (
		<Container className="d-flex">
			<LocalHead name="Enter to your account" />
			<ThemeProvider theme={theme}>
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
						onClick={login}
						disabled={isLoading}
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</Button>

				</Main>
			</ThemeProvider>

		</Container>
	);
};

export default Login;
