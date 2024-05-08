import {promises as fs} from "fs";

export async function GET() {
    const asset = await fs.readFile("src/lib/assets/public/zoomer.png");
    
    return new Response(asset, {
        headers: {
          "Content-Type": "image/png"
        }
      })
}