import { SideNav } from "./_components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="hidden  md:block md:w-64 ">
        <SideNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
