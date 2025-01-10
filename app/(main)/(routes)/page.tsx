// (routes) は不要だが、 layout.tsx を分離する目的で使える

import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div>
			<UserButton />
		</div>
	);
}
