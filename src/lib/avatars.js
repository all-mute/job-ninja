const avatarUrls = [
	'zoomer.png',
];

// c
export const getRandomImageFromArray = () => {
	const randomIndex = Math.floor(Math.random() * avatarUrls.length);
	const randomName = avatarUrls[randomIndex];
	return `/assets/avatars/${randomName}`;
};