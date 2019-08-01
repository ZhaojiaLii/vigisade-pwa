import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import imageCompression from 'browser-image-compression';

export const compress = (event, options) => from(
  imageCompression(event.target.files[0], options)
).pipe(
  take(1),
  switchMap(file => imageCompression.getDataUrlFromFile(file)),
);
