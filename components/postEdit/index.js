import {
	CardContent, Collapse, IconButton, LinearProgress, Snackbar,
} from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import StyledCard from '../styled/StyledCard';
import Author from '../styled/AuthorDisplay';
import PublishPost from '../publishPost/index';
import ChangePostContentTitle from './ChangePostContentTitle';
import CutContent from '../CutContent';

const PostEdit = ({ post = {}, className = '' }) => {
	const {
		id, author = {}, content, title, published,
	} = post;
	const [isEditing, setIsEditing] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	return (
		<StyledCard
			variant="elevation"
			elevation={published ? 8 : 0}
			raised
			className={className}
			width={300}
		>
			{isLoading && <LinearProgress color="customDark" />}
			<CardContent className="d-flex flex-row align-items-start pt-2">
				<PublishPost
					published={published}
					id={id}
					setIsLoading={setIsLoading}
					setError={setError}
					isLoading={isLoading}
				/>

				<div>

					<Collapse in={isEditing}>
						<ChangePostContentTitle
							setLoading={setIsLoading}
							isLoading={isLoading}
							id={id}
							closeEditingMode={() => setIsEditing(false)}
							setError={setError}
							initialTitle={title}
							initialDescription={content}
							className=""
						/>
					</Collapse>
					<Collapse in={!isEditing}>
						<div className="d-flex flex-row">
							<div className="d-flex flex-column pt-2">
								<div>{title}</div>
								<CutContent className="mb-auto" content={content} />
								<Author author={author} />
							</div>
							<IconButton color="customDark" ariaLabel="Edit post" className="ms-auto align-self-baseline flex-shrink-0">
								<ModeEditIcon
									onClick={() => setIsEditing(true)}
								/>
							</IconButton>
						</div>
					</Collapse>
				</div>
				<Snackbar
					color="customDark"
					open={!!error}
					autoHideDuration={1000}
					onClose={() => setError('')}
					message={error}
				/>
			</CardContent>
		</StyledCard>
	);
};

export default PostEdit;
