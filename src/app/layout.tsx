import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "LifeNix",
  description: "Your Personal Health Companion"
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}