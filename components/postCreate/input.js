import { Alert } from '@mui/material';
import axios from 'axios';
import React from 'react';
import PostsControlContext from '../listPosts/context';
import PostInput from '../postInput';
import reducer, { ACTIONS_FOR_SAVE_INPUT, INIT_STATE_FOR_SAVE_INPUT } from './reducer';

const Input = ({
	className = '',
	close,
	id,
	...props
}) => {
	const [state, dispatch] = React.useReducer(reducer, INIT_STATE_FOR_SAVE_INPUT);
	const { refreshPosts } = React.useContext(PostsControlContext);

	const createNewPost = (title, description) => {
		dispatch({ type: ACTIONS_FOR_SAVE_INPUT.START_SAVE });
		return axios.put('/api/post', { title, description }).then((result) => {
			dispatch({ type: ACTIONS_FOR_SAVE_INPUT.ON_SUCCESS, data: result.data });
			setTimeout(() => {
				refreshPosts();
				close();
			}, 1000);
		}).catch((e) => {
			dispatch({ type: ACTIONS_FOR_SAVE_INPUT.ON_ERROR, error: e });
		});
	};
	return (
		<PostInput
			isLoading={state.isLoading}
			className={className}
			initialTitle=""
			initialDescription=""
			buttonTitle="Create a post"
			onClose={close}
			onSave={createNewPost}
			{...props}
		>
			{state.error
				&& (
					<Alert severity="error" variant="filled" color="error">
						{state.error}
					</Alert>
				)}
		</PostInput>
	);
};

export default Input;
