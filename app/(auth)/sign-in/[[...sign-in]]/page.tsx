import Image from "next/image"
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#39C5BB]">
            Welcome Back!
          </h1>
          <p className="test-base text-[#7E8CA0]">
            Login or create an account to continue!
          </p>
        </div>
        <div className="flex item-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-white hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>
    </div>
  );
}