import { CardContent } from '@mui/material';
import React from 'react';

import StyledCard from '../styled/StyledCard';
import Author from '../styled/AuthorDisplay';
import CutContent from '../CutContent';

const PostDisplay = ({ post = {}, className = '' }) => {
	const {
		author = {}, content, title,
	} = post;
	return (
		<StyledCard variant="elevation" elevation={8} raised className={className}>
			<CardContent className="d-flex flex-column h-100">
				<div>{title}</div>
				<CutContent className="mb-auto" content={content} />
				<Author author={author} />
			</CardContent>
		</StyledCard>
	);
};

export default PostDisplay;
