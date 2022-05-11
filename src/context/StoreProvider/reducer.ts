import { __, match } from "ts-pattern";
import { State, Action, StoreReducer } from "./types";

export const initialState: State = {};

export const reducer: StoreReducer = (state: State, action: Action): State => {
    return match<[State, Action]>([state, action])
        .with([__, { type: "changePage" }],  ([prevState, action]) => ({
            ...prevState,
            page: action.page,
            pageParams: action.params,
        }))
        .otherwise(() => state);
};
