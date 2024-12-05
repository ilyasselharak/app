import { env } from "../../env";

export const {
    VECTOR,
    HASH,
    FRONT_END_URL,
    PORT,
    HOST
} = env;

export const regPhone = /^\+380\d{9}$/;
export const pageSize = 24;
