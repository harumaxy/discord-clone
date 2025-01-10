"use client";

import * as React from "react";

import { io as ClientIO, type Socket } from "socket.io-client";

class SocketClass {
  constructor(
    public uri: string,
    public opts: Record<string, unknown>,
  ) {}
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return React.useContext(SocketContext);
};

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const socketInstance: Socket = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL, // 環境変数が undef の場合、ローカルホストに接続する
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      },
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
