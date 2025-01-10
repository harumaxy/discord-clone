import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/providers/modal-provider";

const font = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Chat Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        {/* html タグに、 className="dark" style={{color-scheme:"dark"}} 属性がクライアント側でつく。SSRとCSRでレンダリング結果が異なるというエラーが出るので suppress */}
        <body
          className={cn(
            `${font.className} antialiased`,
            "bg-white dark:bg-[#313338]",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // forcedTheme="light"
            enableSystem={false} // システムの状態が dark/light のどちらでも system を使うときはライトにしたい
            storageKey="discord-theme"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
