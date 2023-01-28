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
	query {
		posts {
			posts {
				author {
					email,
					id
				},
				content,
				title,
				id,
				published
			},
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
					user {
						email
						name
					}
				}
			}
		}
	`;

export const UNAUTHORIZED_CODE = 401;
