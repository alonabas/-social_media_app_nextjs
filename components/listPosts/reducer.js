export const INIT_STATE_FOR_POSTS = {
	posts: undefined,
	isLoading: false,
	error: undefined,
};

export const ACTIONS_FOR_LIST_POSTS = {
	START: 'LIST_POSTS_START',
	ON_ERROR: 'LIST_POSTS_ON_ERROR',
	ON_SUCCESS: 'LIST_POSTS_ON_SUCCESS',
	CLEAR: 'LIST_POSTS_CLEAR',
};

const reducer = (state = INIT_STATE_FOR_POSTS, action = {}) => {
	switch (action.type) {
	case ACTIONS_FOR_LIST_POSTS.START:
		return {
			posts: [],
			isLoading: true,
			error: undefined,
		};
	case ACTIONS_FOR_LIST_POSTS.ON_SUCCESS:
		return {
			posts: action.data,
			isLoading: false,
			error: undefined,
		};
	case ACTIONS_FOR_LIST_POSTS.ON_ERROR:
		return {
			posts: [],
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
