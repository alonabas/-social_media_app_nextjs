import axios from 'axios';
import React from 'react';
import reducer, { ACTIONS_FOR_LIST_POSTS, INIT_STATE_FOR_POSTS } from './reducer';

const PostsControlContext = React.createContext({
	posts: [],
	hasMore: false,
	isLoadingPosts: false,
	errorLoadingPosts: undefined,
	refreshPosts: () => {},
	clear: () => {},
	getMore: () => {},
});

export const PostsControlContextConstructor = ({ children, postsData, userId }) => {
	const [state, dispatch] = React.useReducer(reducer, INIT_STATE_FOR_POSTS);

	React.useEffect(() => {
		dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_SUCCESS, data: postsData });
	}, [postsData]);

	const refreshPosts = () => {
		dispatch({ type: ACTIONS_FOR_LIST_POSTS.START });
		axios.get('/api/post', { params: { userId } }).then((res) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_SUCCESS, data: res.data });
		}).catch((e) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_ERROR, error: e });
		});
	};
	const getMoreFromLast = () => {
		dispatch({ type: ACTIONS_FOR_LIST_POSTS.START });
		const lastPostId = state?.posts?.[(state?.posts?.length ?? 1) - 1]?.id;
		axios.get('/api/post', { params: { userId, cursorId: lastPostId } }).then((res) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_SUCCESS_UPDATE, data: res.data });
		}).catch((e) => {
			dispatch({ type: ACTIONS_FOR_LIST_POSTS.ON_ERROR, error: e });
		});
	};
	const value = React.useMemo(() => ({
		posts: state.posts,
		hasMore: state.hasMore,
		getMore: getMoreFromLast,
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
