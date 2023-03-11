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
	query($userId: ID, $last: Int) {
		posts(userId: $userId, last: $last) {
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
			errors {
				message
			}
		}
	}
`;

export const getPostsListNoOwner = `
	query($userId: ID, $last: Int) {
		posts(userId: $userId, last: $last) {
			posts {
				content
				title
				id
				published
			}
			errors {
				message
			}
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
					posts(last: 10) {
						content
						title
						published
						id
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

export const getFetcher = (url) => axios(url)
	.then((res) => res.data)
	.catch((e) => {
		console.debug(`Error fetching ${url}: ${e}`);
		return [];
	});
