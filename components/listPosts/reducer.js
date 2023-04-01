export const INIT_STATE_FOR_POSTS = {
	posts: undefined,
	isLoading: false,
	hasMore: false,
	error: undefined,
};

export const ACTIONS_FOR_LIST_POSTS = {
	START: 'LIST_POSTS_START',
	ON_ERROR: 'LIST_POSTS_ON_ERROR',
	ON_SUCCESS: 'LIST_POSTS_ON_SUCCESS',
	CLEAR: 'LIST_POSTS_CLEAR',
	ON_SUCCESS_UPDATE: 'LIST_POSTS_ON_SUCCESS_UPDATE',
};

const reducer = (state = INIT_STATE_FOR_POSTS, action = {}) => {
	switch (action.type) {
	case ACTIONS_FOR_LIST_POSTS.START:
		return {
			posts: [],
			hasMore: false,
			isLoading: true,
			error: undefined,
		};
	case ACTIONS_FOR_LIST_POSTS.ON_SUCCESS:
		return {
			posts: action.data?.posts ?? [],
			hasMore: action.data?.hasMore ?? false,
			isLoading: false,
			error: undefined,
		};

	case ACTIONS_FOR_LIST_POSTS.ON_SUCCESS_UPDATE:
		return {
			posts: [
				...state.posts,
				...(action.data?.posts ?? []),
			].filter((e, i, all) => all.findIndex((el) => el.id === e.id) === i),
			hasMore: action.data?.hasMore ?? false,
			isLoading: false,
			error: undefined,
		};
	case ACTIONS_FOR_LIST_POSTS.ON_ERROR:
		return {
			posts: [],
			hasMore: false,
			isLoading: false,
			error: action.error,
		};
	case ACTIONS_FOR_LIST_POSTS.CLEAR:
		return {
			...INIT_STATE_FOR_POSTS,
		};
	default:
		return state;
	}
};

export default reducer;
