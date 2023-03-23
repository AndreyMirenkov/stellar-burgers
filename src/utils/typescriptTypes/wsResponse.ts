import { TOrder } from "./order";

export type TWsResponse = {
    success: boolean;
    orders: Array<TOrder>;
    total: number | null;
    totalToday: number | null;
}