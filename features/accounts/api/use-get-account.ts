import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccount =(id?: string)=>{
    const query = useQuery({
        enabled: !!id,
        queryKey: ["account", { id }],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.accounts[":id"].$get({
                param:{ id }
            });

            if(!response.ok){
                throw Error("Fail to fetch account")
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}