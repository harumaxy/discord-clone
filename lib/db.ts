import { PrismaClient } from "@prisma/client";

declare global {
  // let ではなく var
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Next.js のホットリロードで、 Prisma Client を初期化しすぎないためのハック。既に作成していたら再利用する。
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
