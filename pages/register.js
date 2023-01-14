import { Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import BoldTypography from '../components/BoldTypography';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';
import theme from '../components/MuiTheme';

const Register = () => (
	<React.Fragment>
		<LocalHead name="Registration" />
		<ThemeProvider theme={theme}>

			<Main className="d-flex flex-column m-auto align-items-center align-self-center my-auto">
				<BoldTypography color="custom" className="my-2">
					Register to use Post Application
				</BoldTypography>
				<TextField
					label="E-mail"
					variant="outlined"
					size="small"
					color="custom"
					className="my-2"
				/>
				<TextField
					label="Pasword"
					variant="outlined"
					color="custom"
					size="small"
					className="my-2"
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
					/>
					<TextField
						multiline
						label="Bio"
						variant="outlined"
						size="small"
						color="custom"
						className="m-2 w-100"
					/>

				</div>

				<Button color="custom" variant="contained">
					Register
				</Button>

			</Main>
		</ThemeProvider>

	</React.Fragment>
);

export default Register;
