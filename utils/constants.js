import axios from 'axios';

export const SERVER_URL = 'http://localhost:4000/';

export const loginQuery = `
	mutation($auth: AuthInput){
		signin(auth: $auth) {
			errors {
				message
			},
			token
		}
	}
`;

export const registerQuery = `
	mutation($auth: AuthInput!, $name: String!, $bio: String){
		signup(auth: $auth, name: $name, bio: $bio) {
			errors {
				message
			},
			token
		}
	}
`;

export const me = `
	query {
		me {
			user {
				email
			}
			errors {
				message
			}
		}
	}
`;

export const getPostsList = `
	query($userId: ID, $take: Int, $cursorId: Int) {
		posts(userId: $userId, take: $take, cursorId: $cursorId) {
			posts {
				author {
					email
					id
				}
				content
				title
				id
				published
			}
			hasMore
			errors {
				message
			}
		}
	}
`;

export const getPostsListNoOwner = `
	query($userId: ID, $take: Int, $cursorId: Int) {
		posts(userId: $userId, take: $take, cursorId: $cursorId) {
			posts {
				content
				title
				id
				published
			}
			hasMore
			errors {
				message
			}
		}
	}
`;

export const getUsersList = `
	query($take: Int, $cursorId: Int) {
		users(take: $take, cursorId: $cursorId) {
			users {
				email
				id
				name
			}
			errors {
				message
			}
			hasMore
		}
	}
`;

export const getUserProfileById = `
		query($userId: ID!){
			profile(userId: $userId) {
				errors {
					message
					code
				}
				profile {
					bio
					isMe
					posts(take: 10) {
						posts {
							content
							title
							published
							id
						}
						hasMore
					}
					user {
						email
						name
					}
				}
			}
		}
	`;

export const createPost = `
	mutation($post: PostInput!){
		postCreate(post: $post) {
			errors {
				message
			}
			post {
				content
				title
				id
			}
		}
	}
`;

export const publishPostQuery = `
	mutation($postId: ID!) {
		postPublish(postId: $postId) {
			errors {
				message
			},
			post {
				published
				id
			}
		}
	}
`;

export const unpublishPostQuery = `
	mutation($postId: ID!) {
		postUnpublish(postId: $postId) {
			errors {
				message
			},
			post {
				published
				id
			}
		}
	}
`;

export const updatePostQuery = `
	mutation($postId: ID!, $post: PostInput!) {
		postUpdate(postId: $postId, post: $post) {
			errors {
				message
			},
			post {
				published
				id
				title
				content
			}
		}
	}
`;

export const UNAUTHORIZED_CODE = 401;

export const getFetcher = async (url) => {
	const result = await axios(url);
	return result.data;
};

export const getFetcherWithCursorId = async (url, cursorId) => {
	const result = await axios(`${url}${cursorId ? `?cursorId=${cursorId}` : ''}`);
	return result.data;
};
