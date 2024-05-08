import {promises as fs} from "fs";

const avatarUrls = [
	'zoomer.png',
  'boomer.png',
];

// c
const getRandomImageFromArray = () => {
	const randomIndex = Math.floor(Math.random() * avatarUrls.length);
	const randomName = avatarUrls[randomIndex];
	return `${randomName}`;
};

export async function GET() {
    const asset = await fs.readFile("src/lib/assets/public/avatars/" + getRandomImageFromArray());
    
    return new Response(asset, {
        headers: {
          "Content-Type": "image/png"
        }
      })
}