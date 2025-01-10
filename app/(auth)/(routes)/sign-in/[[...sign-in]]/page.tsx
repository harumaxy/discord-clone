// パスの [...sing-in] は Clerk が動作するための慣習

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
