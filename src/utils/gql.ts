/* eslint-disable */
import { removeUnnecessarySpaces } from "./removeUnnecessarySpaces";
import type { Dict } from "../types";
import reduce from "lodash/reduce";

type GqlParams = Dict<any>;

interface GQL {
  (params: GqlParams): (strings: TemplateStringsArray, ...placeholders: any[]) => string;
  (params: TemplateStringsArray, ...placeholders: any[]): string;
}

// @ts-ignore
const gql: GQL = (params: GqlParams|TemplateStringsArray, ...placeholders: any[]) => {
  const constructGqlString = (strings: TemplateStringsArray, placeholders: any[]) => {
    return reduce(strings, (result, string, i) => {
      const placeholder = i < placeholders.length ? placeholders[i] : "";
      return result + string + placeholder;
    }, "");
  };

  if (Array.isArray(params)) {
    const query = constructGqlString(params as never, placeholders);
    return JSON.stringify({
      query: removeUnnecessarySpaces(query),
    });
  } else {
    return (strings: TemplateStringsArray, ...placeholders: any[]) => {
      const query = constructGqlString(strings, placeholders);
      return JSON.stringify({
        query: removeUnnecessarySpaces(query),
        variables: params,
      });
    };
  }
};


export { gql };
