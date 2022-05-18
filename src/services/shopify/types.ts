export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CustomerSearchParams = {
    querySearch?: string,
    email?: string,
};

/**
 * An ISO-8601 encoded UTC date time string. Example value: `"2022-05-11T21:37:03+03:00"`.
 */
export type DateTime = string;

export type Customer = {
    accepts_marketing: boolean,
    accepts_marketing_updated_at: DateTime,
    addresses: object, // ToDo: need typings
    currency: string,
    created_at: DateTime,
    default_address: object, // ToDo: need typings
    email: string,
    first_name: string,
    id: string,
    last_name: string,
    last_order_id: number | null,
    last_order_name: string | null,
    metafield: object, // ToDo: need typings
    marketing_opt_in_level: 'single_opt_in' | 'confirmed_opt_in' | 'unknown' | null,
    multipass_identifier: number | unknown,
    orders_count: number,
    phone: string,
    state: string,
    tags: string,
    tax_exempt: boolean,
    tax_exemptions: string, // ToDo: need typings
    total_spent: string,
    updated_at: DateTime,
    verified_email: boolean,
};
