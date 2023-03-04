import {
	Alert, Button, Snackbar, TextField,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import DarkDiv from '../DarkDiv';
import reducer, { ACTIONS_FOR_SAVE_INPUT, INIT_STATE_FOR_SAVE_INPUT } from './reducer';

const PostInput = ({ className = '', close, ...props }) => {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');

	const [state, dispatch] = React.useReducer(reducer, INIT_STATE_FOR_SAVE_INPUT);
	const savePost = () => {
		dispatch({ type: ACTIONS_FOR_SAVE_INPUT.START_SAVE });
		axios.put('/api/post', { title, description }).then((result) => {
			dispatch({ type: ACTIONS_FOR_SAVE_INPUT.ON_SUCCESS, data: result.data });
			setTitle('');
			setDescription('');
		}).catch((e) => {
			dispatch({ type: ACTIONS_FOR_SAVE_INPUT.ON_ERROR, error: e });
		});
	};
	return (
		<DarkDiv {...props} className={`${className} d-flex flex-wrap justify-content-between align-items-center px-3 py-2`}>
			<div className="d-flex flex-column mx-2">
				<TextField
					color="custom"
					multiline
					rows="1"
					className="my-1"
					label="Post"
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
				/>
				<TextField
					color="custom"
					multiline
					className="my-1"
					rows="4"
					label="Content"
					value={description}
					onChange={(ev) => setDescription(ev.target.value)}
				/>
			</div>
			<div className="d-flex flex-column align-self-end ms-1">
				{state.error
					&& (
						<Alert severity="error" variant="filled" color="error">
							{state.error}
						</Alert>
					)}
				<Snackbar
					open={state.data}
					autoHideDuration={1000}
					onClose={() => dispatch(ACTIONS_FOR_SAVE_INPUT.CLEAR)}
					message={state.data}
				/>
				<Button
					color="custom"
					className="mx-2 my-1"
					variant="contained"
					onClick={savePost}
					disabled={state.isLoading}
				>
					{state.isLoading ? 'Saving' : 'Create a post'}
				</Button>
				<Button
					color="custom"
					className="mx-2 my-1"
					variant="contained"
					onClick={close}
					disabled={state.isLoading}
				>
					Cancel
				</Button>
			</div>

		</DarkDiv>
	);
};

export default PostInput;
