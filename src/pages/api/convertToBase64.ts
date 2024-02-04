import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imagePath } = req.query;

  if (typeof imagePath !== 'string') {
    res.status(400).json({ error: 'Invalid image path' });
    return;
  }

  const absoluteImagePath = path.join(process.cwd(), "/src/pages", imagePath);

  try {
    const imageBuffer = await sharp(absoluteImagePath).toBuffer();
    const encodedImage = imageBuffer.toString('base64');
    res.status(200).json({ encodedImage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert image to base64' });
  }
}