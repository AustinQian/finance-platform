import { z } from "zod";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";

import { insertAccountSchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";


const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet=()=>{
    const { isOpen,onClose,id } = useOpenAccount();

    const accountQuery = useGetAccount(id);
    const mutation = useCreateAccount();

    const onSubmit =(values: FormValues)=>{
        mutation.mutate(values,{
            onSuccess: ()=>{
                onClose();
            },
        });
    };

    const defaultValues = accountQuery.data?{
        name: accountQuery.data.name,
    }:{
        name:"",
    };

    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                           New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to tack all your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                  onSubmit={onSubmit} 
                  disabled={mutation.isPending}
                  defaultVlaues={defaultValues}
                />
            </SheetContent>
        </Sheet>
    )
}