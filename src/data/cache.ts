/* eslint-disable @typescript-eslint/ban-types */
import { Tedis } from 'tedis';

import { port_redis } from "../config";

const redis_client = new Tedis({
    port: parseInt(port_redis)
});

redis_client.on("connect", () => {
    console.log("Database redis connected");
});
redis_client.on("timeout", () => {
    console.log("timeout");
});
redis_client.on("error", err => {
    console.log(err);
});
redis_client.on("close", had_error => {
    console.log("close with err: ", had_error);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCache = async (id: string, data: [] | any[]): Promise<any[]> => {
    try {
        const dataRedis = await redis_client.get(id);
        if (dataRedis != null) {
            return JSON.parse(dataRedis.toString());
        } else {
            redis_client.setex(id, 30, JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.log(error);
        return data;
    }
};
