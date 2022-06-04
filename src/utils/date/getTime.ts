import { DateTime } from "../../services/shopify/types";

const getTime = (date: DateTime) => {
    return (new Date(date)).toLocaleTimeString();
};

export { getTime };
