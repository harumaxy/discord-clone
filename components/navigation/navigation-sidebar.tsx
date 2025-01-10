import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/login");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <DropdownMenuSeparator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
    </div>
  );
};

export default NavigationSidebar;
