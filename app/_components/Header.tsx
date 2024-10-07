"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const user = useSession();
  const path = usePathname();

  return (
    !path.includes("live-ai-form") && (
      <div className="p-5 shadow-md border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
            <div className="text-primary font-semibold font-mono">
              Smart Form AI
            </div>
          </div>
          <div>
            {user.data ? (
              <div className="flex items-center justify-between">
                <Button>
                  {" "}
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {user.data.user?.image ? (
                      <Image
                        src={`${user.data.user?.image}`}
                        height={40}
                        width={35}
                        alt="image"
                        className=" ml-5 h-auto w-auto rounded-full cursor-pointer"
                      />
                    ) : (
                      <div className=" rounded-full ml-5 cursor-pointer h-10 w-10 ">
                        {user.data.user?.name}
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className=" text-primary font-bold">
                      {user.data.user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem>{user.data.user?.email}</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        onClick={async () => {
                          await signOut();
                          toast({
                            description: "Logout successful",
                          });
                        }}
                        variant={"secondary"}
                        className="border-2"
                      >
                        Logout
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="flex md:hidden flex-col p-2 bg-secondary">
                      <DropdownMenuItem
                        className={`${
                          path == "/dashboard" && "bg-primary text-white"
                        }`}
                      >
                        <Link href={"/dashboard"}>My Forms</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={`${
                          path == "/dashboard/responses" &&
                          "bg-primary text-white"
                        }`}
                      >
                        <Link href={"/dashboard/responses"}>Responses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={`${
                          path == "/dashboard/upgrade" &&
                          "bg-primary text-white"
                        }`}
                      >
                        <Link href={`/dashboard/upgrade`}>Upgrade</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => {
                  signIn();
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
