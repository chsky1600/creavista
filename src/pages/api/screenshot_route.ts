// pages/api/screenshot.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { takeScreenshot } from '../../scrape/gethomepage'; // Adjust the import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;
    console.log(url)

    if (typeof url === 'string') {
        const savePath = './src/pages/screenshot.png'; // Adjust path as needed, considering server environment

        try {
            await takeScreenshot(url, savePath);
            // console.log("saved!")
            // Respond with success, or consider sending the screenshot back in the response
            res.status(200).json({ success: true });
        } catch (error: unknown) {
            // Check if we're deatling with an Error object
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            } else {
                // Handle other types of thrown objects
                res.status(500).json({ success: false, error: "An unknown error occurred" });
            }
        }
        
    } else {
        res.status(400).json({ success: false, error: 'Invalid URL query parameter' });
    }
}
