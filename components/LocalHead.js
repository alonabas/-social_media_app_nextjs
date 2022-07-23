import Head from 'next/head';
import React from 'react';

const LocalHead = ({ name }) => (
	<Head>
		<title>{name}</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

export default LocalHead;
