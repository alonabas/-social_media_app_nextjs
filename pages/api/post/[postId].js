import axios from 'axios';
import { getSession } from 'next-auth/react';
import { unpublishPostQuery, publishPostQuery } from '../../../utils/constants';

const handler = async (req, res) => {
	const { isPublished } = req.body;
	const { postId } = req.query;
	const session = await getSession({ req });
	const backendToken = session?.user?.backendToken;

	if (req.method === 'PATCH') {
		const path = isPublished ? 'postPublish' : 'postUnpublish';
		const query = isPublished ? publishPostQuery : unpublishPostQuery;
		const result = await axios.post(process.env.GRAPHQL_BACKEND_URL, {
			query,
			variables: { postId },
		}, { headers: { Authorization: backendToken } });
		const error = result?.data?.data?.[path]?.errors?.[0]?.message;
		if (error) {
			res.status(400).end(error);
		} else {
			res.status(202).json({ published: result?.data?.data?.[path]?.post?.published });
		}
	}
};

export default handler;
