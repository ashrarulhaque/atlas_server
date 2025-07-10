import express from 'express';
import multer from 'multer';
import { uploadToDrive } from '../config/googleDrive.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const raw_DRIVE_FOLDER_ID = '1QNciEtxGo9lrQMUpCkLogljekFeeNmGD'; // 👈 from Google Drive
const processed_DRIVE_FOLDER_ID = '1T-MUBfJrxWr6IK2U0V4QcYkSjxSzWXxV'; 

router.post('/audio', upload.single('audio'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Google Drive
    const result = await uploadToDrive(file, raw_DRIVE_FOLDER_ID);

    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: result.id,
      viewLink: result.webViewLink,
      downloadLink: result.webContentLink,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.post('/processed', upload.single('audio'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Google Drive
    const result = await uploadToDrive(file, processed_DRIVE_FOLDER_ID);

    res.status(201).json({
      message: 'Processed file uploaded successfully',
      fileId: result.id,
      viewLink: result.webViewLink,
      downloadLink: result.webContentLink,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;