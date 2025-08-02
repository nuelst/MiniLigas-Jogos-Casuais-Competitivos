import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { ReactNode } from "react";

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
} 