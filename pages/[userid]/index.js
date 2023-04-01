import axios from 'axios';
import React from 'react';
import { styled } from '@mui/system';
import { getSession, signOut } from 'next-auth/react';

import LightContainer from '../../components/LightContainer';
import BoldDarkText24 from '../../components/BoldDarkText24';
import { getUserProfileById, SERVER_URL } from '../../utils/constants';
import Bio from '../../components/Bio';
import CreateNewPost from '../../components/postCreate';
import { PostsControlContextConstructor } from '../../components/listPosts/context';
import ListPosts from '../../components/listPosts';

const LocalLightContainer = styled(LightContainer)({
	top: 0,
	left: 0,
	margin: '5% 10%',
	padding: '10px 20px',
	height: 'calc(100vh - 10%)',
	width: 'calc(100vw - 20%)',
});

const UserScreen = ({ profile = {}, userId }) => (
	<LocalLightContainer className="d-flex flex-column align-items-center py-3 overflow-auto position-relative">
		<BoldDarkText24>
			User
			{' '}
			{profile?.user?.name}
		</BoldDarkText24>
		<Bio bio={profile?.bio} />
		{profile?.isMe && (
			<CreateNewPost />
		)}
		<PostsControlContextConstructor postsData={profile?.posts} userId={userId}>
			<ListPosts isEditable={profile?.isMe} />
		</PostsControlContextConstructor>
	</LocalLightContainer>
);

export const getServerSideProps = async (context) => {
	const { params } = context;
	const userId = params?.userid.replace('user', '');
	const session = await getSession(context);
	try {
		const { data } = await axios.post(
			SERVER_URL,
			{
				query: getUserProfileById,
				variables: { userId },
			},
			{
				headers: {
					Authorization: session?.user?.backendToken,
				},
			},
		);
		const errors = data?.data?.profile?.errors ?? [];
		if (errors.length > 0) {
			if (errors[0]?.code === 401) {
				await signOut();
				return {
					redirect: {
						destination: '/login',
					},
				};
			}

			return {
				notFound: true,
				// redirect: {
				// 	destination: '/',
				// },
			};
		}
		const profile = data?.data?.profile?.profile;
		return {
			notFound: profile === null,
			props: {
				profile,
				userId,
			},

		};
	} catch (e) {
		if (e?.response?.status === 401) {
			return {
				redirect: {
					destination: '/login',
				},
			};
		}
		return {
			notFound: true,
		};
	}
};

// export const getStaticPaths = async () => ({
// 	paths: [], // indicates that no page needs be created at build time
// 	fallback: 'blocking', // indicates the type of fallback
// });

export default UserScreen;
