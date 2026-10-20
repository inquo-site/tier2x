import { describe, expect, test } from "bun:test";
import { isRecoveryHash, safeAuthDestination } from "./auth-flow";

describe("account redirect boundaries", () => {
  test("retains a same-origin workspace destination", () => {
    expect(safeAuthDestination("/projects?tab=mine")).toBe("/projects?tab=mine");
  });
  test("rejects external and backslash redirects", () => {
    for (const path of ["https://other.test", "//other.test", "/\\other.test"]) expect(safeAuthDestination(path)).toBeUndefined();
  });
});
describe("password recovery proof", () => {
  test("accepts a recovery-token callback", () => {
    expect(isRecoveryHash("#type=recovery&access_token=test-token")).toBe(true);
  });
  test("does not accept normal sign-in or expired callbacks", () => {
    expect(isRecoveryHash("#type=signup&access_token=test-token")).toBe(false);
    expect(isRecoveryHash("#type=recovery")).toBe(false);
    expect(isRecoveryHash("#type=recovery&access_token=test-token&error=access_denied")).toBe(false);
  });
});