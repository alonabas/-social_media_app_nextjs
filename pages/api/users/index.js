import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	const session = await getSession({ req });
	const backendToken = session?.backendToken;
	if (req.method === 'GET') {
		if (!backendToken) {
			// send request to backend
			res.status(301).send('Failed to retrieve the list of users');
		} else {
			res.status(200).send([]);
		}
		return;
	}
	res.status(500).error('Not supported');
};

export default handler;
