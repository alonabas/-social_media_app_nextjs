import axios from 'axios';
import { getSession } from 'next-auth/react';
import { createPost } from '../../../utils/constants';

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
	}
};

export default handler;