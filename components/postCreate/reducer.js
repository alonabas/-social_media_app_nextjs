export const INIT_STATE_FOR_SAVE_INPUT = {
	data: undefined,
	isLoading: false,
	error: undefined,
};

export const ACTIONS_FOR_SAVE_INPUT = {
	START_SAVE: 'SAVE_INPUT_START',
	ON_ERROR: 'SAVE_INPUT_START_ON_ERROR',
	ON_SUCCESS: 'SAVE_INPUT_START_ON_SUCCESS',
	CLEAR: 'SAVE_INPUT_START_CLEAR',
};

const reducer = (state = INIT_STATE_FOR_SAVE_INPUT, action = {}) => {
	switch (action.type) {
	case ACTIONS_FOR_SAVE_INPUT.START_SAVE:
		return {
			data: undefined,
			isLoading: true,
			error: undefined,
		};
	case ACTIONS_FOR_SAVE_INPUT.ON_SUCCESS:
		return {
			data: action.data,
			isLoading: false,
			error: undefined,
		};
	case ACTIONS_FOR_SAVE_INPUT.ON_ERROR:
		return {
			data: undefined,
			isLoading: false,
			error: action.error,
		};
	case ACTIONS_FOR_SAVE_INPUT.CLEAR:
		return {
			...INIT_STATE_FOR_SAVE_INPUT,
		};
	default:
		return state;
	}
};

export default reducer;
