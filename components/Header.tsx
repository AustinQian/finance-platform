//"use client" we can also use it here, the "use client" is like mark the boundary of client server has opened
//now even if we don't mark the Navigation with "use client", we can still use hook in that component

//we can insert a server component inside a client component
//If we pass server component thruogh children, wen can use server component inside client component
import { UserButton,ClerkLoading,ClerkLoaded } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

import { HeaderLogo } from "@/components/Header-logo"
import { Navigation } from "@/components/Navigation"
import { WelcomeMsg } from "@/components/welcome-msg"

export const Header = () =>{
    return(
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                      <UserButton afterSignOutUrl="/"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400"/>
                    </ClerkLoading>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    )
}