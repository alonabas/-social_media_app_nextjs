import axios from 'axios';
import { getSession } from 'next-auth/react';
import React from 'react';
import DisplayErrors from '../components/DisplayErrors';
import PostDisplay from '../components/postDisplay';

import { getPostsList } from '../utils/constants';

const Home = ({ errors = [], publishedPosts = [] }) => {
	if (errors.length > 0) {
		return (
			<DisplayErrors errors={errors} />
		);
	}
	if (publishedPosts.length === 0) {
		return (
			<div>
				There are no published posts
			</div>
		);
	}
	return (
		<div>
			{publishedPosts.map((p) => (
				<PostDisplay post={p} key={p.id} />
			))}
		</div>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const response = await axios.post(
		process.env.GRAPHQL_BACKEND_URL,
		{
			query: getPostsList,
		},
		{
			headers: {
				Authorization: session?.user?.backendToken,
			},
		},
	);
	return {
		props: {
			errors: response.data?.data?.posts?.errors ?? [],
			publishedPosts: response.data?.data?.posts?.posts ?? [],
		},
	};
}

export default Home;
