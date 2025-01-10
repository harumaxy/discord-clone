import { db } from "./db";

export async function getOrCreateConversation(
  memberOneId: string,
  memberTwoId: string,
) {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId)); // 自分 または 相手 が始めた会話を探す
  if (!conversation) {
    conversation = await createNewConverSation(memberOneId, memberTwoId); // なかったら自分が新しい会話を始める
  }
  return conversation;
}

async function findConversation(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId, memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
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

async function createNewConverSation(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
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
