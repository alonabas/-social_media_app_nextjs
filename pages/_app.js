import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/system';

import theme from '../components/MuiTheme';

export default ({
	Component,
	pageProps: { session, ...pageProps },
}) => (
	<SessionProvider session={session}>
		<Head>
			<title>Create Next App</title>
		</Head>
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	</SessionProvider>

);
