import { Button, TextField } from '@mui/material';
import React from 'react';
import DarkDiv from '../DarkDiv';

const PostInput = ({
	isLoading,
	className,
	initialTitle,
	initialDescription,
	children: errorComponent,
	buttonTitle,
	onClose,
	onSave,
	...props
}) => {
	const [title, setTitle] = React.useState(initialTitle);
	const [description, setDescription] = React.useState(initialDescription);
	const notChanged = title === initialTitle && description === initialDescription;
	const clear = () => {
		setTitle('');
		setDescription('');
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
				{
					errorComponent
				}
				<Button
					color="custom"
					className="mx-2 my-1"
					variant="contained"
					onClick={() => onSave(title, description).then(clear)}
					disabled={isLoading || notChanged}
				>
					{isLoading ? 'Saving' : buttonTitle}
				</Button>
				<Button
					color="custom"
					className="mx-2 my-1"
					variant="contained"
					onClick={onClose}
					disabled={isLoading}
				>
					Cancel
				</Button>
			</div>
		</DarkDiv>
	);
};

export default PostInput;
