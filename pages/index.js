import axios from 'axios';
import { getSession } from 'next-auth/react';
import React from 'react';
import DisplayErrors from '../components/DisplayErrors';
import HasMore from '../components/HasMore';
import PostDisplay from '../components/postDisplay';

import { getPostsList, UNAUTHORIZED_CODE } from '../utils/constants';

const Home = ({ errors = [], publishedPosts = [], hasMore = false }) => {
	const [posts, setPosts] = React.useState(publishedPosts);
	const [areThereMorePosts, setAreThereMorePosts] = React.useState(hasMore);

	const onMore = async () => {
		const lastPostId = posts?.[posts.length - 1]?.id;
		const response = await axios(`/api/post?cursorId=${lastPostId}`);
		const { data } = response;
		setAreThereMorePosts(data.hasMore);
		setPosts((prev) => [
			...prev,
			...data.posts,
		].filter((e, i, all) => all.findIndex((el) => el.id === e.id) === i));
	};
	if (errors.length > 0) {
		return (
			<DisplayErrors errors={errors} />
		);
	}
	if (posts.length === 0) {
		return (
			<div>
				There are no published posts
			</div>
		);
	}
	return (
		<div className="d-flex flex-wrap">
			<HasMore more={areThereMorePosts} onMore={onMore}>
				{posts.map((p) => (
					<PostDisplay post={p} key={p.id} className="mx-2 my-1" />
				))}
			</HasMore>

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
				variables: { take: 2 },
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
				hasMore: response.data?.data?.posts?.hasMore ?? false,
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
				hasMore: false,
			},
		};
	}
}

export default Home;
