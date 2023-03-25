import axios from 'axios';
import { getSession } from 'next-auth/react';
import { getUsersList } from '../../../utils/constants';

const handler = async (req, res) => {
	const session = await getSession({ req });
	const backendToken = session?.user?.backendToken;
	if (req.method === 'GET') {
		if (!backendToken) {
			res.status(301).send('Failed to retrieve the list of users1? still1?');
		} else {
			const result = await axios.post(process.env.GRAPHQL_BACKEND_URL, {
				query: getUsersList,
				variables: { last: 10 },
			}, { headers: { Authorization: backendToken } });
			const error = result?.data?.data?.users?.errors?.[0]?.message;
			if (error) {
				console.debug('Error: ');
				console.debug(result?.data?.data?.users?.errors);
				res.status(400).end({ message: 'Failed to get list of users' });
			} else {
				res.status(200).send(result?.data?.data?.users?.users ?? []);
			}

			res.status(200).send([]);
		}
		return;
	}
	res.status(500).error('Not supported');
};

export default handler;
