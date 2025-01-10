import { db } from "./db";

export async function getOrCreateConversation(
  memberOneId: string,
  memberTowId: string,
) {
  let conversation =
    (await findConversation(memberOneId, memberTowId)) ||
    (await findConversation(memberTowId, memberOneId)); // 自分 または 相手 が始めた会話を探す
  if (!conversation) {
    conversation = await createNewConverSation(memberOneId, memberTowId); // なかったら自分が新しい会話を始める
  }
  return conversation;
}

async function findConversation(memberOneId: string, memberTowId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId, memberTowId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTow: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createNewConverSation(memberOneId: string, memberTowId: string) {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTowId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTow: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
