import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage = async (props: InviteCodePageProps) => {
  const params = await props.params;
  const profile = await currentProfile();

  if (!profile) {
    return (await auth()).redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // 招待コードが送られたサーバーに既に参加していたら、サーバーにリダイレクトする
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      // unique key を指定しないとエラーになる。(非ユニークキー指定の場合は updateMany)
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
