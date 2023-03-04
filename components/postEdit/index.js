import {
	CardContent, Checkbox, IconButton, LinearProgress, Snackbar, Tooltip,
} from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import StyledCard from '../styled/StyledCard';
import Author from '../styled/AuthorDisplay';
import ItalicDiv from '../styled/ItalicDiv';

const PostEdit = ({ post = {}, className = '' }) => {
	const {
		id, author = {}, content, title, published,
	} = post;
	const [isPublished, setIsPublished] = React.useState(published);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const publish = () => {
		setIsLoading(true);
		axios.patch(`/api/post/${id}`, { isPublished: !isPublished })
			.then((result) => {
				setIsPublished(result?.data?.published);
				setError(`Post ${result?.data?.published ? 'published' : 'unpublished'}`);
			}).catch((e) => {
				setError(e?.message);
			}).finally(() => setIsLoading(false));
	};
	return (
		<React.Fragment>
			<StyledCard
				variant="elevation"
				elevation={8}
				raised
				className={className}
				width={300}
			>
				{isLoading && <LinearProgress color="customDark" />}
				<CardContent className="d-flex flex-row align-items-start pt-2">
					<Tooltip title={isPublished ? 'Unpublish' : 'Publish'} arrow placement='left' >
						<Checkbox
							disabled={isLoading}
							checked={isPublished}
							onChange={publish}
							color="customDark"
						/>
					</Tooltip>
					<div className="d-flex flex-column pt-2">
						<div>{title}</div>
						<ItalicDiv>{content}</ItalicDiv>
						<Author author={author} />
					</div>
					<IconButton color="customDark" ariaLabel="Edit post" className="ms-auto">
						<ModeEditIcon />
					</IconButton>
				</CardContent>
			</StyledCard>
			<Snackbar
				color="customDark"
				open={!!error}
				autoHideDuration={1000}
				onClose={() => setError('')}
				message={error}
			/>
		</React.Fragment>
	);
};

export default PostEdit;
