import React from 'react';
import axios from 'axios';
import {
	Checkbox, Tooltip,
} from '@mui/material';

const PublishPost = ({
	published, id, setIsLoading, setError, isLoading,
}) => {
	const [isPublished, setIsPublished] = React.useState(published);

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
		<Tooltip title={isPublished ? 'Unpublish' : 'Publish'} arrow placement="left">
			<Checkbox
				disabled={isLoading}
				checked={isPublished}
				onChange={publish}
				color="customDark"
			/>
		</Tooltip>
	);
};

export default PublishPost;
