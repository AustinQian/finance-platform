"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const { onOpen } = useNewAccount();

  return(
    <div>
      <SpeedInsights />
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </div>
  );
};
