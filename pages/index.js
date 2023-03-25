import axios from 'axios';
import { getSession } from 'next-auth/react';
import React from 'react';
import DisplayErrors from '../components/DisplayErrors';
import PostDisplay from '../components/postDisplay';

import { getPostsList, UNAUTHORIZED_CODE } from '../utils/constants';

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
		<div className="d-flex flex-wrap">
			{publishedPosts.map((p) => (
				<PostDisplay post={p} key={p.id} className="mx-2 my-1" />
			))}
		</div>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session || session.status === 'unauthenticated') {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	try {
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
		if (response.status === UNAUTHORIZED_CODE) {
			return {
				redirect: {
					destination: '/login',
				},
			};
		}
		return {
			props: {
				errors: response.data?.data?.posts?.errors ?? [],
				publishedPosts: response.data?.data?.posts?.posts ?? [],
			},
		};
	} catch (e) {
		if (e.response.status === UNAUTHORIZED_CODE) {
			return {
				redirect: {
					destination: '/login',
				},
			};
		}
		return {
			props: {
				errors: [{
					message: e.message,
				}],
				publishedPosts: [],
			},
		};
	}
}

export default Home;
