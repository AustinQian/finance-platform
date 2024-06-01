import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategory =(id?: string)=>{
    const query = useQuery({
        enabled: !!id,
        queryKey: ["category", { id }],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.categories[":id"].$get({
                param:{ id }
            });

            if(!response.ok){
                throw Error("Fail to fetch category")
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}