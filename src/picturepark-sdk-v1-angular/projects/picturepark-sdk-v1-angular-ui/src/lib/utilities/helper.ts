export function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function isNil(value: any): boolean {
  return value == null;
}

export function groupBy<T, K>(list: T[], getKey: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const key = getKey(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
  return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]>[]);
}
