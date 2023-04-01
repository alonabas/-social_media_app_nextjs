import { CircularProgress, Snackbar } from '@mui/material';
import React from 'react';
import HasMore from '../HasMore';
import PostDisplay from '../postDisplay';
import PostEdit from '../postEdit/index';
import RegularDark14 from '../RegularDark14';
import PostsControlContext from './context';

const NoPosts = ({ children, display = false }) => {
	if (display) {
		return (
			<RegularDark14>No posts yet</RegularDark14>
		);
	}
	return children;
};

const Error = ({ children }) => {
	const { error, clear } = React.useContext(PostsControlContext);
	if (error) {
		return (
			<Snackbar
				color="customDark"
				open={!!error}
				autoHideDuration={1000}
				onClose={clear}
				message={error}
			/>
		);
	}
	return children;
};

const Loading = ({ children }) => {
	const { isLoadingPosts } = React.useContext(PostsControlContext);
	if (isLoadingPosts) {
		return (
			<CircularProgress color="customDark" />
		);
	}
	return children;
};

const ListPosts = ({ isEditable = false }) => {
	const { posts = [], hasMore = false, getMore = () => {} } = React.useContext(PostsControlContext);
	return (
		<Error>
			<Loading>
				<div className="d-flex flex-wrap justify-content-evenly align-items-center overflow-auto my-2">
					<NoPosts display={posts.length === 0}>
						<HasMore more={hasMore} onMore={getMore}>
							{posts.map((p) => (
								isEditable
									? (
										<PostEdit
											post={p}
											key={p.id}
											className="mx-3 my-2 align-self-stretch"
										/>
									)
									: <PostDisplay post={p} key={p.id} className="mx-2 my-1 align-self-start" />
							))}
						</HasMore>
					</NoPosts>
				</div>
			</Loading>
		</Error>
	);
};

export default ListPosts;
