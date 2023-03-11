import styled from '@emotion/styled';
import { Button, Collapse } from '@mui/material';
import React from 'react';
import PostInput from './input';

const CollapseStyled = styled(Collapse)({
	top: '15px',
	right: '28px',
	position: 'absolute',
});

const CreatePost = () => {
	const [isOpenInput, setIsOpenInput] = React.useState(false);
	const openCreatePost = () => setIsOpenInput(true);
	return (
		<div className="flex-shrink-0">
			<CollapseStyled in={!isOpenInput}>
				<Button
					color="custom"
					variant="contained"
					onClick={openCreatePost}
				>
					Create a post
				</Button>
			</CollapseStyled>
			<Collapse in={isOpenInput}>
				<PostInput close={() => setIsOpenInput(false)} />
			</Collapse>

		</div>
	);
};

export default CreatePost;
