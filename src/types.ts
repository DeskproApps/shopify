import type { To } from "react-router-dom";

export type Maybe<T> = T | undefined | null;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
;

export type DPUser = {
  emails: string[],
  firstName: string,
  id: string,
  isAgent: boolean,
  isConfirmed: boolean,
  isDisabled: boolean,
  language: string,
  lastName: string,
  locale: string,
  name: string,
  primaryEmail: string,
  titlePrefix: string,
};

export type DPTicketUser = {
  displayName: string,
  email: string,
  emails: string[],
  firstName: string,
  id: string,
  language: string,
  lastName: string,
  locale: string,
};
