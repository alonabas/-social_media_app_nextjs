import { Button, TextField } from '@mui/material';
import React from 'react';
import DarkDiv from '../DarkDiv';

const Input = ({ className, close, ...props }) => {
	const [value, setValue] = React.useState('');

	const savePost = () => {
		console.log('savePost');
	};
	return (
		<DarkDiv {...props} className={`${className} d-flex justify-content-between align-items-center px-3 py-2`}>
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
			>
				Create a post
			</Button>
			<Button
				color="custom"
				className="mx-2"
				variant="contained"
				onClick={close}
			>
				Cancel
			</Button>
		</DarkDiv>
	);
};

export default Input;
