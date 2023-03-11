import { CircularProgress, Snackbar } from '@mui/material';
import React from 'react';
import PostEdit from '../postEdit/index';
import PostsControlContext from './context';

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

const ListPosts = () => {
	const { posts = [] } = React.useContext(PostsControlContext);
	return (
		<Error>
			<Loading>
				<div className="d-flex flex-wrap justify-content-evenly align-items-center overflow-auto my-2">
					{posts.map((p) => (
						<PostEdit
							post={p}
							key={p.id}
							className="mx-3 my-2 align-self-stretch"
						/>
					))}
				</div>
			</Loading>
		</Error>
	);
};

export default ListPosts;
