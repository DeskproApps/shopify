import omit from "lodash/omit";
import { getFullName } from "../getFullName";

const mockUser = {
  firstName: "Conan",
  lastName: "Doyle",
  displayName: "Sir Arthur Ignatius Conan Doyle",
};

describe("utils", () => {
  describe("getFullName", () => {
    test("should return full name", () => {
      expect(getFullName(mockUser)).toBe("Sir Arthur Ignatius Conan Doyle");
      expect(getFullName(omit(mockUser, ["displayName"]))).toBe("Conan Doyle");
      expect(getFullName(omit(mockUser, ["displayName", "lastName"]))).toBe("Conan");
      expect(getFullName(omit(mockUser, ["displayName", "firstName"]))).toBe("Doyle");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getFullName(payload as never)).toBe("-");
    });
  });
});
