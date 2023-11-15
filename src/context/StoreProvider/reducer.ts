import { P, match } from "ts-pattern";
import { State, Action, StoreReducer } from "./types";

export const initialState: State = {
    _error: undefined,
};

export const reducer: StoreReducer = (state: State, action: Action): State => {
    return match<[State, Action]>([state, action])
        .with([P._, { type: "loadContext" }], ([prevState, action]) => ({
            ...prevState,
            context: action.context,
        }))
        .with([P._, { type: "error" }], ([prevState, action]) => ({
            ...prevState,
            _error: action.error,
        }))
        .otherwise(() => state);
};
