/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocket } from "@/components/providers/socket-provider";
import type { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

interface ChatSocketProps {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      // biome-ignore lint/suspicious/noExplicitAny:
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }
        // updateKey イベントを受け取ったら、react-query Client で fetch したデータを[queryKey]で指定して、更新する。更新すると、そのデータをstateとして使用しているコンポーネントが更新される。
        // biome-ignore lint/suspicious/noExplicitAny:
        const newPages = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });
    });

    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          // データが何もなかったら、pages: [message] を返す (データ数1のarray)
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newPages = [...oldData.pages];
        newPages[0] = {
          ...newPages[0],
          items: [message, ...newPages[0].items],
        };
        return {
          ...oldData,
          pages: newPages,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
