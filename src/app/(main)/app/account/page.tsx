import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

function Account() {
  return (
    <main>
      <H1 className="text-white my-8">Your account</H1>

      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}

export default Account;
