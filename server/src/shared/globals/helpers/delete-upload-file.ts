import fs from 'fs';
import multer from 'multer';
export const deleteUploadedFile = (filePath: string): void => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error('Error deleting file:', error);
    } else {
      console.log('File deleted successfully');
    }
  });
};


export const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req,file,cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null,file.fieldname + '-' + uniqueSuffix);
  }
});
