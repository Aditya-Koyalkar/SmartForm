import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="p-3 shadow-md border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
          <div className="text-primary font-semibold font-mono">
            Smart Form AI
          </div>
        </div>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
