import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

async function Dashboard() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8 ">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr_1fr] grid-rows-[45px_1fr_1.5fr] gap-4 h-[600px] ">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1 ">
          <SearchForm />
        </div>
        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className=" md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
