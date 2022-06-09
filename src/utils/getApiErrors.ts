import isArray from "lodash/isArray";
import isString from "lodash/isString";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const getApiErrors = (errors: any): string[] => {
    let newErrors = [];

    if (isArray(errors)) {
        newErrors = errors.map(({ message }) => message);
    } else if (isString(errors)) {
        newErrors = [errors];
    }

    return newErrors;
};

export { getApiErrors };
