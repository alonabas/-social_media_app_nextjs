import { CardContent } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

import StyledCard from './StyledCard';
import Author from './Author';

const ItalicDiv = styled('div')({
	fontStyle: 'italic',
	fontWeight: 300,
});

const PostDisplay = ({ post = {} }) => {
	const {
		id, author = {}, content, title,
	} = post;
	return (
		<StyledCard variant="elevation" elevation={8} raised>
			<CardContent className="d-flex flex-column">
				<div>{title}</div>
				<ItalicDiv>{content}</ItalicDiv>
				<Author author={author} />
			</CardContent>
		</StyledCard>
	);
};

export default PostDisplay;
