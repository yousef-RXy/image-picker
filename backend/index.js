/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express, { static as static_ } from 'express';
import multer, { diskStorage } from 'multer';
import cors from 'cors';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ';-;' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype.startsWith('image'));
};

app.use(cors());
app.use(multer({ storage, fileFilter }).any());
app.use('/files', static_(join(__dirname, 'images')));

app.post('/images', (req, res, next) => {
  res.json({ message: 'success' });
});

app.use((req, res, next) => {
  res.json({
    Error: 'Page Not Found',
  });
});

app.use((error, req, res, next) => {
  res.json({
    Error: 'error in server',
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
