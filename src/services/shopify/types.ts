export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CustomerSearchParams = {
    querySearch?: string,
    email?: string,
};

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type CustomerType = {
    id: string,
    createdAt: DateTime,
    displayName: string,
    email: string,
    hasTimelineComment: boolean,
    locale: string,
    note: string,
    phone: string,
    firstName: string,
    lastName: string,
};
