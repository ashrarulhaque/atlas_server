import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import bucket from '../config/firebase-admin.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uniqueFileName = `originals/${uuidv4()}-${req.file.originalname}`;
    const file = bucket.file(uniqueFileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.end(req.file.buffer);

    stream.on('finish', async () => {
      // Make file publicly accessible
      await file.makePublic();

      // Construct public URL manually
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // (or generate signed URL)
      // const [url] = await file.getSignedUrl({
      //   action: 'read',
      //   expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      // });

      res.json({
        message: 'File uploaded successfully',
        fileUrl: publicUrl,
        originalName: req.file.originalname,
        size: req.file.size,
      });
    });

    stream.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed' });
    });

  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/processed', upload.single('processed'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uniqueFileName = `processed/${uuidv4()}-${req.file.originalname}`;
    const file = bucket.file(uniqueFileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.end(req.file.buffer);

    stream.on('finish', async () => {

      // Make file publicly accessible
      await file.makePublic();

      // Construct public URL manually
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // const [url] = await file.getSignedUrl({
      //   action: 'read',
      //   expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      // });

      res.json({
        message: 'Processed file uploaded successfully',
        fileUrl: publicUrl,
        originalName: req.file.originalname,
        size: req.file.size,
      });
    });

    stream.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed' });
    });

  } catch (error) {
    console.error('Processed upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;