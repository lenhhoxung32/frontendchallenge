export function insert<T>(index: number, item: T, array: T[]) {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

export function randomUserName(length: number) {
  return Array.from({ length }, (_, index) =>
    String.fromCodePoint(Math.random() * 1000)
  );
}
