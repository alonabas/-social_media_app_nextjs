import axios from 'axios';
import React from 'react';
import PostsControlContext from '../listPosts/context';
import PostInput from '../postInput';

const ChangePostContentTitle = ({
	setLoading,
	isLoading,
	id,
	closeEditingMode,
	setError,
	initialTitle,
	initialDescription,
	className,
	...props
}) => {
	const { refreshPosts } = React.useContext(PostsControlContext);
	const editExistingPost = (title, description) => {
		setLoading(true);
		return axios.post(`/api/post/${id}/`, { title, description }).then(() => {
			setTimeout(() => {
				refreshPosts();
				closeEditingMode();
			}, 1000);
		}).catch((e) => {
			setError(JSON.stringify(e));
		}).finally(() => setLoading(false));
	};
	return (
		<PostInput
			isLoading={isLoading}
			className={className}
			initialTitle={initialTitle}
			initialDescription={initialDescription}
			buttonTitle="Update post"
			onClose={closeEditingMode}
			onSave={editExistingPost}
			{...props}
		/>
	);
};

export default ChangePostContentTitle;
