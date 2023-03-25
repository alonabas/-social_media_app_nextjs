import axios from 'axios';
import React from 'react';
import reducer, { ACTIONS_FOR_LIST_POSTS, INIT_STATE_FOR_POSTS } from './reducer';

const PostsControlContext = React.createContext({
	posts: [],
	isLoadingPosts: false,
	errorLoadingPosts: undefined,
	refreshPosts: () => {},
	clear: () => {},
});

export const PostsControlContextConstructor = ({ children, posts, userId }) => {
	const [state, dispatch] = React.useReducer(reducer, INIT_STATE_FOR_POSTS);

	React.useEffect(() => {
		dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_SUCCESS, data: posts });
	}, [posts]);

	const refreshPosts = () => {
		dispatch({ type: ACTIONS_FOR_LIST_POSTS.START });
		axios.get('/api/post', { params: { userId } }).then((res) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_SUCCESS, data: res.data });
		}).catch((e) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_ERROR, error: e });
		});
	};
	const value = React.useMemo(() => ({
		posts: state.posts,
		isLoadingPosts: state.isLoading,
		errorLoadingPosts: state.error,
		refreshPosts,
		clear: () => dispatch({ type: ACTIONS_FOR_LIST_POSTS.CLEAR }),
	}), [state, dispatch]);

	return (
		<PostsControlContext.Provider value={value}>
			{children}
		</PostsControlContext.Provider>
	);
};

export default PostsControlContext;
