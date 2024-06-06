import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";

export const useGetTransactions =()=>{
    const params = useSearchParams();
    const from = params.get("from")||"";
    const to = params.get("to")||"";
    const accountId = params.get("accountId")||"";

    const query = useQuery({
        //TODO: Check is params are needed in the key?
        queryKey: ["transactions",{from, to, accountId}],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if(!response.ok){
                throw Error("Fail to fetch transactions")
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}