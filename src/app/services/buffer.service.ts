import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DelayedRequest } from '../interfaces/delayed-request.interface';
import { delayPost, replayPost } from '../store/buffer/buffer.actions';
import { State } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class BufferService {

  constructor(
    private store: Store<State>,
  ) {}

  delayPost(request: DelayedRequest): void {
    this.store.dispatch(delayPost({request}));
  }

  replayPost(delayedRequest: DelayedRequest): void {
    this.store.dispatch(replayPost({delayedRequest}));
  }
}
