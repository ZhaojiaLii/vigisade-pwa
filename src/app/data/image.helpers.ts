import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import imageCompression from 'browser-image-compression';

export const isImageFile = fileInput => {
  return fileInput.target.files[0].type.split('/')[0] === 'image';
};

export const getDataUrlFromFile = (event, options) => from(
  imageCompression(event.target.files[0], options)
).pipe(
  take(1),
  switchMap(file => imageCompression.getDataUrlFromFile(file)),
);

export const IMAGE_PATH = {
  result: '/pwa/uploads/images/result/',
  action_corrective: '/pwa/uploads/images/action_corrective/',
  profile: '/admin/uploads/images/users/',
  dangerous_situation: '/pwa/uploads/images/dangerous_situation/',
};
