import { useSession } from 'next-auth/react';

const IsLoggedIn = ({ children }) => {
	const session = useSession();
	if (!session || session.status !== 'authenticated') {
		return '';
	}

	return (
		children
	);
};

export default IsLoggedIn;
