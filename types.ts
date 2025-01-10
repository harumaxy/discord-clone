import type { Server as NetServer, Socket } from "node:net";
import type { NextApiResponse } from "next";
import type { Server as SocketIoServer } from "socket.io";
import type { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};
