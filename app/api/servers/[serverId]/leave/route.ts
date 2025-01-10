import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  options: { params: Promise<{ serverId: string }> },
) {
  try {
    const profile = await currentProfile();
    const params = await options.params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID missing", {
        status: 400,
      });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id, // 自分以外が Admin のサーバーから退出する。（逆に、自分が Admin の場合は退出できない。サーバー削除などはできる => 船長は船とともに沈む的な）
        },
        members: {
          some: {
            profileId: profile.id, // 自分自身が所属するサーバーからしか退出できない
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
