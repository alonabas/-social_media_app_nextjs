import React from 'react';
import LightContainer from '../../components/LightContainer';
import Posts from '../../components/Posts';
import UserName from '../../components/UserName';

const UserScreen = ({ profile }) => {
	console.log(profile);
	return (
		<LightContainer className="d-flex flex-column align-items-center py-3">
			<UserName>
				User
				{' '}
				{profile?.userId}
			</UserName>
			<Posts />
		</LightContainer>
	);
};

export const getStaticProps = async ({ params }) => {
	const userId = params?.userid;
	const query = `
		query($userId: ID!){
			profile(userId: $userId) {
				errors {
					message
					code
				}
				profile {
					bio
					user {
						email
						name
					}
				}
			}
		}
	`;
	try {
		const data = await fetch('http://localhost:4000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: { userId },
			}),
		}).then((r) => r.json());
		const errors = data?.data?.profile?.errors;
		if (errors.length >= 0) {
			if (errors[0]?.code === 401) {
				return {
					redirect: {
						destination: '/login',
					},
				};
			}

			return {
				redirect: {
					destination: '/',
				},
			};
		}
		const profile = data?.data?.profile?.profile;
		return {
			props: { profile },

		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths = async () => ({
	paths: [], // indicates that no page needs be created at build time
	fallback: 'blocking', // indicates the type of fallback
});

export default UserScreen;
