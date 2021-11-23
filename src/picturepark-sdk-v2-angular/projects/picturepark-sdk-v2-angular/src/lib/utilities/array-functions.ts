export function flatArray<T>(arr: T[][]): T[] {
  return ([] as T[]).concat(...arr);
}

export function chunkArray(arr: any[], chunkSize: number) {
  return [...Array(Math.ceil(arr.length / chunkSize))].map(_ => arr.splice(0, chunkSize));
}
