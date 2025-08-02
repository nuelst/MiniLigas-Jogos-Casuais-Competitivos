import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { WithChildren } from "@/types/common";

export default function PublicLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
} 