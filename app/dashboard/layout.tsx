import { SideNav } from "./_components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="hidden  md:block md:w-96 ">
        <SideNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
