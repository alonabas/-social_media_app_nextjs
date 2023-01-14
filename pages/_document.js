import {
	Head, Html, Main, NextScript,
} from 'next/document';
import React from 'react';
import Container from '../components/Container';

const Document = () => (
	<Html>
		<Head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
			<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,500&display=swap" rel="stylesheet" />
		</Head>
		<body>
			<Container className="d-flex">
				<Main />
			</Container>
			<NextScript />
		</body>
	</Html>
);

export default Document;
