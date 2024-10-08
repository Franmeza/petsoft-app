import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

async function Account() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="text-white my-8">Your account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {session.user.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}

export default Account;
