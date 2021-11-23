import { Observable } from 'rxjs';
import { chunkArray } from './array-functions';

export function createArrayOfObservablesByChunks<T, U>(
  arrToChunk: T[],
  chunkLimit: number,
  callback: (chunk: T[]) => Observable<U[]>
) {
  return [...chunkArray(arrToChunk, chunkLimit).map((x) => callback(x))];
}
