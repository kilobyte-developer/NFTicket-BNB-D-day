"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlight from "@/components/GlobalSpotlight";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideOnRoutes = [
    "/login",
    "/home",
    "/explore",
    "/my-tickets",
    "/events",
    "/create-events",
    "/marketplace",
    "/connect-wallet",
    "/details",
  ];

  const showNavAndFooter = !hideOnRoutes.includes(pathname);

  return (
    <>
      <GlobalSpotlight />
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </>
  );
}
