import { State } from "../context/StoreProvider/types";

const getShopName = (state: State): string | boolean => {
    return state.context?.settings.shop_name || false;
};

export { getShopName };
