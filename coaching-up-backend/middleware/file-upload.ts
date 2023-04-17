import { Request } from 'express';
import { mkdirSync } from 'fs';
import multer from 'multer';
import { v1 } from 'uuid';

const MIME_TYPE_MAP : { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

export const imageUpload = multer({
    limits: { fileSize: 1000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, v1() + '.' + ext);
        }
    }),
    fileFilter: (req : Request, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        if (!isValid) {
            console.log(file.mimetype);
            return cb(new Error('Invalid file type.'));
        }

        cb(null, true);
    }
});