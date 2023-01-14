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
