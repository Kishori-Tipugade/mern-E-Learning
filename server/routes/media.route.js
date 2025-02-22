import express from 'express';
import multer from 'multer';
import { uploadMedia } from '../utils/cloudinary.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-video', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const videoUrl = await uploadMedia(req.file.path);
        return res.status(201).json({
            success: true,
            data: {
                url: videoUrl.secure_url,
                public_id: videoUrl.public_id
            },
            message: 'Video uploaded successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Video upload failed' });
    }
});

export default router;
