import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { ThemeProvider } from '@mui/system';
import theme from '../components/MuiTheme';

export default ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<Component {...pageProps} />
	</ThemeProvider>
);
