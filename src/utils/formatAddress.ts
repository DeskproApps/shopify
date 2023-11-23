import get from "lodash/get";
import concat from "lodash/concat";
import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";
import { nbsp } from "../constants";
import type { Address } from "../services/shopify/types";

const formatAddress = (address?: Address): string => {
  if (!isPlainObject(address) || isEmpty(address)) {
    return "-";
  }

  let result: string[] = [];
  const name = get(address, ["name"]);
  const formatted = get(address, ["formatted"]);

  if (!isEmpty(name)) {
    result = concat(result, concat(result, name));
  } else {
    result = concat(result, concat(result, [
      get(address, ["firstName"]),
      get(address, ["lastName"]),
    ].filter(Boolean).join(`${nbsp}`)));
  }

  if (Array.isArray(formatted) && !isEmpty(formatted)) {
    result = concat(result, formatted);
  } else {
    result = concat(result, [
      get(address, ["company"]),
      get(address, ["address1"]),
      get(address, ["address2"]),
      get(address, ["city"]),
      get(address, ["zip"]),
      get(address, ["country"]),
    ].filter(Boolean));
  }

  return result.join(",\n");
};

export { formatAddress };
