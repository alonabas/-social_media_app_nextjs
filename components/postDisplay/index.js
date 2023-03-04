import { CardContent } from '@mui/material';
import React from 'react';

import StyledCard from '../styled/StyledCard';
import Author from '../styled/AuthorDisplay';
import ItalicDiv from '../styled/ItalicDiv';

const PostDisplay = ({ post = {}, className = '' }) => {
	const {
		author = {}, content, title,
	} = post;
	return (
		<StyledCard variant="elevation" elevation={8} raised className={className}>
			<CardContent className="d-flex flex-column">
				<div>{title}</div>
				<ItalicDiv>{content}</ItalicDiv>
				<Author author={author} />
			</CardContent>
		</StyledCard>
	);
};

export default PostDisplay;
