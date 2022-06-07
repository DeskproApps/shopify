import { DateTime } from "../../services/shopify/types";

const parseDateTime = (date?: Date): DateTime => {
    if (!date) {
        return (new Date()).toISOString();
    }

    return date.toISOString();
};

export { parseDateTime };
