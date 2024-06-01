import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories =()=>{
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.categories.$get();

            if(!response.ok){
                throw Error("Fail to fetch categories")
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}