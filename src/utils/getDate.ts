import { DateTime } from "../services/shopify/types";

const getDate = (date: DateTime) => {
    return (new Date(date)).toLocaleDateString()
};


export { getDate };
