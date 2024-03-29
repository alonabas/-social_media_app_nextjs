import axios from 'axios';
import { getSession } from 'next-auth/react';
import { createPost, getPostsList, getPostsListNoOwner } from '../../../utils/constants';

const handler = async (req, res) => {
	const session = await getSession({ req });
	const backendToken = session?.user?.backendToken;

	if (req.method === 'PUT') {
		const post = {
			title: req.body.title,
			content: req.body.description,
		};
		const result = await axios.post(process.env.GRAPHQL_BACKEND_URL, {
			query: createPost,
			variables: { post },
		}, { headers: { Authorization: backendToken } });
		const error = result?.data?.data?.postCreate?.errors?.[0]?.message;
		if (error) {
			res.status(400).end(error);
		} else {
			res.status(200).send('Post was created');
		}
	} else if (req.method === 'GET') {
		const result = await axios.post(process.env.GRAPHQL_BACKEND_URL, {
			query: req?.query?.userId ? getPostsListNoOwner : getPostsList,
			variables: {
				take: 10,
				userId: req?.query?.userId,
				cursorId: req?.query?.cursorId ? parseInt(req?.query?.cursorId, 10) : undefined,
			},
		}, { headers: { Authorization: backendToken } });
		const error = result?.data?.data?.posts?.errors?.[0]?.message;
		if (error) {
			res.status(400).end(error);
		} else {
			res.status(200).send({
				posts: result?.data?.data?.posts?.posts ?? [],
				hasMore: result?.data?.data?.posts?.hasMore,
			});
		}
	}
};

export default handler;
