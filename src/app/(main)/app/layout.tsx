import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#2C9676] h-[300px] absolute w-full -z-10 top-0" />
      <div className="flex flex-col max-w-[1050px] mx-auto px-5 min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}

export default Layout;
