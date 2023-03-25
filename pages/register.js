import { Alert, Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import React from 'react';
import BoldTypography from '../components/BoldTypography';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';
import theme from '../components/MuiTheme';

const Register = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [bio, setBio] = React.useState('');
	const [error, setError] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const register = () => {
		setIsLoading(true);
		signIn('credentials', {
			redirect: false, email, password, bio, name, signUp: true,
		}).then((r) => {
			setIsLoading(false);
			if (r.ok) {
				router.push('/');
			} else {
				setError(r.error ?? 'Failed to register');
			}
		}).catch((e) => {
			console.debug(e);
			setError('Failed to login');
			setIsLoading(false);
		});
	};
	return (
		<React.Fragment>
			<LocalHead name="Registration" />
			<ThemeProvider theme={theme}>

				<Main className="d-flex flex-column m-auto align-items-center align-self-center my-auto">
					<BoldTypography color="custom" className="my-2">
						Register to use Post Application
					</BoldTypography>
					{error
					&& (
						<Alert
							severity="error"
							variant="filled"
							color="customWithError"
							className="mx-2 my-3"
						>
							{error}
						</Alert>
					)}
					<TextField
						label="E-mail"
						variant="outlined"
						size="small"
						color="custom"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="my-2"
					/>
					<TextField
						label="Pasword"
						variant="outlined"
						color="custom"
						size="small"
						className="my-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<BoldTypography>
						Tell us something about yourself:
					</BoldTypography>
					<div className="d-flex flex-row justify-content-center align-items-start">
						<TextField
							label="Name"
							variant="outlined"
							size="small"
							color="custom"
							className="m-2"
							value={name}
							onChange={(e) => setName(e.target.value)}

						/>
						<TextField
							multiline
							label="Bio"
							variant="outlined"
							size="small"
							color="custom"
							className="m-2 w-100"
							value={bio}
							onChange={(e) => setBio(e.target.value)}

						/>

					</div>

					<Button color="custom" variant="contained" onClick={register} disabled={isLoading}>
						{isLoading ? 'Signing up' : 'Sign up'}
					</Button>

				</Main>
			</ThemeProvider>

		</React.Fragment>
	);
};

export default Register;
