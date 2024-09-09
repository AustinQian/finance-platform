import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { converAmountFromMiliunites } from "@/lib/utils";

export const useGetSummary = () =>{
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId")||"";

    const query = useQuery({
        //TODO: Check is params are needed in the key?
        queryKey: ["summary",{from, to, accountId}],
        queryFn: async () => {
            //type safe rpc
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if(!response.ok){
                throw Error("Fail to fetch summary")
            }

            const { data } = await response.json();
            return {
                ...data,
                incomeAmount: converAmountFromMiliunites(data.incomeAmount),
                expensesAmount: converAmountFromMiliunites(data.expensesAmount),
                remainingAmount: converAmountFromMiliunites(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: converAmountFromMiliunites(category.value),
                })),
                days: data.days.map((day) =>({
                    ...day,
                    income: converAmountFromMiliunites(day.income),
                    expenses: converAmountFromMiliunites(day.expenses),
                }))
            }
        },
    });

    return query;
}