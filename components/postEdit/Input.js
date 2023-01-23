import { Button, TextField } from '@mui/material';
import React from 'react';
import DarkDiv from '../DarkDiv';
import reducer, { ACTIONS_FOR_SAVE_INPUT, INIT_STATE_FOR_SAVE_INPUT } from './reducer';

const Input = ({ className, close, ...props }) => {
	const [value, setValue] = React.useState('');
	const [state, dispatch] = React.useReducer(reducer, INIT_STATE_FOR_SAVE_INPUT);
	const savePost = () => {
		dispatch({ type: ACTIONS_FOR_SAVE_INPUT.START_SAVE });
	};
	return (
		<DarkDiv {...props} className={`${className} d-flex flex-wrap justify-content-between align-items-center px-3 py-2`}>
			<TextField
				color="custom"
				multiline
				rows="4"
				label="Post"
				value={value}
				onChange={(ev) => setValue(ev.target.value)}
			/>
			<Button
				color="custom"
				className="mx-2"
				variant="contained"
				onClick={savePost}
				disabled={state.isLoading}
			>
				{state.isLoading ? 'Saving' : 'Create a post'}
			</Button>
			<Button
				color="custom"
				className="mx-2"
				variant="contained"
				onClick={close}
				disabled={state.isLoading}
			>
				Cancel
			</Button>
		</DarkDiv>
	);
};

export default Input;
