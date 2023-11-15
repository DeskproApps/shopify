import type { To } from "react-router-dom";

export type Maybe<T> = T | undefined | null;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
;
