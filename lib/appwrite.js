import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from 'react-native-appwrite';
export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.chattha.delta',
	projectId: '66ddd81b002e31e9238e',
	databaseId: '66ddd9b200213b343e55',
	userCollectionId: '66ddd9d3002979f532ee',
	videoCollectionId: '66ddda0d000b7e7477c4',
	storageId: '66dddbac003a66dcd520',
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

// Init React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		throw new Error(error);
	}
};
export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		if (!session) {
			throw new Error('Error signing in');
		}
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw new Error('Error fetching user');

		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);
		if (!currentUser) throw new Error('Error fetching user');
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

export const getAllPosts = async () => {
	try {
		posts = await databases.listDocuments(databaseId, videoCollectionId);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt', Query.limit(7)),
		]);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
