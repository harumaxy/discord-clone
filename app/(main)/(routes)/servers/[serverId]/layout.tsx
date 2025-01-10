import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return (await auth()).redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: (await params).serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    return redirect("/servers");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        Server Sidebar
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ServerIdLayout;
