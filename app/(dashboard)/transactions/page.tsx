"use client";
import { Loader2, Plus } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card" 

import { columns } from "./columns";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT",
};

const INITIAL_IMPROT_RESULTS = {
    data: [],
    errors: [],
    meta:{},
};

const TransactionsPage=()=>{
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPROT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPROT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    };

    const onCancelImport = () =>{
        setImportResults(INITIAL_IMPROT_RESULTS);
        setVariant(VARIANTS.LIST);
    };

    const newTransaction = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled = 
      transactionsQuery.isLoading ||
      deleteTransactions.isPending;

    if(transactionsQuery.isLoading){
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (variant === VARIANTS.IMPORT){
        return (
            <>
              <ImportCard 
                data={importResults.data}
                onCancel={onCancelImport}
                onSubmit={()=>{}}
              />
            </>
        )
    }

    return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="test-xl line-clamp-1">
                        Transaction history
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button 
                          onClick={newTransaction.onOpen}
                          size="sm"
                          className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2"/>
                            Add new
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={columns} 
                    data={transactions} 
                    filterKey="payee"
                    onDelete={(row)=>{
                        const ids = row.map((r)=>r.original.id);
                        deleteTransactions.mutate({ ids });
                    }}
                    disabled={isDisabled}
                  />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;