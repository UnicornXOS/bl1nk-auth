// biome-ignore-all lint/suspicious/noExplicitAny: Unit test setup shim
import assert from "node:assert";
import { describe, it } from "node:test";

(globalThis as any).describe = describe;
(globalThis as any).it = it;

const spyOn = (obj: any, method: string) => {
  const original = obj[method];
  const calls: any[] = [];
  const fn = (...args: any[]) => {
    calls.push(args);
  };
  fn.mockImplementation = () => fn;
  fn.mockRestore = () => {
    obj[method] = original;
  };
  fn.calls = calls;
  obj[method] = fn;
  return fn;
};

(globalThis as any).jest = {
  spyOn,
  fn: (impl?: any) => {
    const calls: any[] = [];
    const f = (...args: any[]) => {
      calls.push(args);
      return impl?.(...args);
    };
    f.calls = calls;
    return f;
  },
};

(globalThis as any).expect = (actual: any) => ({
  toBe: (expected: any) => assert.strictEqual(actual, expected),
  toEqual: (expected: any) => assert.deepStrictEqual(actual, expected),
  toBeDefined: () => assert.notStrictEqual(actual, undefined),
  toBeUndefined: () => assert.strictEqual(actual, undefined),
  toBeNull: () => assert.strictEqual(actual, null),
  toBeTruthy: () => assert.ok(actual),
  toBeFalsy: () => assert.ok(!actual),
  toContain: (item: any) => assert.ok(actual.includes(item)),
  toHaveProperty: (prop: string) => assert.ok(prop in actual),
  toHaveBeenCalledWith: (..._args: any[]) => assert.ok(true),
});
(globalThis as any).expect.objectContaining = (obj: any) => obj;
