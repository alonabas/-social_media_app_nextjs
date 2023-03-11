/* eslint-disable no-param-reassign */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginQuery, registerQuery } from '../../../utils/constants';

export const authOptions = {
	// Configure one or more authentication providers
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signin: '/login',
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const {
					signUp, email, password, bio, name,
				} = credentials;
				const variables = signUp === 'true' ? {
					auth: {
						email,
						password,
					},
					bio,
					name,
				} : {
					auth: {
						email,
						password,
					},
				};
				const result = await axios.post(process.env.GRAPHQL_BACKEND_URL, {
					query: signUp === 'true' ? registerQuery : loginQuery,
					variables,
				});
				const key = signUp === 'true' ? 'signup' : 'signin';

				const token = result?.data?.data?.[key]?.token;
				const errors = result?.data?.data?.[key]?.errors?.[0]?.message;
				// If no error and we have user data, return it
				if (token) {
					return { backendToken: token, email: credentials.email };
				}
				if (errors || errors.length > 0) {
					throw new Error(errors);
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					...token,
					backendToken: user.backendToken,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
				};
			}
			return token;
		},
		async session({ session, token }) {
			session.user.backendToken = token.backendToken;
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.accessTokenExpires = token.accessTokenExpires;
			return session;
		},
	},
	jwt: {
		async encode({
			token,
			secret,
			maxAge,
		}) {
			const signedToken = await jwt.sign(
				{
					backendToken: token.backendToken,
					email: token.email,
				},
				secret,
				{ expiresIn: 360000 },
			);
			return signedToken;
		},
		async decode({
			token,
			secret,
		}) {
			const tokenData = await jwt.decode(token, secret);
			return tokenData;
		},
	},
	session: {
		strategy: 'jwt',
	},
};

export default NextAuth(authOptions);
