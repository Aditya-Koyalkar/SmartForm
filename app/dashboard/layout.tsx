import { SideNav } from "./_dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="hidden fixed md:block md:w-64 ">
        <SideNav />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}
