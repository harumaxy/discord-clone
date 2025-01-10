// (routes) は不要だが、 layout.tsx を分離する目的で使える

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div>
			<UserButton />
			<ModeToggle />
		</div>
	);
}
