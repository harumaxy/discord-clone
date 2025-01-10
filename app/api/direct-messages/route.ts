import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import type { DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10; // 無限スクロールのバッチ数

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("conversationId missing", { status: 401 });
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1, // カーソル位置のレコードは既にあるのでスキップ
        cursor: {
          id: cursor, // prisma のカーソルベースクエリ。任意の where, orderby されたセットに対してページネーションできる
        },
        where: {
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // もし要求したバッチ数より少なければ nextCursor = null, つまり無限スクロール終了
    const nextCursor =
      messages.length === MESSAGES_BATCH
        ? messages[messages.length - 1].id
        : null;

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.error("[DIRECT_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
