import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Root() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
