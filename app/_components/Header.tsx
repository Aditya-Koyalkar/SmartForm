"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Header = () => {
  const path = usePathname();

  return (
    !path.includes("live-ai-form") && (
      <div className="p-5 shadow-md border">
        <div className="flex justify-between items-center">
          <Logo />
          <div>
            <SignedIn>
              <div className="flex gap-5 items-center">
                <Link
                  href={"/dashboard/custom-styles"}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "flex gap-2 items-center border-2 border-primary"
                  )}
                >
                  Custom Form Styling <Star className="w-3 h-3" />{" "}
                </Link>
                <Link href={"/dashboard"} className={buttonVariants()}>
                  Dashboard
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex gap-3">
                <SignUpButton forceRedirectUrl={"/auth-callback?url=dashboard"}>
                  <Button>Get Started</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
