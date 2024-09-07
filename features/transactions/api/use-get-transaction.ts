import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { converAmountFromMiliunites } from "@/lib/utils";

export const useGetTransaction =(id?: string)=>{
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.transactions[":id"].$get({
                param:{ id }
            });

            if(!response.ok){
                throw Error("Fail to fetch transaction")
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: converAmountFromMiliunites(data.amount)
            };
        },
    });

    return query;
}