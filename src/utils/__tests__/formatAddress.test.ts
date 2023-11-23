import omit from "lodash/omit";
import { formatAddress } from "../formatAddress";

const mockAddress = {
  id: "gid://shopify/MailingAddress/18802176295222?model_name=Address",
  firstName: "Jermaine",
  lastName: "Wynn",
  name: "Jermaine Wynn",
  address1: "79 Hartfield Road",
  address2: "100500",
  city: "London",
  company: "Deskpro",
  country: "United Kingdom",
  countryCodeV2: "GB",
  formatted: [
    "Deskpro",
    "79 Hartfield Road",
    "100500",
    "London",
    "SW19 3ES",
    "United Kingdom"
  ],
  formattedArea: "London, United Kingdom",
  phone: "+442035821980",
  province: "England",
  provinceCode: "ENG",
  timeZone: "Europe/London",
  zip: "SW19 3ES",
};

describe("utils", () => {
  describe("formatAddress", () => {
    test("should return formatted address", () => {
      expect(formatAddress(mockAddress as never)).toBe([
        "Jermaine Wynn",
        "Deskpro",
        "79 Hartfield Road",
        "100500",
        "London",
        "SW19 3ES",
        "United Kingdom",
      ].join(",\n"));
    });

    test("should formatted if key \"formatted\" is undefined", () => {
      expect(formatAddress(omit(mockAddress, ["formatted"]) as never)).toBe([
        "Jermaine Wynn",
        "Deskpro",
        "79 Hartfield Road",
        "100500",
        "London",
        "SW19 3ES",
        "United Kingdom",
      ].join(",\n"));
    });

    test("should formatted if keys \"formatted\" or \"name\" are undefined", () => {
      expect(formatAddress(omit(mockAddress, ["formatted", "name"]) as never)).toBe([
        "Jermaine\u00A0Wynn",
        "Deskpro",
        "79 Hartfield Road",
        "100500",
        "London",
        "SW19 3ES",
        "United Kingdom",
      ].join(",\n"));
    });

    test.each(
      [undefined, null, "", 0, true, false, {}, []]
    )("wrong value: %p", (payload) => {
      expect(formatAddress(payload as never)).toBe("-");
    });
  });
});
