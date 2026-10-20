import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { isRecoveryHash, safeAuthDestination } from "./auth-flow";

describe("account redirect boundaries", () => {
  test("retains a same-origin workspace destination", () => {
    assert.equal(safeAuthDestination("/projects?tab=mine"), "/projects?tab=mine");
  });
  test("rejects external and backslash redirects", () => {
    for (const path of ["https://other.test", "//other.test", "/\\other.test"]) assert.equal(safeAuthDestination(path), undefined);
  });
});
describe("password recovery proof", () => {
  test("accepts a recovery-token callback", () => {
    assert.equal(isRecoveryHash("#type=recovery&access_token=test-token"), true);
  });
  test("does not accept normal sign-in or expired callbacks", () => {
    assert.equal(isRecoveryHash("#type=signup&access_token=test-token"), false);
    assert.equal(isRecoveryHash("#type=recovery"), false);
    assert.equal(isRecoveryHash("#type=recovery&access_token=test-token&error=access_denied"), false);
  });
});