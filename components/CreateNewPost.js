import { Button, Collapse } from '@mui/material';
import React from 'react';
import PostInput from './postEdit/Input';

const CreateNewPost = () => {
	const [isOpenInput, setIsOpenInput] = React.useState(false);
	const openCreatePost = () => setIsOpenInput(true);
	return (
		<React.Fragment>
			<Collapse in={!isOpenInput}>
				<Button
					color="custom"
					variant="contained"
					onClick={openCreatePost}
				>
					Create a post
				</Button>
			</Collapse>
			<Collapse in={isOpenInput}>
				<PostInput close={() => setIsOpenInput(false)} />
			</Collapse>

		</React.Fragment>
	);
};

export default CreateNewPost;
