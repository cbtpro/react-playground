// utils/assertNever.ts
export function assertNever(x: never, message = 'Unexpected value'): never {
  throw new Error(`${message}: ${JSON.stringify(x)}`);
}
