import { config } from '@root/config';
import Logger from 'bunyan';
import cloudinary, { UploadApiResponse, UploadApiErrorResponse, DeleteApiResponse } from 'cloudinary';

const log: Logger = config.createLogger('cloudinaryUpload');


export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        folder: 'learningmanagement',
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}

export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        folder: 'learningmanagement',
        resource_type: 'video',
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}






export async function destroy(public_id: string, resource_type?: string): Promise<DeleteApiResponse | undefined> {
  try {
    const options = resource_type ? { resource_type } : undefined;
    const result = await cloudinary.v2.uploader.destroy(public_id,options);
    return result as DeleteApiResponse;
  } catch (error) {
    log.error('An error occurred during image deletion:', error);
    return undefined;
  }
}

