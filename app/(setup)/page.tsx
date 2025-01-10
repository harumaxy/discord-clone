import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

import CreateServerModal from "@/components/modals/create-server-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  // 自分が参加してるサーバーを取得
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <CreateServerModal />;
};

export default SetupPage;
