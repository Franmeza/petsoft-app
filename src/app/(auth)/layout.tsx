import Image from "next/image";
import logo from "../../../public/logo.svg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center border border-zinc-400 rounded-md p-6 shadow-md shadow-zinc-500">
        <Image
          className="mb-2"
          width={45}
          height={45}
          src={logo}
          alt="PetSoft logo"
        />
        {children}
      </div>
    </div>
  );
}

export default Layout;
